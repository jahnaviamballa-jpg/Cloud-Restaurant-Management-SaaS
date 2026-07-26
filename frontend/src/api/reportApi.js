import api from "./api";

// ===================================
// Sales Report
// ===================================
export const getSalesReport = async () => {
  const response = await api.get("/reports/sales");
  return response.data;
};

// ===================================
// Inventory Report
// ===================================
export const getInventoryReport = async () => {
  const response = await api.get("/reports/inventory");
  return response.data;
};

// ===================================
// Order Report
// ===================================
export const getOrderReport = async () => {
  const response = await api.get("/reports/orders");
  return response.data;
};

// ===================================
// Summary
// ===================================
export const getSummaryReport = async () => {
  const response = await api.get("/reports/summary");
  return response.data;
};