from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.inventory import Inventory
from app.models.restaurant import Restaurant
from app.schemas.inventory_schema import (
    InventoryCreate,
    InventoryUpdate,
    InventoryResponse,
)

router = APIRouter(
    prefix="/inventory",
    tags=["Inventory Management"],
)


# =====================================================
# Add Inventory Item
# =====================================================
@router.post(
    "/",
    response_model=InventoryResponse,
    status_code=status.HTTP_201_CREATED,
)
def add_inventory(
    item: InventoryCreate,
    db: Session = Depends(get_db),
):
    restaurant = (
        db.query(Restaurant)
        .filter(
            Restaurant.restaurant_id == item.restaurant_id
        )
        .first()
    )

    if not restaurant:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Restaurant not found",
        )

    inventory = Inventory(**item.model_dump())

    db.add(inventory)
    db.commit()
    db.refresh(inventory)

    return inventory


# =====================================================
# Get Inventory By Restaurant
# =====================================================
@router.get(
    "/restaurants/{restaurant_id}",
    response_model=list[InventoryResponse],
)
def get_inventory(
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

    return (
        db.query(Inventory)
        .filter(
            Inventory.restaurant_id == restaurant_id
        )
        .all()
    )


# =====================================================
# Get Inventory Item
# =====================================================
@router.get(
    "/{id}",
    response_model=InventoryResponse,
)
def get_inventory_item(
    id: int,
    db: Session = Depends(get_db),
):
    item = (
        db.query(Inventory)
        .filter(Inventory.id == id)
        .first()
    )

    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Inventory item not found",
        )

    return item


# =====================================================
# Update Inventory
# =====================================================
@router.put(
    "/{id}",
    response_model=InventoryResponse,
)
def update_inventory(
    id: int,
    updated_item: InventoryUpdate,
    db: Session = Depends(get_db),
):
    item = (
        db.query(Inventory)
        .filter(Inventory.id == id)
        .first()
    )

    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Inventory item not found",
        )

    update_data = updated_item.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(item, key, value)

    db.commit()
    db.refresh(item)

    return item


# =====================================================
# Delete Inventory
# =====================================================
@router.delete(
    "/{id}",
    status_code=status.HTTP_200_OK,
)
def delete_inventory(
    id: int,
    db: Session = Depends(get_db),
):
    item = (
        db.query(Inventory)
        .filter(Inventory.id == id)
        .first()
    )

    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Inventory item not found",
        )

    db.delete(item)
    db.commit()

    return {
        "message": "Inventory deleted successfully"
    }


# =====================================================
# Inventory Statistics
# =====================================================
@router.get(
    "/restaurants/{restaurant_id}/stats"
)
def get_inventory_stats(
    restaurant_id: int,
    db: Session = Depends(get_db),
):
    items = (
        db.query(Inventory)
        .filter(
            Inventory.restaurant_id == restaurant_id
        )
        .all()
    )

    total_items = len(items)

    low_stock = sum(
        1
        for item in items
        if item.quantity <= item.minimum_stock
    )

    critical_stock = sum(
        1
        for item in items
        if item.quantity <= max(
            1,
            item.minimum_stock // 2,
        )
    )

    return {
        "total_items": total_items,
        "low_stock": low_stock,
        "critical_stock": critical_stock,
    }


# =====================================================
# Low Stock Items
# =====================================================
@router.get(
    "/restaurants/{restaurant_id}/low-stock"
)
def get_low_stock_items(
    restaurant_id: int,
    db: Session = Depends(get_db),
):
    items = (
        db.query(Inventory)
        .filter(
            Inventory.restaurant_id == restaurant_id
        )
        .all()
    )

    result = [
        {
            "id": item.id,
            "item_name": item.item_name,
            "quantity": item.quantity,
            "minimum_stock": item.minimum_stock,
        }
        for item in items
        if item.quantity <= item.minimum_stock
    ]

    return {
        "count": len(result),
        "items": result,
    }