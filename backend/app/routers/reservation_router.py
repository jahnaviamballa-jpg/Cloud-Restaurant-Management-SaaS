from datetime import date

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
)

from sqlalchemy.orm import Session

from app.database import get_db

from app.models.reservation import Reservation
from app.models.restaurant import Restaurant

from app.schemas.reservation_schema import (
    ReservationCreate,
    ReservationUpdate,
    ReservationResponse,
)

router = APIRouter(
    prefix="/reservations",
    tags=["Reservation Management"],
)


# =====================================================
# Create Reservation
# POST /reservations/
# =====================================================
@router.post(
    "/",
    response_model=ReservationResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_reservation(
    reservation: ReservationCreate,
    db: Session = Depends(get_db),
):
    restaurant = (
        db.query(Restaurant)
        .filter(
            Restaurant.restaurant_id
            == reservation.restaurant_id
        )
        .first()
    )

    if not restaurant:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Restaurant not found",
        )

    new_reservation = Reservation(
        **reservation.model_dump()
    )

    db.add(new_reservation)
    db.commit()
    db.refresh(new_reservation)

    return new_reservation
# =====================================================
# Get All Reservations of a Restaurant
# GET /reservations/restaurants/{restaurant_id}
# =====================================================
@router.get(
    "/restaurants/{restaurant_id}",
    response_model=list[ReservationResponse],
)
def get_reservations(
    restaurant_id: int,
    db: Session = Depends(get_db),
):
    restaurant = (
        db.query(Restaurant)
        .filter(
            Restaurant.restaurant_id == restaurant_id
        )
        .first()
    )

    if not restaurant:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Restaurant not found",
        )

    reservations = (
        db.query(Reservation)
        .filter(
            Reservation.restaurant_id == restaurant_id
        )
        .order_by(
            Reservation.reservation_date,
            Reservation.reservation_time,
        )
        .all()
    )

    return reservations


# =====================================================
# Get Reservation By ID
# GET /reservations/{id}
# =====================================================
@router.get(
    "/{id}",
    response_model=ReservationResponse,
)
def get_reservation(
    id: int,
    db: Session = Depends(get_db),
):
    reservation = (
        db.query(Reservation)
        .filter(
            Reservation.id == id
        )
        .first()
    )

    if not reservation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Reservation not found",
        )

    return reservation

# =====================================================
# Update Reservation
# PUT /reservations/{id}
# =====================================================
@router.put(
    "/{id}",
    response_model=ReservationResponse,
)
def update_reservation(
    id: int,
    reservation: ReservationUpdate,
    db: Session = Depends(get_db),
):
    db_reservation = (
        db.query(Reservation)
        .filter(Reservation.id == id)
        .first()
    )

    if not db_reservation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Reservation not found",
        )

    update_data = reservation.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(db_reservation, key, value)

    db.commit()
    db.refresh(db_reservation)

    return db_reservation


# =====================================================
# Delete Reservation
# DELETE /reservations/{id}
# =====================================================
@router.delete(
    "/{id}",
    status_code=status.HTTP_200_OK,
)
def delete_reservation(
    id: int,
    db: Session = Depends(get_db),
):
    reservation = (
        db.query(Reservation)
        .filter(Reservation.id == id)
        .first()
    )

    if not reservation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Reservation not found",
        )

    db.delete(reservation)
    db.commit()

    return {
        "message": "Reservation deleted successfully"
    }


# =====================================================
# Today's Reservations
# GET /reservations/restaurants/{restaurant_id}/today
# =====================================================
@router.get(
    "/restaurants/{restaurant_id}/today",
    response_model=list[ReservationResponse],
)
def get_today_reservations(
    restaurant_id: int,
    db: Session = Depends(get_db),
):
    today = date.today()

    reservations = (
        db.query(Reservation)
        .filter(
            Reservation.restaurant_id == restaurant_id,
            Reservation.reservation_date == today,
        )
        .order_by(
            Reservation.reservation_time
        )
        .all()
    )

    return reservations


# =====================================================
# Reservation Statistics
# GET /reservations/restaurants/{restaurant_id}/stats
# =====================================================
@router.get(
    "/restaurants/{restaurant_id}/stats",
)
def get_reservation_stats(
    restaurant_id: int,
    db: Session = Depends(get_db),
):
    reservations = (
        db.query(Reservation)
        .filter(
            Reservation.restaurant_id == restaurant_id
        )
        .all()
    )

    total = len(reservations)

    pending = len(
        [
            r
            for r in reservations
            if r.status == "Pending"
        ]
    )

    confirmed = len(
        [
            r
            for r in reservations
            if r.status == "Confirmed"
        ]
    )

    cancelled = len(
        [
            r
            for r in reservations
            if r.status == "Cancelled"
        ]
    )

    return {
        "total_reservations": total,
        "pending": pending,
        "confirmed": confirmed,
        "cancelled": cancelled,
    }
