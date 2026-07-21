import api from "./api";
import { getRestaurantId } from "../utils/restaurant";

// ========================================
// Get All Orders
// ========================================
export const getOrders = async () => {
  const response = await api.get("/orders");

  return response.data;
};

// ========================================
// Get Orders By Restaurant
// ========================================
export const getOrdersByRestaurant = async () => {
  const restaurantId = getRestaurantId();

  const orders = await getOrders();

  return orders.filter(
    (order) =>
      order.restaurant_id === restaurantId
  );
};

// ========================================
// Get Single Order
// ========================================
export const getOrder = async (id) => {
  const response = await api.get(
    `/orders/${id}`
  );

  return response.data;
};

// ========================================
// Create Order
// ========================================
export const createOrder = async (
  orderData
) => {
  const restaurantId = getRestaurantId();

  const response = await api.post(
    "/orders",
    {
      ...orderData,
      restaurant_id: restaurantId,
    }
  );

  return response.data;
};

// ========================================
// Update Order
// ========================================
export const updateOrder = async (
  id,
  orderData
) => {
  const response = await api.put(
    `/orders/${id}`,
    orderData
  );

  return response.data;
};

// ========================================
// Delete Order
// ========================================
export const deleteOrder = async (
  id
) => {
  const response = await api.delete(
    `/orders/${id}`
  );

  return response.data;
};

// ========================================
// Update Order Status
// ========================================
export const updateOrderStatus =
  async (id, status) => {
    const response = await api.put(
      `/orders/${id}`,
      {
        status,
      }
    );

    return response.data;
  };

  // ========================================
// Order Statistics
// ========================================
export const getOrderStats = async () => {
  const restaurantId = getRestaurantId();

  const response = await api.get(
    `/orders/restaurants/${restaurantId}/stats`
  );

  return response.data;
};