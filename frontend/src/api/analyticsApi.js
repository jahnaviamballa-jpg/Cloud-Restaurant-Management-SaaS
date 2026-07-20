import api from "./api";
import { getRestaurantId } from "../utils/restaurant";

// ======================================================
// Sales Analytics
// ======================================================
export const getSalesAnalytics = async () => {
  const restaurantId = getRestaurantId();

  const response = await api.get(
    `/analytics/restaurants/${restaurantId}/sales`
  );

  return response.data;
};

// ======================================================
// Revenue Analytics
// ======================================================
export const getRevenueAnalytics = async () => {
  const restaurantId = getRestaurantId();

  const response = await api.get(
    `/analytics/restaurants/${restaurantId}/revenue`
  );

  return response.data;
};

// ======================================================
// Top Selling Items
// ======================================================
export const getTopSellingItems = async () => {
  const restaurantId = getRestaurantId();

  const response = await api.get(
    `/analytics/restaurants/${restaurantId}/top-items`
  );

  return response.data;
};

// ======================================================
// Order Analytics
// ======================================================
export const getOrderAnalytics = async () => {
  const restaurantId = getRestaurantId();

  const response = await api.get(
    `/analytics/restaurants/${restaurantId}/orders`
  );

  return response.data;
};

// ======================================================
// Inventory Analytics
// ======================================================
export const getInventoryAnalytics = async () => {
  const restaurantId = getRestaurantId();

  const response = await api.get(
    `/analytics/restaurants/${restaurantId}/inventory`
  );

  return response.data;
};

// ======================================================
// Order Statistics
// Used in Owner Dashboard
// ======================================================
export const getOrderStatistics = async () => {
  const restaurantId = getRestaurantId();

  const response = await api.get(
    `/orders/restaurants/${restaurantId}/stats`
  );

  return response.data;
};