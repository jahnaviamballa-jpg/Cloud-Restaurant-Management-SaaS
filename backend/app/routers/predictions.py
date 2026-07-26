from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.inventory import Inventory
from app.models.order import Order
from app.models.restaurant import Restaurant

router = APIRouter(
    prefix="/predictions",
    tags=["AI Predictions"],
)


# =====================================================
# AI Inventory Predictions
# GET /predictions/restaurants/{restaurant_id}
# =====================================================
@router.get("/restaurants/{restaurant_id}")
def get_predictions(
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

    inventory = (
        db.query(Inventory)
        .filter(
            Inventory.restaurant_id == restaurant_id
        )
        .all()
    )

    predictions = []

    for item in inventory:

        daily_usage = max(
            1,
            round(item.minimum_stock / 5)
        )

        days_remaining = (
            item.quantity / daily_usage
            if daily_usage > 0
            else 0
        )

        if item.quantity <= 0:
            recommendation = "Reorder Immediately"
            reorder_quantity = item.minimum_stock * 3
            confidence = 99

        elif item.quantity <= item.minimum_stock:
            recommendation = "Reorder Soon"
            reorder_quantity = item.minimum_stock * 2
            confidence = 95

        elif item.quantity <= item.minimum_stock * 2:
            recommendation = "Monitor Stock"
            reorder_quantity = item.minimum_stock
            confidence = 90

        else:
            recommendation = "Stock Sufficient"
            reorder_quantity = 0
            confidence = 85

        predictions.append(
            {
                "inventory_id": item.id,
                "item_name": item.item_name,
                "current_stock": item.quantity,
                "minimum_stock": item.minimum_stock,
                "daily_usage": daily_usage,
                "days_remaining": round(days_remaining, 1),
                "reorder_quantity": reorder_quantity,
                "recommendation": recommendation,
                "confidence": confidence,
            }
        )

    return predictions

# =====================================================
# Single Prediction
# GET /predictions/{id}
# =====================================================
@router.get("/{id}")
def get_prediction(
    id: int,
    db: Session = Depends(get_db),
):

    item = (
        db.query(Inventory)
        .filter(
            Inventory.id == id
        )
        .first()
    )

    if not item:
        raise HTTPException(
            status_code=404,
            detail="Inventory item not found",
        )

    daily_usage = max(
        1,
        item.minimum_stock // 5
    )

    days_remaining = (
        item.quantity / daily_usage
        if daily_usage > 0
        else 0
    )

    if item.quantity <= item.minimum_stock:

        recommendation = "Reorder Immediately"

        reorder_quantity = (
            item.minimum_stock * 3
        ) - item.quantity

    else:

        recommendation = "Stock Sufficient"

        reorder_quantity = 0

    return {

        "inventory_id": item.id,

        "item_name": item.item_name,

        "current_stock": item.quantity,

        "daily_usage": daily_usage,

        "days_remaining": round(
            days_remaining,
            1,
        ),

        "recommendation": recommendation,

        "reorder_quantity": reorder_quantity,

    }


# =====================================================
# Prediction Analytics
# GET /predictions/restaurants/{restaurant_id}/analytics
# =====================================================
@router.get("/restaurants/{restaurant_id}/analytics")
def get_prediction_analytics(
    restaurant_id: int,
    db: Session = Depends(get_db),
):

    inventory = (
        db.query(Inventory)
        .filter(
            Inventory.restaurant_id == restaurant_id
        )
        .all()
    )

    total_items = len(inventory)

    low_stock = sum(
        1
        for item in inventory
        if item.quantity <= item.minimum_stock
    )

    critical_stock = sum(
        1
        for item in inventory
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
# Sales Prediction
# GET /predictions/restaurants/{restaurant_id}/sales
# =====================================================
@router.get("/restaurants/{restaurant_id}/sales")
def sales_prediction(
    restaurant_id: int,
    db: Session = Depends(get_db),
):

    orders = (
        db.query(Order)
        .filter(
            Order.restaurant_id == restaurant_id
        )
        .all()
    )

    total_orders = len(orders)

    total_revenue = sum(
        order.total_amount
        for order in orders
    )

    average_order = (
        total_revenue / total_orders
        if total_orders > 0
        else 0
    )

    predicted_orders = int(
        total_orders * 1.15
    )

    predicted_revenue = round(
        predicted_orders * average_order,
        2,
    )

    return {

        "today_orders": total_orders,

        "predicted_orders": predicted_orders,

        "today_revenue": total_revenue,

        "predicted_revenue": predicted_revenue,

        "average_order_value": round(
            average_order,
            2,
        ),

    }


# =====================================================
# Demand Prediction
# GET /predictions/restaurants/{restaurant_id}/demand
# =====================================================
@router.get("/restaurants/{restaurant_id}/demand")
def demand_prediction(
    restaurant_id: int,
    db: Session = Depends(get_db),
):

    orders = (
        db.query(Order)
        .filter(
            Order.restaurant_id == restaurant_id
        )
        .all()
    )

    total_orders = len(orders)

    if total_orders >= 20:

        demand = "High"

    elif total_orders >= 10:

        demand = "Medium"

    else:

        demand = "Low"

    return {

        "predicted_demand": demand,

        "expected_orders": int(
            total_orders * 1.15
        ),

    }


@router.get("/restaurants/{restaurant_id}/health")
def inventory_health(
    restaurant_id: int,
    db: Session = Depends(get_db),
):
    inventory = (
        db.query(Inventory)
        .filter(
            Inventory.restaurant_id == restaurant_id
        )
        .all()
    )

    total = len(inventory)

    if total == 0:
        return {
            "health_score": 100,
            "status": "Excellent",
        }

    low = sum(
        1
        for item in inventory
        if item.quantity <= item.minimum_stock
    )

    critical = sum(
        1
        for item in inventory
        if item.quantity <= item.minimum_stock / 2
    )

    score = max(
        0,
        100 - (low * 8) - (critical * 15),
    )

    if score >= 85:
        status = "Excellent"
    elif score >= 70:
        status = "Good"
    elif score >= 50:
        status = "Average"
    else:
        status = "Critical"

    return {
        "health_score": score,
        "status": status,
        "low_stock": low,
        "critical_stock": critical,
    }