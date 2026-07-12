from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, Base

# Import models
from app.models import restaurant, user

from app.routers.auth import router as auth_router
from app.routers.restaurant import router as restaurant_router

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

app.include_router(auth_router)
app.include_router(
    restaurant_router,
    prefix="/restaurants",
    tags=["Restaurant"],
)

@app.get("/")
def home():
    return {"message": "Backend Running Successfully"}

@app.get("/health")
def health():
    return {"status": "Database Connected"}