from fastapi import FastAPI

app = FastAPI(
    title="Cloud Restaurant Management SaaS",
    version="1.0.0"
)

@app.get("/")
def home():
    return {
        "message": "Cloud Restaurant Management SaaS Backend Running Successfully"
    }