import api from "./api";

export const getLowStockNotifications = async () => {
  const response = await api.get(
    "/notifications/low-stock"
  );

  return response.data;
};

export const getNotifications = async () => {
  const response = await api.get(
    "/notifications/"
  );

  return response.data;
};