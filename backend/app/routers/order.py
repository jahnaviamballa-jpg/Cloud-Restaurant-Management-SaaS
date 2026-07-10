from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.restaurant import Restaurant
from app.models.menu import Menu

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

    restaurant = db.query(Restaurant).filter(
        Restaurant.restaurant_id == order.restaurant_id
    ).first()

    if not restaurant:
        raise HTTPException(
            status_code=404,
            detail="Restaurant not found"
        )

    total_amount = 0

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

    new_order.total_amount = total_amount

    db.commit()
    db.refresh(new_order)

    return new_order


# -----------------------------
# Get All Orders
# -----------------------------
@router.get("/", response_model=list[OrderResponse])
def get_orders(db: Session = Depends(get_db)):
    return db.query(Order).all()


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