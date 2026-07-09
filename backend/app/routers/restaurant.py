from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime

from app.database import get_db
from app.models.restaurant import Restaurant
from app.schemas.restaurant_schema import (
    RestaurantCreate,
    RestaurantUpdate,
    RestaurantResponse,
)

router = APIRouter()


# ===========================
# Create Restaurant
# ===========================
@router.post(
    "/",
    response_model=RestaurantResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_restaurant(
    restaurant: RestaurantCreate,
    db: Session = Depends(get_db),
):
    existing = (
        db.query(Restaurant)
        .filter(Restaurant.email == restaurant.email)
        .first()
    )

    if existing:
        raise HTTPException(
            status_code=409,
            detail="Restaurant email already exists",
        )

    new_restaurant = Restaurant(
        restaurant_name=restaurant.restaurant_name,
        owner_name=restaurant.owner_name,
        email=restaurant.email,
        phone=restaurant.phone,
        address=restaurant.address,
        city=restaurant.city,
        state=restaurant.state,
        pincode=restaurant.pincode,
        description=restaurant.description,
        logo_url=restaurant.logo_url,
    )

    db.add(new_restaurant)
    db.commit()
    db.refresh(new_restaurant)

    return new_restaurant


# ===========================
# Get All Restaurants
# ===========================
@router.get(
    "/",
    response_model=list[RestaurantResponse],
)
def get_restaurants(db: Session = Depends(get_db)):
    return db.query(Restaurant).all()


# ===========================
# Get Restaurant by ID
# ===========================
@router.get(
    "/{restaurant_id}",
    response_model=RestaurantResponse,
)
def get_restaurant(
    restaurant_id: int,
    db: Session = Depends(get_db),
):
    restaurant = (
        db.query(Restaurant)
        .filter(Restaurant.restaurant_id == restaurant_id)
        .first()
    )

    if not restaurant:
        raise HTTPException(
            status_code=404,
            detail="Restaurant not found",
        )

    return restaurant


# ===========================
# Update Restaurant
# ===========================
@router.put(
    "/{restaurant_id}",
    response_model=RestaurantResponse,
)
def update_restaurant(
    restaurant_id: int,
    restaurant: RestaurantUpdate,
    db: Session = Depends(get_db),
):
    db_restaurant = (
        db.query(Restaurant)
        .filter(Restaurant.restaurant_id == restaurant_id)
        .first()
    )

    if not db_restaurant:
        raise HTTPException(
            status_code=404,
            detail="Restaurant not found",
        )

    update_data = restaurant.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(db_restaurant, key, value)

    db_restaurant.updated_at = datetime.utcnow()

    db.commit()
    db.refresh(db_restaurant)

    return db_restaurant


# ===========================
# Delete Restaurant
# ===========================
@router.delete("/{restaurant_id}")
def delete_restaurant(
    restaurant_id: int,
    db: Session = Depends(get_db),
):
    restaurant = (
        db.query(Restaurant)
        .filter(Restaurant.restaurant_id == restaurant_id)
        .first()
    )

    if not restaurant:
        raise HTTPException(
            status_code=404,
            detail="Restaurant not found",
        )

    db.delete(restaurant)
    db.commit()

    return {
        "message": "Restaurant deleted successfully"
    }