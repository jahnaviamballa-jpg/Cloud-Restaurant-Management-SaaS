from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db

from app.services.notification_service import (
    get_low_stock_notifications,
    get_recent_notifications,
)

router = APIRouter()


# ---------------------------------------
# GET /notifications/low-stock
# ---------------------------------------
@router.get("/low-stock")
def low_stock(db: Session = Depends(get_db)):
    return get_low_stock_notifications(db)


# ---------------------------------------
# GET /notifications
# ---------------------------------------
@router.get("/")
def recent_notifications(db: Session = Depends(get_db)):
    return get_recent_notifications(db)