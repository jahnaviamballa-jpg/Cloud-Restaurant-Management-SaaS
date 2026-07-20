from sqlalchemy import (
    Column,
    DateTime,
    ForeignKey,
    Integer,
    String,
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database import Base


class Inventory(Base):
    __tablename__ = "inventory"

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
    # Inventory Details
    # =====================================================
    item_name = Column(
        String(100),
        nullable=False,
    )

    category = Column(
        String(100),
        nullable=False,
    )

    quantity = Column(
        Integer,
        nullable=False,
    )

    unit = Column(
        String(30),
        nullable=False,
    )

    minimum_stock = Column(
        Integer,
        nullable=False,
    )

    supplier_name = Column(
        String(100),
        nullable=True,
    )

    # =====================================================
    # Timestamp
    # =====================================================
    last_updated = Column(
        DateTime,
        server_default=func.now(),
        onupdate=func.now(),
    )

    # =====================================================
    # Relationship
    # =====================================================
    restaurant = relationship(
        "Restaurant",
        back_populates="inventory_items",
    )