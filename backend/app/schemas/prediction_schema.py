from pydantic import BaseModel


class PredictionRequest(BaseModel):
    inventory_id: int


class PredictionResponse(BaseModel):
    inventory_id: int
    item_name: str
    current_stock: float
    daily_usage: float
    days_remaining: float
    recommendation: str
    reorder_quantity: int


class InventoryAnalyticsResponse(BaseModel):
    total_items: int
    low_stock: int
    critical_stock: int
    average_days_remaining: float