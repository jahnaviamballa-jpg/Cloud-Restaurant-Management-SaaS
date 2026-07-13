from pydantic import BaseModel, Field
from typing import List
from datetime import datetime


# -----------------------------
# Order Item Create Schema
# -----------------------------
class OrderItemCreate(BaseModel):
    menu_id: int
    quantity: int = Field(..., gt=0)


# -----------------------------
# Order Create Schema
# -----------------------------
class OrderCreate(BaseModel):
    restaurant_id: int
    customer_id: int
    payment_method: str
    items: List[OrderItemCreate]


# -----------------------------
# Order Status Update Schema
# -----------------------------
class OrderStatusUpdate(BaseModel):
    order_status: str


# -----------------------------
# Order Item Response Schema
# -----------------------------
class OrderItemResponse(BaseModel):
    id: int
    menu_id: int
    quantity: int
    price: float
    subtotal: float

    class Config:
        from_attributes = True


# -----------------------------
# Order Response Schema
# -----------------------------
class OrderResponse(BaseModel):
    id: int
    restaurant_id: int
    customer_id: int
    total_amount: float
    order_status: str
    payment_status: str
    payment_method: str
    created_at: datetime
    items: List[OrderItemResponse]

    class Config:
        from_attributes = True