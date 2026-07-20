from datetime import datetime
from typing import List

from pydantic import BaseModel, Field


# =====================================================
# Order Item Create
# =====================================================
class OrderItemCreate(BaseModel):
    menu_id: int
    quantity: int = Field(..., gt=0)


# =====================================================
# Order Create
# =====================================================
class OrderCreate(BaseModel):
    restaurant_id: int
    customer_id: int
    payment_method: str
    items: List[OrderItemCreate]


# =====================================================
# Order Item Response
# =====================================================
class OrderItemResponse(BaseModel):
    id: int
    menu_id: int
    quantity: int
    price: float
    subtotal: float

    class Config:
        from_attributes = True


# =====================================================
# Order Response
# =====================================================
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


# =====================================================
# Update Order Status
# =====================================================
class OrderStatusUpdate(BaseModel):
    order_status: str


# =====================================================
# Update Payment Status
# =====================================================
class PaymentStatusUpdate(BaseModel):
    payment_status: str
from typing import List

from pydantic import BaseModel, Field


# =====================================================
# Order Item Create
# =====================================================
class OrderItemCreate(BaseModel):
    menu_id: int
    quantity: int = Field(..., gt=0)


# =====================================================
# Order Create
# =====================================================
class OrderCreate(BaseModel):
    restaurant_id: int
    customer_id: int
    payment_method: str
    items: List[OrderItemCreate]


# =====================================================
# Order Item Response
# =====================================================
class OrderItemResponse(BaseModel):
    id: int
    menu_id: int
    quantity: int
    price: float
    subtotal: float

    class Config:
        from_attributes = True


# =====================================================
# Order Response
# =====================================================
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


# =====================================================
# Update Order Status
# =====================================================
class OrderStatusUpdate(BaseModel):
    order_status: str


# =====================================================
# Update Payment Status
# =====================================================
class PaymentStatusUpdate(BaseModel):
    payment_status: str