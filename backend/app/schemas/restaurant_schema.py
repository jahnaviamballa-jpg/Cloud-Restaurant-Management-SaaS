from pydantic import BaseModel, EmailStr
from typing import Optional


class RestaurantCreate(BaseModel):
    restaurant_name: str
    owner_name: str
    email: EmailStr
    phone: str
    address: str
    city: str
    state: str
    pincode: str
    description: Optional[str] = None
    logo_url: Optional[str] = None


class RestaurantUpdate(BaseModel):
    restaurant_name: Optional[str] = None
    owner_name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    pincode: Optional[str] = None
    description: Optional[str] = None
    logo_url: Optional[str] = None


class RestaurantResponse(BaseModel):
    restaurant_id: int
    restaurant_name: str
    owner_name: str
    email: EmailStr
    phone: str
    address: str
    city: Optional[str]
    state: Optional[str]
    pincode: Optional[str]
    description: Optional[str]
    logo_url: Optional[str]

    class Config:
        from_attributes = True