import api from "./api";

// Get all AI inventory predictions
export const getPredictions = async () => {
  const response = await api.get("/predictions");
  return response.data;
};

// Get prediction by item ID
export const getPredictionByItem = async (id) => {
  const response = await api.get(`/predictions/${id}`);
  return response.data;
};

// Get inventory analytics
export const getInventoryAnalytics = async () => {
  const response = await api.get("/analytics/inventory");
  return response.data;
};