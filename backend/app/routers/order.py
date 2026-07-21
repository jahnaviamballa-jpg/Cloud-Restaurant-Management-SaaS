from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
)
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.order import Order
from app.models.restaurant import Restaurant

from app.schemas.order_schema import (
    OrderCreate,
    OrderUpdate,
    OrderResponse,
)

router = APIRouter(
    prefix="/orders",
    tags=["Order Management"],
)

# =====================================================
# Create Order
# POST /orders
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
        customer_name=order.customer_name,
        customer_phone=order.customer_phone,
        total_amount=order.total_amount,
        status=order.status,
    )

    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    return new_order


# =====================================================
# Get All Orders
# GET /orders
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
# Get Single Order
# GET /orders/{order_id}
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
# Update Order
# PUT /orders/{order_id}
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
        .filter(Order.id == order_id)
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
# DELETE /orders/{order_id}
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
        "message": "Order deleted successfully"
    }
# =====================================================
# Order Statistics
# GET /orders/restaurants/{restaurant_id}/stats
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