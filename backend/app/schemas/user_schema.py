from pydantic import BaseModel, EmailStr
from typing import Optional


class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str
    restaurant_id: int
    phone: Optional[str] = None


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: str
    restaurant_id: int
    phone: Optional[str] = None

    class Config:
        from_attributes = True