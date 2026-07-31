from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
)
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import get_db
from app.models.order import Order
from app.models.restaurant import Restaurant
from app.models.menu import Menu
from app.schemas.order_schema import (
    OrderCreate,
    OrderUpdate,
    OrderResponse,
)

router = APIRouter(
    tags=["Order Management"],
)

# =====================================================
# Create Order
# =====================================================

@router.post(
    "/",
    response_model=OrderResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_order(
    order: OrderCreate,
    db: Session = Depends(get_db),
):
    restaurant = (
        db.query(Restaurant)
        .filter(
            Restaurant.restaurant_id
            == order.restaurant_id
        )
        .first()
    )

    if not restaurant:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Restaurant not found",
        )

    if order.total_amount <= 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Total amount must be greater than 0",
        )

    new_order = Order(
    restaurant_id=order.restaurant_id,
    customer_id=order.customer_id,
    customer_name=order.customer_name,
    customer_email=order.customer_email,
    customer_phone=order.customer_phone,
    item_name=order.item_name,
    total_amount=order.total_amount,
    status=order.status,
)

    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    return new_order


# =====================================================
# Get All Orders
# =====================================================

@router.get(
    "/",
    response_model=list[OrderResponse],
)
def get_orders(
    db: Session = Depends(get_db),
):
    orders = (
        db.query(Order)
        .order_by(Order.created_at.desc())
        .all()
    )

    return orders


# =====================================================
# Get Restaurant Statistics
# =====================================================

@router.get("/restaurants/{restaurant_id}/stats")
def get_order_stats(
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

    orders = (
        db.query(Order)
        .filter(
            Order.restaurant_id == restaurant_id
        )
        .all()
    )

    total_orders = len(orders)

    pending = len(
        [o for o in orders if o.status == "Pending"]
    )

    preparing = len(
        [o for o in orders if o.status == "Preparing"]
    )

    ready = len(
        [o for o in orders if o.status == "Ready"]
    )

    served = len(
        [o for o in orders if o.status == "Served"]
    )

    cancelled = len(
        [o for o in orders if o.status == "Cancelled"]
    )

    total_revenue = sum(
        o.total_amount for o in orders
    )

    return {
        "total_orders": total_orders,
        "pending": pending,
        "preparing": preparing,
        "ready": ready,
        "served": served,
        "cancelled": cancelled,
        "total_revenue": total_revenue,
    }


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
        .filter(
            Order.id == order_id
        )
        .first()
    )

    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found",
        )

    return order


# =====================================================
# Update Order
# =====================================================

@router.put(
    "/{order_id}",
    response_model=OrderResponse,
)
def update_order(
    order_id: int,
    order: OrderUpdate,
    db: Session = Depends(get_db),
):
    db_order = (
        db.query(Order)
        .filter(
            Order.id == order_id
        )
        .first()
    )

    if not db_order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found",
        )

    update_data = order.model_dump(
        exclude_unset=True
    )

    if (
        "total_amount" in update_data
        and update_data["total_amount"] <= 0
    ):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Total amount must be greater than 0",
        )

    valid_status = [
        "Pending",
        "Preparing",
        "Ready",
        "Served",
        "Cancelled",
    ]

    if (
        "status" in update_data
        and update_data["status"] not in valid_status
    ):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Status must be one of {valid_status}",
        )

    for key, value in update_data.items():
        setattr(db_order, key, value)

    db.commit()
    db.refresh(db_order)

    return db_order


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
        .filter(
            Order.id == order_id
        )
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
        "message": "Order deleted successfully"
    }

@router.get("/recommendations/{customer_id}")
def get_recommendations(
    customer_id: int,
    db: Session = Depends(get_db),
):
    ordered_items = (
        db.query(
            Order.item_name,
            func.count(Order.item_name).label("count")
        )
        .filter(Order.customer_id == customer_id)
        .group_by(Order.item_name)
        .order_by(func.count(Order.item_name).desc())
        .limit(5)
        .all()
    )

    recommendations = []

    for item_name, count in ordered_items:

        menu_item = (
            db.query(Menu)
            .filter(Menu.name == item_name)
            .first()
        )

        if menu_item:
            recommendations.append({
                "id": menu_item.id,
                "name": menu_item.name,
                "description": menu_item.description,
                "price": menu_item.price,
                "image_url": menu_item.image_url,
                "category": menu_item.category,
                "is_veg": menu_item.is_veg,
                "is_available": menu_item.is_available,
                "count": count,
            })

    return recommendations