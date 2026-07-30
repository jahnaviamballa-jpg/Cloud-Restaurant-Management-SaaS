import api from "./api";
import { getRestaurantId } from "../utils/restaurant";

// ===================================
// Sales Report
// ===================================
export const getSalesReport = async () => {
  const restaurantId = getRestaurantId();

  const response = await api.get(
    `/reports/restaurants/${restaurantId}/sales`
  );

  return response.data;
};

// ===================================
// Inventory Report
// ===================================
export const getInventoryReport = async () => {
  const restaurantId = getRestaurantId();

  const response = await api.get(
    `/reports/restaurants/${restaurantId}/inventory`
  );

  return response.data;
};

// ===================================
// Order Report
// ===================================
export const getOrderReport = async () => {
  const restaurantId = getRestaurantId();

  const response = await api.get(
    `/reports/restaurants/${restaurantId}/orders`
  );

  return response.data;
};

// ===================================
// Summary Report
// ===================================
export const getSummaryReport = async () => {
  const restaurantId = getRestaurantId();

  const response = await api.get(
    `/reports/restaurants/${restaurantId}/summary`
  );

  return response.data;
};