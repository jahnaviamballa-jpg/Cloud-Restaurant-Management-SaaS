from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    DateTime,
    ForeignKey,
)
from sqlalchemy.sql import func
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
        ForeignKey("users.id"),
        nullable=True,
    )

    # =====================================================
    # Customer Details
    # =====================================================

    customer_name = Column(
        String(100),
        nullable=False,
    )

    customer_email = Column(
        String(100),
        nullable=False,
    )

    customer_phone = Column(
        String(20),
        nullable=False,
    )

    # =====================================================
    # Order Details
    # =====================================================

    total_amount = Column(
        Float,
        nullable=False,
    )

    status = Column(
        String(50),
        default="Pending",
        nullable=False,
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    # =====================================================
    # Relationships
    # =====================================================

    restaurant = relationship(
        "Restaurant",
        back_populates="orders",
    )

    customer = relationship(
        "User",
        back_populates="orders",
    )

    order_items = relationship(
        "OrderItem",
        back_populates="order",
        cascade="all, delete-orphan",
    )