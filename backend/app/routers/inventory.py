from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.inventory import Inventory
from app.models.restaurant import Restaurant
from app.schemas.inventory_schema import (
    InventoryCreate,
    InventoryUpdate,
    InventoryResponse,
)

router = APIRouter()


# -----------------------------
# Add Inventory
# -----------------------------
@router.post("/", response_model=InventoryResponse, status_code=201)
def add_inventory(item: InventoryCreate, db: Session = Depends(get_db)):

    restaurant = db.query(Restaurant).filter(
        Restaurant.restaurant_id == item.restaurant_id
    ).first()

    if not restaurant:
        raise HTTPException(
            status_code=404,
            detail="Restaurant not found"
        )

    inventory = Inventory(**item.model_dump())

    db.add(inventory)
    db.commit()
    db.refresh(inventory)

    return inventory


# -----------------------------
# Get All Inventory
# -----------------------------
@router.get(
    "/restaurants/{restaurant_id}/inventory",
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
            status_code=404,
            detail="Restaurant not found",
        )

    return (
        db.query(Inventory)
        .filter(
            Inventory.restaurant_id == restaurant_id
        )
        .all()
    )

# -----------------------------
# Get Inventory By ID
# -----------------------------
@router.get("/{id}", response_model=InventoryResponse)
def get_inventory_item(id: int, db: Session = Depends(get_db)):

    item = db.query(Inventory).filter(
        Inventory.id == id
    ).first()

    if not item:
        raise HTTPException(
            status_code=404,
            detail="Inventory item not found"
        )

    return item


# -----------------------------
# Update Inventory
# -----------------------------
@router.put("/{id}")
def update_inventory(
    id: int,
    updated_item: InventoryUpdate,
    db: Session = Depends(get_db)
):

    item = db.query(Inventory).filter(
        Inventory.id == id
    ).first()

    if not item:
        raise HTTPException(
            status_code=404,
            detail="Inventory item not found"
        )

    # Update only the provided fields
    for key, value in updated_item.model_dump(exclude_unset=True).items():
        setattr(item, key, value)

    db.commit()
    db.refresh(item)

    # -----------------------------
    # Low Stock Alert
    # -----------------------------
    if item.quantity <= item.minimum_stock:
        return {
            "message": "Low Stock Alert",
            "item": item.item_name,
            "remaining_quantity": item.quantity
        }

    return item


# -----------------------------
# Delete Inventory
# -----------------------------
@router.delete("/{id}")
def delete_inventory(id: int, db: Session = Depends(get_db)):

    item = db.query(Inventory).filter(
        Inventory.id == id
    ).first()

    if not item:
        raise HTTPException(
            status_code=404,
            detail="Inventory item not found"
        )

    db.delete(item)
    db.commit()

    return {
        "message": "Inventory item deleted successfully"
    }
@router.get("/restaurants/{restaurant_id}/inventory/stats")
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
        if item.quantity <= (item.minimum_stock // 2)
    )

    return {
        "total_items": total_items,
        "low_stock": low_stock,
        "critical_stock": critical_stock,
    }