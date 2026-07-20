from typing import Optional


# =====================================================
# Default Daily Usage Data
# =====================================================

DEFAULT_DAILY_USAGE = {
    "AI Test Chicken": 5,
    "AI Test Rice": 10,
    "AI Test Oil": 5,
}


# =====================================================
# Calculate Daily Usage
# =====================================================
def calculate_daily_usage(
    item_name: Optional[str] = None,
) -> float:
    """
    Returns the estimated average daily usage of an item.

    Later this can be replaced with:
    - Order history analysis
    - Machine Learning prediction
    - Time-series forecasting
    """

    return DEFAULT_DAILY_USAGE.get(item_name, 5)


# =====================================================
# Predict Remaining Days
# =====================================================
def predict_days_remaining(
    current_stock: int,
    daily_usage: float,
) -> float:
    """
    Predict how many days the stock will last.
    """

    if current_stock <= 0:
        return 0

    if daily_usage <= 0:
        return 0

    return round(current_stock / daily_usage, 2)


# =====================================================
# Suggest Reorder Quantity
# =====================================================
def suggest_reorder_quantity(
    days_remaining: float,
) -> dict:
    """
    Returns reorder recommendation.
    """

    if days_remaining < 5:
        return {
            "recommendation": "Reorder Immediately",
            "quantity": 50,
        }

    if days_remaining < 10:
        return {
            "recommendation": "Plan Reorder",
            "quantity": 20,
        }

    return {
        "recommendation": "Stock Sufficient",
        "quantity": 0,
    }


# =====================================================
# Inventory Summary Analytics
# =====================================================
def generate_inventory_summary(
    inventory_items,
):
    """
    Generate inventory analytics for dashboard.
    """

    total_items = len(inventory_items)

    low_stock = 0
    critical_stock = 0
    total_days = 0

    for item in inventory_items:

        daily_usage = calculate_daily_usage(
            item.item_name
        )

        days_remaining = predict_days_remaining(
            item.quantity,
            daily_usage,
        )

        total_days += days_remaining

        if item.quantity <= item.minimum_stock:
            low_stock += 1

        if days_remaining < 5:
            critical_stock += 1

    average_days = (
        round(total_days / total_items, 2)
        if total_items > 0
        else 0
    )

    return {
        "total_items": total_items,
        "low_stock": low_stock,
        "critical_stock": critical_stock,
        "average_days_remaining": average_days,
    }