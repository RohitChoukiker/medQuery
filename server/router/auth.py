from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from pydantic import ValidationError
from database import get_db
from models import User
from schemas import UserCreate, UserLogin, Token, UserProfile, SignupResponse, ErrorResponse
from auth import (
    authenticate_user, 
    create_access_token, 
    get_password_hash, 
    get_current_user,
    ACCESS_TOKEN_EXPIRE_MINUTES
)

router = APIRouter(prefix="/auth", tags=["authentication"])

@router.post("/signup", response_model=SignupResponse, responses={400: {"model": ErrorResponse}})
async def signup(user_data: UserCreate, db: Session = Depends(get_db)):
    """Register a new user with comprehensive validation."""
    try:
        # Check if user already exists
        existing_user = db.query(User).filter(User.email == user_data.email).first()
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered. Please use a different email address."
            )
        
        # Create new user
        hashed_password = get_password_hash(user_data.password)
        db_user = User(
            email=user_data.email,
            full_name=user_data.full_name,
            hashed_password=hashed_password,
            role=user_data.role,
            license_number=user_data.license_number,
            institution=user_data.institution,
            specialization=user_data.specialization
        )
        
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        
        return SignupResponse(
            message="Account created successfully! Welcome to MedQuery Agent.",
            user_id=db_user.id,
            user_email=db_user.email,
            user_role=db_user.role.value
        )
        
    except ValidationError as e:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Validation error: {str(e)}"
        )
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered. Please use a different email address."
        )
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred during registration. Please try again."
        )

@router.post("/login", response_model=Token, responses={401: {"model": ErrorResponse}})
async def login(user_credentials: UserLogin, db: Session = Depends(get_db)):
    """Authenticate user and return access token."""
    try:
        # Authenticate user
        user = authenticate_user(db, user_credentials.email, user_credentials.password)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password. Please check your credentials.",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        # Check if the role matches
        if user.role != user_credentials.role:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=f"Role mismatch. You are registered as {user.role.value}, not {user_credentials.role.value}.",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        # Create access token
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": user.email, "role": user.role.value}, 
            expires_delta=access_token_expires
        )
        
        return Token(access_token=access_token, token_type="bearer")
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred during login. Please try again."
        )

@router.get("/me", response_model=UserProfile, responses={401: {"model": ErrorResponse}})
async def get_current_user_profile(current_user: User = Depends(get_current_user)):
    """Get current authenticated user profile."""
    try:
        return UserProfile(
            id=current_user.id,
            email=current_user.email,
            full_name=current_user.full_name,
            role=current_user.role.value,  # Convert enum to string
            license_number=current_user.license_number,
            institution=current_user.institution,
            specialization=current_user.specialization
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while fetching user profile."
        )

@router.post("/logout")
async def logout():
    """Logout endpoint (client-side token removal)."""
    return {"message": "Successfully logged out. Please remove the token from client storage."}

# Health check endpoint for authentication service
@router.get("/health")
async def auth_health_check():
    """Health check for authentication service."""
    return {"status": "healthy", "service": "authentication"}