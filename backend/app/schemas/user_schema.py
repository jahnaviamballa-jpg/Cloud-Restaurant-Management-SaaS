from pydantic import BaseModel, EmailStr


class UserRegister(BaseModel):
    restaurant_id: int
    name: str
    email: EmailStr
    password: str
    role: str
    phone: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class ChangePassword(BaseModel):
    email: EmailStr
    old_password: str
    new_password: str