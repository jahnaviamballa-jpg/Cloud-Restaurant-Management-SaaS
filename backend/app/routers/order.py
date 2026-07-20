from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.inventory import Inventory
from app.models.menu import Menu
from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.restaurant import Restaurant

from app.schemas.order_schema import (
    OrderCreate,
    OrderResponse,
    OrderStatusUpdate,
    PaymentStatusUpdate,
)

router = APIRouter(
    prefix="/orders",
    tags=["Order Management"],
)


# =====================================================
# Place Order
# POST /orders
# =====================================================
@router.post(
    "/",
    response_model=OrderResponse,
    status_code=status.HTTP_201_CREATED,
)
def place_order(
    order: OrderCreate,
    db: Session = Depends(get_db),
):
    restaurant = (
        db.query(Restaurant)
        .filter(
            Restaurant.restaurant_id == order.restaurant_id
        )
        .first()
    )

    if not restaurant:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Restaurant not found",
        )

    new_order = Order(
        restaurant_id=order.restaurant_id,
        customer_id=order.customer_id,
        payment_method=order.payment_method,
        payment_status="Pending",
        order_status="Pending",
        total_amount=0,
    )

    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    total_amount = 0

    for item in order.items:

        menu = (
            db.query(Menu)
            .filter(Menu.id == item.menu_id)
            .first()
        )

        if not menu:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Menu item {item.menu_id} not found",
            )

        if not menu.is_available:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"{menu.name} is unavailable",
            )

        subtotal = menu.price * item.quantity
        total_amount += subtotal

        order_item = OrderItem(
            order_id=new_order.id,
            menu_id=item.menu_id,
            quantity=item.quantity,
            price=menu.price,
            subtotal=subtotal,
        )

        db.add(order_item)

        inventory = (
            db.query(Inventory)
            .filter(
                Inventory.restaurant_id == order.restaurant_id
            )
            .first()
        )

        if inventory:
            inventory.quantity = max(
                inventory.quantity - 1,
                0,
            )

    new_order.total_amount = total_amount

    db.commit()
    db.refresh(new_order)

    return new_order


# =====================================================
# Get All Orders
# =====================================================
@router.get(
    "/restaurants/{restaurant_id}",
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
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Restaurant not found",
        )

    return (
        db.query(Order)
        .filter(
            Order.restaurant_id == restaurant_id
        )
        .all()
    )


# =====================================================
# Get Single Order
# =====================================================
@router.get(
    "/{order_id}",
    response_model=OrderResponse,
)
def get_order(
    order_id: int,
    db: Session = Depends(get_db),
):
    order = (
        db.query(Order)
        .filter(Order.id == order_id)
        .first()
    )

    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found",
        )

    return order


# =====================================================
# Update Order Status
# =====================================================
@router.put("/{order_id}/status")
def update_order_status(
    order_id: int,
    order_status: OrderStatusUpdate,
    db: Session = Depends(get_db),
):
    order = (
        db.query(Order)
        .filter(Order.id == order_id)
        .first()
    )

    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found",
        )

    order.order_status = order_status.order_status

    db.commit()
    db.refresh(order)

    return {
        "message": "Order status updated successfully",
        "order": order,
    }


# =====================================================
# Update Payment Status
# =====================================================
@router.put("/{order_id}/payment")
def update_payment_status(
    order_id: int,
    payment_status: PaymentStatusUpdate,
    db: Session = Depends(get_db),
):
    order = (
        db.query(Order)
        .filter(Order.id == order_id)
        .first()
    )

    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found",
        )

    order.payment_status = payment_status.payment_status

    db.commit()
    db.refresh(order)

    return {
        "message": "Payment status updated successfully",
        "order": order,
    }


# =====================================================
# Order Statistics
# =====================================================
@router.get("/restaurants/{restaurant_id}/stats")
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


# =====================================================
# Delete Order
# =====================================================
@router.delete(
    "/{order_id}",
    status_code=status.HTTP_200_OK,
)
def delete_order(
    order_id: int,
    db: Session = Depends(get_db),
):
    order = (
        db.query(Order)
        .filter(Order.id == order_id)
        .first()
    )

    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found",
        )

    db.delete(order)
    db.commit()

    return {
        "message": "Order deleted successfully",
    }