import api from "./api";

// Get sales analytics
export const getSalesAnalytics = async () => {
  const response = await api.get("/analytics/sales");
  return response.data;
};

// Get revenue analytics
export const getRevenueAnalytics = async () => {
  const response = await api.get("/analytics/revenue");
  return response.data;
};

// Get top selling items
export const getTopSellingItems = async () => {
  const response = await api.get("/analytics/top-items");
  return response.data;
};

// Get order statistics
export const getOrderStatistics = async () => {
  const response = await api.get("/analytics/orders");
  return response.data;
};