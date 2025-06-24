from pydantic import BaseModel, EmailStr, Field, validator
from typing import Optional
from datetime import datetime
from database import UserRole
import re

# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    full_name: str = Field(..., min_length=2, max_length=100, description="Full name of the user")
    role: UserRole
    license_number: Optional[str] = Field(None, max_length=50, description="Professional license number")
    institution: Optional[str] = Field(None, max_length=200, description="Institution or hospital name")
    specialization: Optional[str] = Field(None, max_length=100, description="Medical specialization")

    @validator('full_name')
    def validate_full_name(cls, v):
        if not v.strip():
            raise ValueError('Full name cannot be empty')
        if len(v.strip()) < 2:
            raise ValueError('Full name must be at least 2 characters long')
        return v.strip()

    @validator('license_number')
    def validate_license_number(cls, v, values):
        if 'role' in values:
            role = values['role']
            # Require license number for doctors and researchers
            if role in [UserRole.doctor, UserRole.researcher]:
                if not v or not v.strip():
                    raise ValueError(f'License number is required for {role.value}s')
        return v.strip() if v else None

    @validator('institution')
    def validate_institution(cls, v, values):
        if 'role' in values:
            role = values['role']
            # Require institution for non-patients
            if role != UserRole.patient:
                if not v or not v.strip():
                    raise ValueError(f'Institution is required for {role.value}s')
        return v.strip() if v else None

class UserCreate(UserBase):
    password: str = Field(..., min_length=8, description="Password must be at least 8 characters")

    @validator('password')
    def validate_password(cls, v):
        if len(v) < 8:
            raise ValueError('Password must be at least 8 characters long')
        if not re.search(r'[a-z]', v):
            raise ValueError('Password must contain at least one lowercase letter')
        if not re.search(r'[A-Z]', v):
            raise ValueError('Password must contain at least one uppercase letter')
        if not re.search(r'\d', v):
            raise ValueError('Password must contain at least one digit')
        return v

class UserLogin(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=1, description="User password")
    role: UserRole

class UserResponse(UserBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class UserProfile(BaseModel):
    id: int
    email: str
    full_name: str
    role: str
    license_number: Optional[str] = None
    institution: Optional[str] = None
    specialization: Optional[str] = None
    
    class Config:
        from_attributes = True

# Token Schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

# Response Schemas
class SignupResponse(BaseModel):
    message: str
    user_id: int
    user_email: str
    user_role: str

class ErrorResponse(BaseModel):
    detail: str
    error_type: Optional[str] = None