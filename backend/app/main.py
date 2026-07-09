from fastapi import FastAPI
from app.database import engine, Base

# Import models
from app.models import restaurant, user
from app.routers.auth import router as auth_router

app = FastAPI(
    title="Restaurant Management SaaS",
    version="1.0.0"
)

# Create database tables
Base.metadata.create_all(bind=engine)

app.include_router(auth_router)

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