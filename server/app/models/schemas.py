from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    full_name: str  # Match client interface
    role: str

class UserCreate(UserBase):
    password: str
    license_number: Optional[str] = None  # Match client interface
    institution: Optional[str] = None
    specialization: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str
    role: str

class UserResponse(UserBase):
    id: int
    license_number: Optional[str] = None
    institution: Optional[str] = None
    specialization: Optional[str] = None
    
    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
    role: Optional[str] = None