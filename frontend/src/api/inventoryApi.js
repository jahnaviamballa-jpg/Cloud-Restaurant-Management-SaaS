import api from "./api";

export const getInventoryStats = async () => {
  const response = await api.get("/inventory/stats");
  return response.data;
};