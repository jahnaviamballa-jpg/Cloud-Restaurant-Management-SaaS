from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db

from app.services.analytics_service import (
    get_sales_analytics,
    get_revenue_analytics,
    get_top_selling_items,
    get_order_statistics,
    get_inventory_usage,
)

router = APIRouter()


# ----------------------------------------
# Sales Analytics
# GET /analytics/sales
# ----------------------------------------
@router.get("/sales")
def sales_analytics(db: Session = Depends(get_db)):
    return get_sales_analytics(db)


# ----------------------------------------
# Revenue Analytics
# GET /analytics/revenue
# ----------------------------------------
@router.get("/revenue")
def revenue_analytics(db: Session = Depends(get_db)):
    return get_revenue_analytics(db)


# ----------------------------------------
# Top Selling Items
# GET /analytics/top-items
# ----------------------------------------
@router.get("/top-items")
def top_items(db: Session = Depends(get_db)):
    return get_top_selling_items(db)


# ----------------------------------------
# Order Statistics
# GET /analytics/orders
# ----------------------------------------
@router.get("/orders")
def order_statistics(db: Session = Depends(get_db)):
    return get_order_statistics(db)


# ----------------------------------------
# Inventory Analytics
# GET /analytics/inventory
# ----------------------------------------
@router.get("/inventory")
def inventory_analytics(db: Session = Depends(get_db)):
    return get_inventory_usage(db)