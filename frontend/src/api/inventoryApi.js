import api from "./api";

// Inventory Statistics
export const getInventoryStats = async () => {
  const response = await api.get("/inventory/stats");
  return response.data;
};

// Get all inventory items
export const getInventory = async () => {
  const response = await api.get("/inventory");
  return response.data;
};

// Get inventory item by ID
export const getInventoryItem = async (id) => {
  const response = await api.get(`/inventory/${id}`);
  return response.data;
};

// Create inventory item
export const createInventory = async (itemData) => {
  const response = await api.post("/inventory", itemData);
  return response.data;
};

// Update inventory item
export const updateInventory = async (id, itemData) => {
  const response = await api.put(`/inventory/${id}`, itemData);
  return response.data;
};

// Delete inventory item
export const deleteInventory = async (id) => {
  const response = await api.delete(`/inventory/${id}`);
  return response.data;
};