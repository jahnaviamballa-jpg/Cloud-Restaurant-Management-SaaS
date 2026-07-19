import api from "./api";
import { getRestaurantId } from "../utils/restaurant";

export const getInventory = async () => {
  const restaurantId = getRestaurantId();

  const response = await api.get(
    `/restaurants/${restaurantId}/inventory`
  );

  return response.data;
};

export const createInventory = async (data) => {
  const restaurantId = getRestaurantId();

  return api.post("/inventory/", {
    ...data,
    restaurant_id: restaurantId,
  });
};

export const getInventoryStats = async () => {
  const restaurantId = getRestaurantId();

  const response = await api.get(
    `/restaurants/${restaurantId}/inventory/stats`
  );

  return response.data;
};