from datetime import date, time, datetime
from typing import Optional

from pydantic import BaseModel


# ==========================================
# Base Schema
# ==========================================
class ReservationBase(BaseModel):
    customer_name: str
    customer_phone: str
    reservation_date: date
    reservation_time: time
    number_of_guests: int
    special_request: Optional[str] = None
    status: str = "Pending"


# ==========================================
# Create Schema
# ==========================================
class ReservationCreate(ReservationBase):
    restaurant_id: int


# ==========================================
# Update Schema
# ==========================================
class ReservationUpdate(BaseModel):
    customer_name: Optional[str] = None
    customer_phone: Optional[str] = None
    reservation_date: Optional[date] = None
    reservation_time: Optional[time] = None
    number_of_guests: Optional[int] = None
    special_request: Optional[str] = None
    status: Optional[str] = None


# ==========================================
# Response Schema
# ==========================================
class ReservationResponse(ReservationBase):
    id: int
    restaurant_id: int
    created_at: datetime

    class Config:
        from_attributes = True