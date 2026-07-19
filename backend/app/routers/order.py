from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.restaurant import Restaurant
from app.models.menu import Menu
from app.models.inventory import Inventory

from app.schemas.order_schema import (
    OrderCreate,
    OrderResponse,
    OrderStatusUpdate
)

router = APIRouter()


# -----------------------------
# Place Order
# -----------------------------
@router.post("/", response_model=OrderResponse, status_code=201)
def place_order(order: OrderCreate, db: Session = Depends(get_db)):

    # Check Restaurant
    restaurant = db.query(Restaurant).filter(
        Restaurant.restaurant_id == order.restaurant_id
    ).first()

    if not restaurant:
        raise HTTPException(
            status_code=404,
            detail="Restaurant not found"
        )

    total_amount = 0

    # Create Order
    new_order = Order(
        restaurant_id=order.restaurant_id,
        customer_id=order.customer_id,
        payment_method=order.payment_method,
        payment_status="Pending",
        order_status="Pending",
        total_amount=0
    )

    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    low_stock_items = []

    # Process Each Menu Item
    for item in order.items:

        menu = db.query(Menu).filter(
            Menu.id == item.menu_id
        ).first()

        if not menu:
            raise HTTPException(
                status_code=404,
                detail=f"Menu item {item.menu_id} not found"
            )

        if not menu.is_available:
            raise HTTPException(
                status_code=400,
                detail=f"{menu.name} is unavailable"
            )

        subtotal = menu.price * item.quantity
        total_amount += subtotal

        order_item = OrderItem(
            order_id=new_order.id,
            menu_id=item.menu_id,
            quantity=item.quantity,
            price=menu.price,
            subtotal=subtotal
        )

        db.add(order_item)

        # -----------------------------
        # Automatic Stock Deduction
        # -----------------------------
        inventory = db.query(Inventory).filter(
            Inventory.restaurant_id == order.restaurant_id
        ).first()

        if inventory:

            inventory.quantity -= 1

            if inventory.quantity < 0:
                inventory.quantity = 0

            if inventory.quantity <= inventory.minimum_stock:
                low_stock_items.append({
                    "item": inventory.item_name,
                    "remaining_quantity": inventory.quantity
                })

    # Update Total Amount
    new_order.total_amount = total_amount

    db.commit()
    db.refresh(new_order)

    # Return Low Stock Alert (Optional)
    if low_stock_items:
        return {
            "id": new_order.id,
            "restaurant_id": new_order.restaurant_id,
            "customer_id": new_order.customer_id,
            "total_amount": new_order.total_amount,
            "order_status": new_order.order_status,
            "payment_status": new_order.payment_status,
            "payment_method": new_order.payment_method,
            "created_at": new_order.created_at,
            "updated_at": new_order.updated_at,
            "low_stock_alert": low_stock_items
        }

    return new_order


# -----------------------------
# Get All Orders
# -----------------------------
@router.get(
    "/restaurants/{restaurant_id}/orders",
    response_model=list[OrderResponse],
)
def get_orders(
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

    orders = (
        db.query(Order)
        .filter(
            Order.restaurant_id == restaurant_id
        )
        .all()
    )

    return orders


# -----------------------------
# Get Order By ID
# -----------------------------
@router.get("/{order_id}", response_model=OrderResponse)
def get_order(order_id: int, db: Session = Depends(get_db)):

    order = db.query(Order).filter(
        Order.id == order_id
    ).first()

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    return order


# -----------------------------
# Update Order Status
# -----------------------------
@router.put("/{order_id}/status")
def update_status(
    order_id: int,
    status: OrderStatusUpdate,
    db: Session = Depends(get_db)
):

    order = db.query(Order).filter(
        Order.id == order_id
    ).first()

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    order.order_status = status.order_status

    db.commit()
    db.refresh(order)

    return {
        "message": "Order status updated successfully",
        "order": order
    }


# -----------------------------
# Delete Order
# -----------------------------
@router.delete("/{order_id}")
def delete_order(order_id: int, db: Session = Depends(get_db)):

    order = db.query(Order).filter(
        Order.id == order_id
    ).first()

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    db.delete(order)
    db.commit()

    return {
        "message": "Order deleted successfully"
    }
@router.get("/restaurants/{restaurant_id}/orders/stats")
def get_order_stats(
    restaurant_id: int,
    db: Session = Depends(get_db),
):
    pending = db.query(Order).filter(
        Order.restaurant_id == restaurant_id,
        Order.order_status == "Pending",
    ).count()

    preparing = db.query(Order).filter(
        Order.restaurant_id == restaurant_id,
        Order.order_status == "Preparing",
    ).count()

    ready = db.query(Order).filter(
        Order.restaurant_id == restaurant_id,
        Order.order_status == "Ready",
    ).count()

    served = db.query(Order).filter(
        Order.restaurant_id == restaurant_id,
        Order.order_status == "Served",
    ).count()

    return {
        "pending": pending,
        "preparing": preparing,
        "ready": ready,
        "served": served,
    }