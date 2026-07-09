from fastapi import FastAPI
from app.database import engine, Base

# Import models so SQLAlchemy knows about them
from app.models import restaurant

app = FastAPI(title="Restaurant Management SaaS")

# Create all tables
Base.metadata.create_all(bind=engine)

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