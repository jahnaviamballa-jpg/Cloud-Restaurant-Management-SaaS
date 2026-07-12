from pydantic import BaseModel


class SalesReportResponse(BaseModel):
    total_orders: int
    total_revenue: float
    report_period: str


class InventoryReportResponse(BaseModel):
    total_items: int
    low_stock: int
    critical_stock: int


class OrderReportResponse(BaseModel):
    pending: int
    completed: int
    cancelled: int