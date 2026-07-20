from sqlalchemy import (
    Column,
    Float,
    ForeignKey,
    Integer,
)
from sqlalchemy.orm import relationship

from app.database import Base


class OrderItem(Base):
    __tablename__ = "order_items"

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
    order_id = Column(
        Integer,
        ForeignKey("orders.id"),
        nullable=False,
    )

    menu_id = Column(
        Integer,
        ForeignKey("menu.id"),
        nullable=False,
    )

    # =====================================================
    # Order Item Details
    # =====================================================
    quantity = Column(
        Integer,
        nullable=False,
    )

    price = Column(
        Float,
        nullable=False,
    )

    subtotal = Column(
        Float,
        nullable=False,
    )

    # =====================================================
    # Relationships
    # =====================================================
    order = relationship(
        "Order",
        back_populates="items",
    )

    menu = relationship(
        "Menu",
        back_populates="order_items",
    )