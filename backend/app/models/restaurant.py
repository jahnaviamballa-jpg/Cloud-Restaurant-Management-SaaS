from datetime import datetime

from sqlalchemy import (
    Column,
    DateTime,
    Float,
    Integer,
    String,
)
from sqlalchemy.orm import relationship

from app.database import Base


class Restaurant(Base):
    __tablename__ = "restaurants"

    # =====================================================
    # Primary Key
    # =====================================================
    restaurant_id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    # =====================================================
    # Restaurant Information
    # =====================================================
    restaurant_name = Column(
        String(100),
        nullable=False,
    )

    owner_name = Column(
        String(100),
        nullable=False,
    )

    email = Column(
        String(100),
        unique=True,
        nullable=False,
    )

    phone = Column(
        String(20),
        nullable=False,
    )

    address = Column(
        String(255),
        nullable=False,
    )

    city = Column(
        String(100),
        nullable=True,
    )

    state = Column(
        String(100),
        nullable=True,
    )

    pincode = Column(
        String(20),
        nullable=True,
    )

    latitude = Column(
        Float,
        nullable=True,
    )

    longitude = Column(
        Float,
        nullable=True,
    )

    description = Column(
        String(500),
        nullable=True,
    )

    logo_url = Column(
        String(255),
        nullable=True,
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
    menu_items = relationship(
        "Menu",
        back_populates="restaurant",
        cascade="all, delete-orphan",
    )

    orders = relationship(
        "Order",
        back_populates="restaurant",
        cascade="all, delete-orphan",
    )

    inventory_items = relationship(
        "Inventory",
        back_populates="restaurant",
        cascade="all, delete-orphan",
    )

    reservations = relationship(
    "Reservation",
    back_populates="restaurant",
    cascade="all, delete-orphan",
    )


    users = relationship(
    "User",
    back_populates="restaurant",
    cascade="all, delete-orphan",
)
    

    