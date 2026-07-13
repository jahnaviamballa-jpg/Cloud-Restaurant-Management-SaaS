from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, Base

# Import models
from app.models import restaurant, user
from app.models.menu import Menu
from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.inventory import Inventory

# Import routers
from app.routers.auth import router as auth_router
from app.routers.restaurant import router as restaurant_router
from app.routers.menu import router as menu_router
from app.routers.order import router as order_router
from app.routers.inventory import router as inventory_router
from app.routers.prediction import router as prediction_router
from app.routers.analytics import router as analytics_router
from app.routers.reports import router as reports_router
from app.routers.notifications import router as notifications_router

app = FastAPI(
    title="Restaurant Management SaaS",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create database tables
Base.metadata.create_all(bind=engine)

# Authentication
app.include_router(auth_router)

# Restaurant
app.include_router(
    restaurant_router,
    prefix="/restaurants",
    tags=["Restaurant"],
)

# Menu
app.include_router(
    menu_router,
    tags=["Menu"]
)

# Orders
app.include_router(
    order_router,
    prefix="/orders",
    tags=["Orders"]
)

# Inventory
app.include_router(
    inventory_router,
    prefix="/inventory",
    tags=["Inventory"]
)

# AI Prediction
app.include_router(
    prediction_router,
    prefix="/predictions",
    tags=["AI Prediction"]
)

# Analytics
app.include_router(
    analytics_router,
    prefix="/analytics",
    tags=["Analytics"]
)

# Reports
app.include_router(
    reports_router,
    prefix="/reports",
    tags=["Reports"]
)

# Notifications
app.include_router(
    notifications_router,
    prefix="/notifications",
    tags=["Notifications"]
)

@app.get("/")
def home():
    return {
        "message": "Backend Running Successfully"
    }


@app.get("/health")
def health():
    return {
        "status": "Database Connected"
    }