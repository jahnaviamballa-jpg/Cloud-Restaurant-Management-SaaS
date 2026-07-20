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
// Revenue Report
// ===================================
export const getRevenueReport = async () => {
  const restaurantId = getRestaurantId();

  const response = await api.get(
    `/reports/restaurants/${restaurantId}/revenue`
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
// Customer Report
// ===================================
export const getCustomerReport = async () => {
  const restaurantId = getRestaurantId();

  const response = await api.get(
    `/reports/restaurants/${restaurantId}/customers`
  );

  return response.data;
};

// ===================================
// Download Report
// ===================================
export const downloadReport = async (type) => {
  const restaurantId = getRestaurantId();

  const response = await api.get(
    `/reports/restaurants/${restaurantId}/download/${type}`,
    {
      responseType: "blob",
    }
  );

  return response.data;
};