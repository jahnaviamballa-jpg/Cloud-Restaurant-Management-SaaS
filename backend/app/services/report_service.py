from app.models.order import Order

from app.services.analytics_service import (
    get_order_statistics,
    get_inventory_usage,
)


# =====================================================
# Sales Report
# =====================================================
def get_sales_report(db):
    orders = db.query(Order).all()

    total_orders = len(orders)

    total_revenue = sum(
        order.total_amount
        for order in orders
    )

    average_order_value = (
        round(total_revenue / total_orders, 2)
        if total_orders > 0
        else 0
    )

    return {
        "report_period": "Monthly",
        "total_orders": total_orders,
        "total_revenue": total_revenue,
        "average_order_value": average_order_value,
    }


# =====================================================
# Inventory Report
# =====================================================
def get_inventory_report(db):
    inventory = get_inventory_usage(db)

    return {
        "total_items": inventory["total_items"],
        "low_stock": inventory["low_stock"],
        "critical_stock": inventory["critical_stock"],
        "average_days_remaining": inventory[
            "average_days_remaining"
        ],
    }


# =====================================================
# Order Report
# =====================================================
def get_order_report(db):
    stats = get_order_statistics(db)

    total_orders = sum(stats.values())

    return {
        "total_orders": total_orders,
        "pending": stats.get("pending", 0),
        "preparing": stats.get("preparing", 0),
        "ready": stats.get("ready", 0),
        "completed": stats.get("served", 0),
        "cancelled": stats.get("cancelled", 0),
    }