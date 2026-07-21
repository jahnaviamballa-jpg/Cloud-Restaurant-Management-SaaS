from sqlalchemy import (
    Column,
    Integer,
    String,
    Date,
    Time,
    DateTime,
    ForeignKey,
)

from sqlalchemy.sql import func

from sqlalchemy.orm import relationship

from app.database import Base


class Reservation(Base):
    __tablename__ = "reservations"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    restaurant_id = Column(
        Integer,
        ForeignKey(
            "restaurants.restaurant_id"
        ),
        nullable=False,
    )

    customer_name = Column(
        String(100),
        nullable=False,
    )

    customer_phone = Column(
        String(20),
        nullable=False,
    )

    reservation_date = Column(
        Date,
        nullable=False,
    )

    reservation_time = Column(
        Time,
        nullable=False,
    )

    number_of_guests = Column(
        Integer,
        nullable=False,
    )

    special_request = Column(
        String(500),
        nullable=True,
    )

    status = Column(
        String(30),
        default="Pending",
        nullable=False,
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

        # ==========================================
    # Relationships
    # ==========================================
    restaurant = relationship(
        "Restaurant",
        back_populates="reservations",
    )