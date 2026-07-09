from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from app.database import Base


class Restaurant(Base):
    __tablename__ = "restaurants"

    restaurant_id = Column(Integer, primary_key=True, index=True)

    restaurant_name = Column(String(100), nullable=False)
    owner_name = Column(String(100), nullable=False)

    email = Column(String(100), unique=True, nullable=False)
    phone = Column(String(20), nullable=False)

    address = Column(String(255), nullable=False)

    city = Column(String(100), nullable=True)
    state = Column(String(100), nullable=True)
    pincode = Column(String(20), nullable=True)

    description = Column(String(500), nullable=True)
    logo_url = Column(String(255), nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )