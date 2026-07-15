from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.inventory import Inventory
from app.services.prediction_service import (
    calculate_daily_usage,
    predict_days_remaining,
    suggest_reorder_quantity,
    generate_inventory_summary,
)

router = APIRouter()


# ------------------------------------
# GET /predictions
# ------------------------------------
@router.get("/")
def get_predictions(db: Session = Depends(get_db)):

    inventory_items = db.query(Inventory).all()

    predictions = []

    for item in inventory_items:

        daily_usage = calculate_daily_usage(item.item_name)
        days_remaining = predict_days_remaining(
            item.quantity,
            daily_usage
        )

        recommendation = suggest_reorder_quantity(
            days_remaining
        )

        predictions.append({
            "inventory_id": item.id,
            "item_name": item.item_name,
            "current_stock": item.quantity,
            "daily_usage": daily_usage,
            "days_remaining": days_remaining,
            "recommendation": recommendation["recommendation"],
            "reorder_quantity": recommendation["quantity"]
        })

    return predictions


# ------------------------------------
# GET /predictions/{inventory_id}
# ------------------------------------
@router.get("/{inventory_id}")
def get_prediction(
    inventory_id: int,
    db: Session = Depends(get_db)
):

    item = db.query(Inventory).filter(
        Inventory.id == inventory_id
    ).first()

    if not item:
        raise HTTPException(
            status_code=404,
            detail="Inventory item not found"
        )

    daily_usage = calculate_daily_usage(item.item_name)

    days_remaining = predict_days_remaining(
        item.quantity,
        daily_usage
    )

    recommendation = suggest_reorder_quantity(
        days_remaining
    )

    return {
        "inventory_id": item.id,
        "item_name": item.item_name,
        "current_stock": item.quantity,
        "daily_usage": daily_usage,
        "days_remaining": days_remaining,
        "recommendation": recommendation["recommendation"],
        "reorder_quantity": recommendation["quantity"]
    }


# ------------------------------------
# GET /analytics/inventory
# ------------------------------------
@router.get("/analytics/inventory")
def inventory_analytics(db: Session = Depends(get_db)):

    inventory_items = db.query(Inventory).all()

    return generate_inventory_summary(
        inventory_items
    )