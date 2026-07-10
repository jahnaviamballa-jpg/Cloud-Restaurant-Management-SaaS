from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class MenuCreate(BaseModel):
    category: str = Field(..., min_length=1)
    name: str = Field(..., min_length=1)
    description: Optional[str] = None
    price: float = Field(..., gt=0)
    image_url: Optional[str] = None
    is_available: bool = True
    is_veg: bool = False


class MenuUpdate(BaseModel):
    category: Optional[str] = None
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = Field(None, gt=0)
    image_url: Optional[str] = None
    is_available: Optional[bool] = None
    is_veg: Optional[bool] = None


class MenuResponse(BaseModel):
    id: int
    restaurant_id: int
    category: str
    name: str
    description: Optional[str]
    price: float
    image_url: Optional[str]
    is_available: bool
    is_veg: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True