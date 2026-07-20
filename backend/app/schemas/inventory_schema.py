from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field, ConfigDict


# =====================================================
# Create Inventory Item
# =====================================================
class InventoryCreate(BaseModel):
    restaurant_id: int = Field(..., gt=0)

    item_name: str = Field(
        ...,
        min_length=1,
        max_length=100,
    )

    category: str = Field(
        ...,
        min_length=1,
        max_length=100,
    )

    quantity: int = Field(
        ...,
        ge=0,
    )

    unit: str = Field(
        ...,
        min_length=1,
        max_length=30,
    )

    minimum_stock: int = Field(
        ...,
        ge=0,
    )

    supplier_name: Optional[str] = Field(
        default=None,
        max_length=100,
    )


# =====================================================
# Update Inventory Item
# =====================================================
class InventoryUpdate(BaseModel):
    item_name: Optional[str] = Field(
        default=None,
        min_length=1,
        max_length=100,
    )

    category: Optional[str] = Field(
        default=None,
        min_length=1,
        max_length=100,
    )

    quantity: Optional[int] = Field(
        default=None,
        ge=0,
    )

    unit: Optional[str] = Field(
        default=None,
        min_length=1,
        max_length=30,
    )

    minimum_stock: Optional[int] = Field(
        default=None,
        ge=0,
    )

    supplier_name: Optional[str] = Field(
        default=None,
        max_length=100,
    )


# =====================================================
# Inventory Response
# =====================================================
class InventoryResponse(BaseModel):
    id: int
    restaurant_id: int
    item_name: str
    category: str
    quantity: int
    unit: str
    minimum_stock: int
    supplier_name: Optional[str]
    last_updated: datetime

    model_config = ConfigDict(
        from_attributes=True
    )