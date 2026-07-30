from app.models.order import Order
from app.models.inventory import Inventory


# =====================================================
# Sales Report
# =====================================================
def get_sales_report(db, restaurant_id: int):
    orders = (
        db.query(Order)
        .filter(Order.restaurant_id == restaurant_id)
        .all()
    )

    total_orders = len(orders)

    total_revenue = sum(
        order.total_amount for order in orders
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
def get_inventory_report(db, restaurant_id: int):
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
        if item.quantity <= max(1, item.minimum_stock // 2)
    )

    return {
        "total_items": total_items,
        "low_stock": low_stock,
        "critical_stock": critical_stock,
        "average_days_remaining": 0,
    }


# =====================================================
# Order Report
# =====================================================
def get_order_report(db, restaurant_id: int):
    orders = (
        db.query(Order)
        .filter(Order.restaurant_id == restaurant_id)
        .all()
    )

    return {
        "total_orders": len(orders),
        "pending": len(
            [o for o in orders if o.status == "Pending"]
        ),
        "preparing": len(
            [o for o in orders if o.status == "Preparing"]
        ),
        "ready": len(
            [o for o in orders if o.status == "Ready"]
        ),
        "completed": len(
            [o for o in orders if o.status == "Served"]
        ),
        "cancelled": len(
            [o for o in orders if o.status == "Cancelled"]
        ),
    }