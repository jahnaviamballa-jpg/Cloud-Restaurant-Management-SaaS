from sqlalchemy import Column, Integer, Float, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

from app.database import Base


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)

    restaurant_id = Column(
        Integer,
        ForeignKey("restaurants.restaurant_id"),
        nullable=False
    )

    customer_id = Column(
        Integer,
        nullable=False
    )

    total_amount = Column(
        Float,
        nullable=False,
        default=0
    )

    order_status = Column(
        String(30),
        default="Pending"
    )

    payment_status = Column(
        String(30),
        default="Pending"
    )

    payment_method = Column(
        String(30),
        nullable=False
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )

    items = relationship(
        "OrderItem",
        back_populates="order",
        cascade="all, delete"
    )