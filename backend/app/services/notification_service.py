from app.models.inventory import Inventory


def get_low_stock_notifications(db):

    items = db.query(Inventory).all()

    alerts = []

    for item in items:

        if item.quantity <= item.minimum_stock:

            status = "Critical" if item.quantity <= 5 else "Low"

            alerts.append({
                "item": item.item_name,
                "quantity": item.quantity,
                "status": status
            })

    return alerts


def get_recent_notifications(db):

    notifications = []

    for alert in get_low_stock_notifications(db):

        notifications.append({
            "title": "Low Stock Alert",
            "message": f"{alert['item']} stock is {alert['status']}",
        })

    return notifications