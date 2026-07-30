from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db

from app.services.report_service import (
    get_sales_report,
    get_inventory_report,
    get_order_report,
)

router = APIRouter(
    prefix="/reports",
    tags=["Reports"],
)


@router.get("/restaurants/{restaurant_id}/sales")
def sales_report(
    restaurant_id: int,
    db: Session = Depends(get_db),
):
    return get_sales_report(
        db,
        restaurant_id,
    )


@router.get("/restaurants/{restaurant_id}/inventory")
def inventory_report(
    restaurant_id: int,
    db: Session = Depends(get_db),
):
    return get_inventory_report(
        db,
        restaurant_id,
    )


@router.get("/restaurants/{restaurant_id}/orders")
def order_report(
    restaurant_id: int,
    db: Session = Depends(get_db),
):
    return get_order_report(
        db,
        restaurant_id,
    )


@router.get("/restaurants/{restaurant_id}/summary")
def report_summary(
    restaurant_id: int,
    db: Session = Depends(get_db),
):
    return {
        "sales": get_sales_report(
            db,
            restaurant_id,
        ),
        "inventory": get_inventory_report(
            db,
            restaurant_id,
        ),
        "orders": get_order_report(
            db,
            restaurant_id,
        ),
    }