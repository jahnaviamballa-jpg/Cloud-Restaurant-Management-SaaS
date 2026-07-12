from app.models.order import Order
from app.models.inventory import Inventory

from app.services.analytics_service import (
    get_order_statistics,
    get_inventory_usage,
)


# ---------------------------------------
# Sales Report
# ---------------------------------------
def get_sales_report(db):

    orders = db.query(Order).all()

    total_orders = len(orders)

    total_revenue = sum(order.total_amount for order in orders)

    return {
        "total_orders": total_orders,
        "total_revenue": total_revenue,
        "report_period": "Monthly"
    }


# ---------------------------------------
# Inventory Report
# ---------------------------------------
def get_inventory_report(db):

    inventory = get_inventory_usage(db)

    return {
        "total_items": inventory["total_items"],
        "low_stock": inventory["low_stock"],
        "critical_stock": inventory["critical_stock"]
    }


# ---------------------------------------
# Order Report
# ---------------------------------------
def get_order_report(db):

    stats = get_order_statistics(db)

    completed = stats["served"]

    return {
        "pending": stats["pending"],
        "completed": completed,
        "cancelled": stats["cancelled"]
    }