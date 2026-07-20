import api from "./api";
import { getRestaurantId } from "../utils/restaurant";

// =======================================
// Get All Customers
// =======================================
export const getCustomers = async () => {
  const restaurantId = getRestaurantId();

  const response = await api.get(
    `/customers/restaurants/${restaurantId}`
  );

  return response.data;
};

// =======================================
// Get Customer Statistics
// =======================================
export const getCustomerStats = async () => {
  const restaurantId = getRestaurantId();

  const response = await api.get(
    `/customers/restaurants/${restaurantId}/stats`
  );

  return response.data;
};

// =======================================
// Get Recent Orders
// =======================================
export const getRecentOrders = async () => {
  const restaurantId = getRestaurantId();

  const response = await api.get(
    `/customers/restaurants/${restaurantId}/orders`
  );

  return response.data;
};

// =======================================
// Get Customer By ID
// =======================================
export const getCustomer = async (id) => {
  const response = await api.get(
    `/customers/${id}`
  );

  return response.data;
};

// =======================================
// Create Customer
// =======================================
export const createCustomer = async (data) => {
  const restaurantId = getRestaurantId();

  const response = await api.post(
    "/customers/",
    {
      ...data,
      restaurant_id: restaurantId,
    }
  );

  return response.data;
};

// =======================================
// Update Customer
// =======================================
export const updateCustomer = async (
  id,
  data
) => {
  const response = await api.put(
    `/customers/${id}`,
    data
  );

  return response.data;
};

// =======================================
// Delete Customer
// =======================================
export const deleteCustomer = async (id) => {
  const response = await api.delete(
    `/customers/${id}`
  );

  return response.data;
};