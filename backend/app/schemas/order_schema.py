from datetime import datetime
from pydantic import BaseModel


# ==========================================
# Base Schema
# ==========================================

class OrderBase(BaseModel):

    restaurant_id: int

    customer_id: int | None = None

    customer_name: str | None = None

    customer_email: str | None = None

    customer_phone: str | None = None

    item_name: str

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
    customer_email: str | None = None
    customer_phone: str | None = None
    item_name: str | None = None
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