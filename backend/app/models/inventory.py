from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.database import Base


class Inventory(Base):
    __tablename__ = "inventory"

    id = Column(Integer, primary_key=True, index=True)
    restaurant_id = Column(Integer, ForeignKey("restaurants.restaurant_id"), nullable=False)

    item_name = Column(String(100), nullable=False)
    category = Column(String(100), nullable=False)

    quantity = Column(Integer, nullable=False)

    unit = Column(String(30), nullable=False)

    minimum_stock = Column(Integer, nullable=False)

    supplier_name = Column(String(100))

    last_updated = Column(
        DateTime,
        server_default=func.now(),
        onupdate=func.now()
    )