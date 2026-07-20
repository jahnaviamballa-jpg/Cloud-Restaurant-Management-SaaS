from datetime import datetime

from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    Float,
    ForeignKey,
    Integer,
    String,
)
from sqlalchemy.orm import relationship

from app.database import Base


class Menu(Base):
    __tablename__ = "menu"

    # =====================================================
    # Primary Key
    # =====================================================
    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    # =====================================================
    # Foreign Key
    # =====================================================
    restaurant_id = Column(
        Integer,
        ForeignKey("restaurants.restaurant_id"),
        nullable=False,
    )

    # =====================================================
    # Menu Details
    # =====================================================
    category = Column(
        String(100),
        nullable=False,
    )

    name = Column(
        String(150),
        nullable=False,
    )

    description = Column(
        String(500),
    )

    price = Column(
        Float,
        nullable=False,
    )

    image_url = Column(
        String(255),
    )

    is_available = Column(
        Boolean,
        default=True,
    )

    is_veg = Column(
        Boolean,
        default=False,
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
        back_populates="menu_items",
    )

    order_items = relationship(
        "OrderItem",
        back_populates="menu",
        cascade="all, delete-orphan",
    )