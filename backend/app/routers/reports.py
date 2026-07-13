from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db

from app.services.report_service import (
    get_sales_report,
    get_inventory_report,
    get_order_report,
)

router = APIRouter()


# ---------------------------------------
# GET /reports/sales
# ---------------------------------------
@router.get("/sales")
def sales_report(db: Session = Depends(get_db)):
    return get_sales_report(db)


# ---------------------------------------
# GET /reports/inventory
# ---------------------------------------
@router.get("/inventory")
def inventory_report(db: Session = Depends(get_db)):
    return get_inventory_report(db)


# ---------------------------------------
# GET /reports/orders
# ---------------------------------------
@router.get("/orders")
def order_report(db: Session = Depends(get_db)):
    return get_order_report(db)