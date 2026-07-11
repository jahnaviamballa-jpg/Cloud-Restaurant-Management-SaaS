from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.menu import Menu
from app.models.inventory import Inventory

from app.services.prediction_service import (
    calculate_daily_usage,
    predict_days_remaining,
)


# -----------------------------
# Sales Analytics
# -----------------------------
def get_sales_analytics(db):

    total_orders = db.query(Order).count()

    return {
        "today_orders": total_orders,
        "weekly_orders": total_orders,
        "monthly_orders": total_orders,
    }


# -----------------------------
# Revenue Analytics
# -----------------------------
def get_revenue_analytics(db):

    orders = db.query(Order).all()

    total_revenue = sum(order.total_amount for order in orders)

    return {
        "today_revenue": total_revenue,
        "weekly_revenue": total_revenue,
        "monthly_revenue": total_revenue,
    }


# -----------------------------
# Top Selling Menu Items
# -----------------------------
def get_top_selling_items(db):

    menu_items = db.query(Menu).all()

    result = []

    for menu in menu_items:

        order_items = db.query(OrderItem).filter(
            OrderItem.menu_id == menu.id
        ).all()

        total_orders = sum(item.quantity for item in order_items)

        revenue = sum(item.subtotal for item in order_items)

        result.append({
            "item": menu.name,
            "orders": total_orders,
            "revenue": revenue
        })

    result.sort(
        key=lambda x: x["orders"],
        reverse=True
    )

    return result


# -----------------------------
# Order Statistics
# -----------------------------
def get_order_statistics(db):

    orders = db.query(Order).all()

    stats = {
        "pending": 0,
        "preparing": 0,
        "ready": 0,
        "served": 0,
        "cancelled": 0,
    }

    for order in orders:

        status = order.order_status.lower()

        if status in stats:
            stats[status] += 1

    return stats


# -----------------------------
# Inventory Usage Analytics
# -----------------------------
def get_inventory_usage(db):

    inventory_items = db.query(Inventory).all()

    total_items = len(inventory_items)

    low_stock = 0
    critical_stock = 0
    total_days = 0

    for item in inventory_items:

        daily_usage = calculate_daily_usage()

        days_remaining = predict_days_remaining(
            item.quantity,
            daily_usage
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