from datetime import datetime

from sqlalchemy import (
    Column,
    DateTime,
    ForeignKey,
    Integer,
    String,
)
from sqlalchemy.orm import relationship

from app.database import Base


class User(Base):
    __tablename__ = "users"

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
    # User Details
    # =====================================================

    name = Column(
        String(100),
        nullable=False,
    )

    email = Column(
        String(100),
        unique=True,
        nullable=False,
    )

    hashed_password = Column(
        String(255),
        nullable=False,
    )

    role = Column(
        String(50),
        nullable=False,
    )

    phone = Column(
        String(20),
        nullable=True,
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
    )

    # =====================================================
    # Relationships
    # =====================================================

    restaurant = relationship(
        "Restaurant",
        back_populates="users",
    )

    orders = relationship(
        "Order",
        back_populates="customer",
        cascade="all, delete-orphan",
    )