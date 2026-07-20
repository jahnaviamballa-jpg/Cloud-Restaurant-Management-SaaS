from datetime import datetime

from sqlalchemy import (
    Column,
    DateTime,
    Float,
    ForeignKey,
    Integer,
    String,
)
from sqlalchemy.orm import relationship

from app.database import Base


class Order(Base):
    __tablename__ = "orders"

    # =====================================================
    # Primary Key
    # =====================================================
    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    # =====================================================
    # Foreign Keys
    # =====================================================
    restaurant_id = Column(
        Integer,
        ForeignKey("restaurants.restaurant_id"),
        nullable=False,
    )

    customer_id = Column(
        Integer,
        nullable=False,
    )

    # =====================================================
    # Order Details
    # =====================================================
    total_amount = Column(
        Float,
        nullable=False,
        default=0.0,
    )

    order_status = Column(
        String(30),
        nullable=False,
        default="Pending",
    )

    payment_status = Column(
        String(30),
        nullable=False,
        default="Pending",
    )

    payment_method = Column(
        String(30),
        nullable=False,
    )

    # =====================================================
    # Timestamps
    # =====================================================
    created_at = Column(
        DateTime,
        default=datetime.utcnow,
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )

    # =====================================================
    # Relationships
    # =====================================================
    restaurant = relationship(
        "Restaurant",
        back_populates="orders",
    )

    items = relationship(
        "OrderItem",
        back_populates="order",
        cascade="all, delete-orphan",
    )