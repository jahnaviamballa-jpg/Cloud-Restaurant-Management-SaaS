from pydantic import BaseModel


class SalesAnalyticsResponse(BaseModel):
    today_orders: int
    weekly_orders: int
    monthly_orders: int


class RevenueAnalyticsResponse(BaseModel):
    today_revenue: float
    weekly_revenue: float
    monthly_revenue: float


class TopSellingItemResponse(BaseModel):
    item: str
    orders: int
    revenue: float


class OrderStatisticsResponse(BaseModel):
    pending: int
    preparing: int
    ready: int
    served: int
    cancelled: int


class InventoryAnalyticsResponse(BaseModel):
    total_items: int
    low_stock: int
    critical_stock: int
    average_days_remaining: float