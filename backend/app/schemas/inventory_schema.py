from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class InventoryCreate(BaseModel):
    restaurant_id: int
    item_name: str
    category: str
    quantity: int
    unit: str
    minimum_stock: int
    supplier_name: Optional[str] = None


class InventoryUpdate(BaseModel):
    item_name: Optional[str] = None
    category: Optional[str] = None
    quantity: Optional[int] = None
    unit: Optional[str] = None
    minimum_stock: Optional[int] = None
    supplier_name: Optional[str] = None


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

    model_config = {
        "from_attributes": True
    }