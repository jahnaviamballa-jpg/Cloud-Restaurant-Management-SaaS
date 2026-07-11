def calculate_daily_usage():
    """
    Dummy average daily usage.
    Later this can be replaced with actual order history analysis.
    """
    return 5


def predict_days_remaining(current_stock, daily_usage):
    """
    Days Remaining = Current Stock / Daily Usage
    """

    if daily_usage <= 0:
        return 0

    return round(current_stock / daily_usage, 2)


def suggest_reorder_quantity(days_remaining):
    """
    Returns recommendation and reorder quantity.
    """

    if days_remaining < 5:
        return {
            "recommendation": "Reorder Immediately",
            "quantity": 50
        }

    elif days_remaining < 10:
        return {
            "recommendation": "Plan Reorder",
            "quantity": 20
        }

    else:
        return {
            "recommendation": "Stock Sufficient",
            "quantity": 0
        }


def generate_inventory_summary(inventory_items):
    """
    Generates analytics for dashboard.
    """

    total_items = len(inventory_items)

    low_stock = 0
    critical_stock = 0
    total_days = 0

    for item in inventory_items:

        daily_usage = calculate_daily_usage()

        days = predict_days_remaining(
            item.quantity,
            daily_usage
        )

        total_days += days

        if item.quantity <= item.minimum_stock:
            low_stock += 1

        if days < 5:
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
        "average_days_remaining": average_days
    }