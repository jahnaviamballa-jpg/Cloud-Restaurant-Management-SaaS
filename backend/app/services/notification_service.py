from app.models.inventory import Inventory


# =====================================================
# Low Stock Notifications
# =====================================================
def get_low_stock_notifications(db):
    """
    Returns all inventory items that are
    below their minimum stock level.
    """

    items = db.query(Inventory).all()

    alerts = []

    for item in items:

        if item.quantity <= item.minimum_stock:

            if item.quantity <= 5:
                status = "Critical"
            else:
                status = "Low"

            alerts.append(
                {
                    "item": item.item_name,
                    "quantity": item.quantity,
                    "minimum_stock": item.minimum_stock,
                    "status": status,
                }
            )

    return alerts


# =====================================================
# Recent Notifications
# =====================================================
def get_recent_notifications(db):
    """
    Returns notification messages for dashboard.
    """

    alerts = get_low_stock_notifications(db)

    notifications = []

    for alert in alerts:

        notifications.append(
            {
                "title": "Low Stock Alert",
                "message": (
                    f"{alert['item']} stock is "
                    f"{alert['status']} "
                    f"({alert['quantity']} remaining)"
                ),
                "type": alert["status"],
            }
        )

    return notifications