import api from "./api";

// ==============================
// Sales Analytics
// ==============================
export const getSalesAnalytics = async () => {
  const response = await api.get("/analytics/sales");
  return response.data;
};

// ==============================
// Revenue Analytics
// ==============================
export const getRevenueAnalytics = async () => {
  const response = await api.get("/analytics/revenue");
  return response.data;
};

// ==============================
// Top Selling Items
// ==============================
export const getTopSellingItems = async () => {
  const response = await api.get("/analytics/top-items");
  return response.data;
};

// ==============================
// Order Analytics
// ==============================
export const getOrderAnalytics = async () => {
  const response = await api.get("/analytics/orders");
  return response.data;
};

// ==============================
// Inventory Analytics
// ==============================
export const getInventoryAnalytics = async () => {
  const response = await api.get("/analytics/inventory");
  return response.data;
};

// ==============================
// Order Statistics
// ==============================
export const getOrderStatistics = async () => {
  const response = await api.get("/analytics/orders");
  return response.data;
};