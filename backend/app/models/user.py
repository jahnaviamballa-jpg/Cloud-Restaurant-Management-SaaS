from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datetime import datetime
from app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    restaurant_id = Column(
        Integer,
        ForeignKey("restaurants.restaurant_id"),
        nullable=False
    )

    name = Column(String(100), nullable=False)

    email = Column(String(100), unique=True, nullable=False)

    hashed_password = Column(String(255), nullable=False)

    role = Column(String(50), nullable=False)

    phone = Column(String(20))

    created_at = Column(DateTime, default=datetime.utcnow)