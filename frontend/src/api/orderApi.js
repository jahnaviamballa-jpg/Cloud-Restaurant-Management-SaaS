import api from "./api";

export const getOrders = async () => {
  const restaurant = JSON.parse(localStorage.getItem("restaurant"));

  const response = await api.get(
    `/restaurants/${restaurant.restaurant_id}/orders`
  );

  return response.data;
};

export const getOrderById = async (id) => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

export const getOrderStats = async () => {
  const restaurant = JSON.parse(localStorage.getItem("restaurant"));

  const response = await api.get(
    `/restaurants/${restaurant.restaurant_id}/orders/stats`
  );

  return response.data;
};