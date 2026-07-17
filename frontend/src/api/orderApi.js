import api from "./api";

// Get all orders
export const getOrders = async () => {
  const response = await api.get("/orders/");
  return response.data;
};

// Get order by ID
export const getOrderById = async (id) => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

// Order statistics
export const getOrderStats = async () => {
  const response = await api.get("/orders/stats");
  return response.data;
};