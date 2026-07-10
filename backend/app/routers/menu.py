from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.menu import Menu
from app.models.restaurant import Restaurant
from app.schemas.menu_schema import (
    MenuCreate,
    MenuUpdate,
    MenuResponse,
)

router = APIRouter()


@router.post(
    "/restaurants/{restaurant_id}/menu",
    response_model=MenuResponse,
    status_code=201,
)
def add_menu_item(
    restaurant_id: int,
    menu: MenuCreate,
    db: Session = Depends(get_db),
):
    # Check restaurant exists
    restaurant = (
        db.query(Restaurant)
        .filter(Restaurant.restaurant_id == restaurant_id)
        .first()
    )
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.menu import Menu
from app.models.restaurant import Restaurant
from app.schemas.menu_schema import (
    MenuCreate,
    MenuUpdate,
    MenuResponse,
)

router = APIRouter()


# -------------------------------
# Add Menu Item
# POST /restaurants/{restaurant_id}/menu
# -------------------------------
@router.post(
    "/restaurants/{restaurant_id}/menu",
    response_model=MenuResponse,
    status_code=status.HTTP_201_CREATED,
)
def add_menu_item(
    restaurant_id: int,
    menu: MenuCreate,
    db: Session = Depends(get_db),
):
    # Check restaurant exists
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

    if menu.price <= 0:
        raise HTTPException(
            status_code=400,
            detail="Price must be greater than 0",
        )

    menu_item = Menu(
        restaurant_id=restaurant_id,
        category=menu.category,
        name=menu.name,
        description=menu.description,
        price=menu.price,
        image_url=menu.image_url,
        is_available=menu.is_available,
        is_veg=menu.is_veg,
    )

    db.add(menu_item)
    db.commit()
    db.refresh(menu_item)

    return menu_item


# -------------------------------
# Get All Menu Items
# GET /restaurants/{restaurant_id}/menu
# -------------------------------
@router.get(
    "/restaurants/{restaurant_id}/menu",
    response_model=list[MenuResponse],
)
def get_menu(
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

    menu_items = (
        db.query(Menu)
        .filter(Menu.restaurant_id == restaurant_id)
        .all()
    )

    return menu_items


# -------------------------------
# Get Single Menu Item
# GET /menu/{menu_id}
# -------------------------------
@router.get(
    "/menu/{menu_id}",
    response_model=MenuResponse,
)
def get_menu_item(
    menu_id: int,
    db: Session = Depends(get_db),
):
    menu_item = (
        db.query(Menu)
        .filter(Menu.id == menu_id)
        .first()
    )

    if not menu_item:
        raise HTTPException(
            status_code=404,
            detail="Menu item not found",
        )

    return menu_item


# -------------------------------
# Update Menu Item
# PUT /menu/{menu_id}
# -------------------------------
@router.put(
    "/menu/{menu_id}",
    response_model=MenuResponse,
)
def update_menu_item(
    menu_id: int,
    menu: MenuUpdate,
    db: Session = Depends(get_db),
):
    menu_item = (
        db.query(Menu)
        .filter(Menu.id == menu_id)
        .first()
    )

    if not menu_item:
        raise HTTPException(
            status_code=404,
            detail="Menu item not found",
        )

    update_data = menu.model_dump(exclude_unset=True)

    if "price" in update_data and update_data["price"] <= 0:
        raise HTTPException(
            status_code=400,
            detail="Price must be greater than 0",
        )

    for key, value in update_data.items():
        setattr(menu_item, key, value)

    db.commit()
    db.refresh(menu_item)

    return menu_item


# -------------------------------
# Delete Menu Item
# DELETE /menu/{menu_id}
# -------------------------------
@router.delete("/menu/{menu_id}")
def delete_menu_item(
    menu_id: int,
    db: Session = Depends(get_db),
):
    menu_item = (
        db.query(Menu)
        .filter(Menu.id == menu_id)
        .first()
    )

    if not menu_item:
        raise HTTPException(
            status_code=404,
            detail="Menu item not found",
        )

    db.delete(menu_item)
    db.commit()

    return {
        "message": "Menu item deleted successfully"
    }
    if not restaurant:
        raise HTTPException(
            status_code=404,
            detail="Restaurant not found"
        )

    menu_item = Menu(
        restaurant_id=restaurant_id,
        category=menu.category,
        name=menu.name,
        description=menu.description,
        price=menu.price,
        image_url=menu.image_url,
        is_available=menu.is_available,
        is_veg=menu.is_veg,
    )

    db.add(menu_item)
    db.commit()
    db.refresh(menu_item)

    return menu_item