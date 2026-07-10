from fastapi import FastAPI
from app.database import engine, Base

# Import models
from app.models import restaurant, user
from app.models.menu import Menu
from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.inventory import Inventory
from app.routers.order import router as order_router
from app.routers.inventory import router as inventory_router

from app.routers.auth import router as auth_router
from app.routers.restaurant import router as restaurant_router
from app.routers.menu import router as menu_router

app = FastAPI(
    title="Restaurant Management SaaS",
    version="1.0.0"
)

# Create database tables
Base.metadata.create_all(bind=engine)

app.include_router(auth_router)
app.include_router(
    restaurant_router,
    prefix="/restaurants",
    tags=["Restaurant"],
)
app.include_router(
    menu_router,
    tags=["Menu"]
)
app.include_router(
    order_router,
    prefix="/orders",
    tags=["Orders"]
)
app.include_router(
    inventory_router,
    prefix="/inventory",
    tags=["Inventory"]
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