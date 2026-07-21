from pydantic import BaseModel
from datetime import datetime


# ==========================================
# Base Schema
# ==========================================
class OrderBase(BaseModel):
    restaurant_id: int
    customer_name: str
    customer_phone: str
    total_amount: float
    status: str = "Pending"


# ==========================================
# Create Order
# ==========================================
class OrderCreate(OrderBase):
    pass


# ==========================================
# Update Order
# ==========================================
class OrderUpdate(BaseModel):
    customer_name: str | None = None
    customer_phone: str | None = None
    total_amount: float | None = None
    status: str | None = None


# ==========================================
# Response Schema
# ==========================================
class OrderResponse(OrderBase):
    id: int
    created_at: datetime

    model_config = {
        "from_attributes": True
    }