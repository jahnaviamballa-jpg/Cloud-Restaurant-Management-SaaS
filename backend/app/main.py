from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine

# =====================================================
# Import Models
# =====================================================
from app.models import restaurant, user
from app.models.inventory import Inventory
from app.models.menu import Menu
from app.models.order import Order
from app.models.order_item import OrderItem

# =====================================================
# Import Routers
# =====================================================
from app.routers.analytics import router as analytics_router
from app.routers.auth import router as auth_router
from app.routers.inventory import router as inventory_router
from app.routers.menu import router as menu_router
from app.routers.notifications import router as notifications_router
from app.routers.order import router as order_router
from app.routers.prediction import router as prediction_router
from app.routers.reports import router as reports_router
from app.routers.restaurant import router as restaurant_router

# =====================================================
# Create FastAPI Application
# =====================================================
app = FastAPI(
    title="Cloud Restaurant Management SaaS API",
    description=(
        "Backend APIs for Cloud Restaurant Management System "
        "including Authentication, Restaurant Management, "
        "Menu Management, Orders, Inventory, Analytics, "
        "AI Prediction, Reports, and Notifications."
    ),
    version="1.0.0",
)

# =====================================================
# CORS Configuration
# =====================================================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =====================================================
# Create Database Tables
# =====================================================
Base.metadata.create_all(bind=engine)

# =====================================================
# Register Routers
# =====================================================

# Authentication
app.include_router(auth_router)

# Restaurant Management
app.include_router(
    restaurant_router,
    prefix="/restaurants",
    tags=["Restaurant Management"],
)

# Menu Management
app.include_router(
    menu_router,
    tags=["Menu Management"],
)

# Order Management
app.include_router(
    order_router,
    prefix="/orders",
    tags=["Order Management"],
)

# Inventory Management
app.include_router(
    inventory_router,
    prefix="/inventory",
    tags=["Inventory Management"],
)

# AI Prediction
app.include_router(
    prediction_router,
    prefix="/predictions",
    tags=["AI Prediction"],
)

# Analytics
app.include_router(
    analytics_router,
    prefix="/analytics",
    tags=["Analytics"],
)

# Reports
app.include_router(
    reports_router,
    prefix="/reports",
    tags=["Reports"],
)

# Notifications
app.include_router(
    notifications_router,
    prefix="/notifications",
    tags=["Notifications"],
)

# =====================================================
# Root Endpoint
# =====================================================
@app.get("/")
def home():
    return {
        "message": "Cloud Restaurant Management SaaS API is Running Successfully 🚀"
    }


# =====================================================
# Health Check Endpoint
# =====================================================
@app.get("/health")
def health():
    return {
        "status": "Healthy",
        "database": "Connected",
    }