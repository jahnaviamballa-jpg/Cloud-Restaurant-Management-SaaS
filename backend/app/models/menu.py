from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    Boolean,
    DateTime,
    ForeignKey
)
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base


class Menu(Base):
    __tablename__ = "menu"

    id = Column(Integer, primary_key=True, index=True)

    restaurant_id = Column(
        Integer,
        ForeignKey("restaurants.restaurant_id"),
        nullable=False
    )

    category = Column(String(100), nullable=False)

    name = Column(String(150), nullable=False)

    description = Column(String(500))

    price = Column(Float, nullable=False)

    image_url = Column(String(255))

    is_available = Column(Boolean, default=True)

    is_veg = Column(Boolean, default=False)

    created_at = Column(DateTime, default=datetime.utcnow)

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )

    restaurant = relationship("Restaurant")