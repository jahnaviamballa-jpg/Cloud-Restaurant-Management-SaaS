from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field, ConfigDict


# ----------------------------------------
# Create Menu Item
# ----------------------------------------
class MenuCreate(BaseModel):
    category: str = Field(..., min_length=1, max_length=100)
    name: str = Field(..., min_length=1, max_length=150)
    description: Optional[str] = Field(
        default=None,
        max_length=500
    )
    price: float = Field(..., gt=0)
    image_url: Optional[str] = Field(
        default=None,
        max_length=255
    )
    is_available: bool = True
    is_veg: bool = False


# ----------------------------------------
# Update Menu Item
# ----------------------------------------
class MenuUpdate(BaseModel):
    category: Optional[str] = Field(
        default=None,
        min_length=1,
        max_length=100,
    )
    name: Optional[str] = Field(
        default=None,
        min_length=1,
        max_length=150,
    )
    description: Optional[str] = Field(
        default=None,
        max_length=500,
    )
    price: Optional[float] = Field(
        default=None,
        gt=0,
    )
    image_url: Optional[str] = Field(
        default=None,
        max_length=255,
    )
    is_available: Optional[bool] = None
    is_veg: Optional[bool] = None


# ----------------------------------------
# Menu Response
# ----------------------------------------
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

    model_config = ConfigDict(
        from_attributes=True
    )