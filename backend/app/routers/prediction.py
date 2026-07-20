from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.inventory import Inventory
from app.services.prediction_service import (
    calculate_daily_usage,
    predict_days_remaining,
    suggest_reorder_quantity,
    generate_inventory_summary,
)

router = APIRouter(
    tags=["AI Prediction"],
)


# =====================================================
# Get Predictions for All Inventory Items
# GET /predictions/
# =====================================================
@router.get(
    "/",
    status_code=status.HTTP_200_OK,
    summary="Predict Inventory Consumption",
)
def get_predictions(
    db: Session = Depends(get_db),
):
    inventory_items = db.query(Inventory).all()

    predictions = []

    for item in inventory_items:

        daily_usage = calculate_daily_usage(
            item.item_name
        )

        days_remaining = predict_days_remaining(
            item.quantity,
            daily_usage,
        )

        recommendation = suggest_reorder_quantity(
            days_remaining
        )

        predictions.append(
            {
                "inventory_id": item.id,
                "item_name": item.item_name,
                "current_stock": item.quantity,
                "daily_usage": daily_usage,
                "days_remaining": days_remaining,
                "recommendation": recommendation["recommendation"],
                "reorder_quantity": recommendation["quantity"],
            }
        )

    return predictions


# =====================================================
# Get Prediction for One Inventory Item
# GET /predictions/{inventory_id}
# =====================================================
@router.get(
    "/{inventory_id}",
    status_code=status.HTTP_200_OK,
    summary="Predict Single Inventory Item",
)
def get_prediction(
    inventory_id: int,
    db: Session = Depends(get_db),
):
    item = (
        db.query(Inventory)
        .filter(Inventory.id == inventory_id)
        .first()
    )

    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Inventory item not found",
        )

    daily_usage = calculate_daily_usage(
        item.item_name
    )

    days_remaining = predict_days_remaining(
        item.quantity,
        daily_usage,
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
        "reorder_quantity": recommendation["quantity"],
    }


# =====================================================
# Inventory Analytics Summary
# GET /predictions/analytics/inventory
# =====================================================
@router.get(
    "/analytics/inventory",
    status_code=status.HTTP_200_OK,
    summary="Inventory Prediction Analytics",
)
def inventory_analytics(
    db: Session = Depends(get_db),
):
    inventory_items = db.query(Inventory).all()

    return generate_inventory_summary(
        inventory_items
    )