from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine

# ==========================
# Import Models
# ==========================
from app.models.restaurant import Restaurant
from app.models.menu import Menu
from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.inventory import Inventory
from app.models.reservation import Reservation
from app.models.user import User

# ==========================
# Create Tables
# ==========================
Base.metadata.create_all(bind=engine)

# ==========================
# FastAPI App
# ==========================
app = FastAPI(
    title="Cloud Restaurant Management SaaS",
    version="1.0.0",
)

# ==========================
# CORS
# ==========================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        # Local Development
        "http://localhost:5173",
        "http://127.0.0.1:5173",

        # Vercel Production
        "https://cloud-restaurant-management-saa-s.vercel.app",

        # Vercel Git Deployment
        "https://cloud-restaurant-management-saa-s-git-main-jahnavi11.vercel.app",

        # Current Preview Deployment
        "https://cloud-restaurant-management-saa-y4npfhfn8-jahnavi11.vercel.app",
    ],

    # Allow all Vercel preview deployments
    allow_origin_regex=r"https://.*\.vercel\.app",

    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================
# Import Routers
# ==========================
from app.routers import auth
from app.routers import restaurant
from app.routers import menu
from app.routers import order
from app.routers import inventory
from app.routers import reports
from app.routers import reservation_router
from app.routers import predictions
from app.routers import notifications
from app.routers import employee
from app.routers import analytics

# ==========================
# Include Routers
# ==========================
app.include_router(auth.router, prefix="/auth")
app.include_router(restaurant.router, prefix="/restaurants")
app.include_router(menu.router)
app.include_router(order.router, prefix="/orders")
app.include_router(inventory.router)
app.include_router(notifications.router)
app.include_router(analytics.router, prefix="/analytics")
app.include_router(reports.router)
app.include_router(predictions.router)
app.include_router(reservation_router.router)
app.include_router(employee.router)

# ==========================
# Root Endpoint
# ==========================
@app.get("/")
def root():
    return {
        "message": "Cloud Restaurant Management SaaS Backend Running Successfully"
    }