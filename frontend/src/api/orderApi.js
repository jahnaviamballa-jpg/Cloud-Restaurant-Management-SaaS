import api from "./api";
import { getRestaurantId } from "../utils/restaurant";

// =====================================================
// Get All Orders
// =====================================================
export const getOrders = async () => {
  const restaurantId = getRestaurantId();

  const response = await api.get(
    `/orders/restaurants/${restaurantId}`
  );

  return response.data;
};

// =====================================================
// Get Single Order
// =====================================================
export const getOrder = async (orderId) => {
  const response = await api.get(
    `/orders/${orderId}`
  );

  return response.data;
};

// =====================================================
// Place Order
// =====================================================
export const placeOrder = async (orderData) => {
  const response = await api.post(
    "/orders/",
    orderData
  );

  return response.data;
};

// =====================================================
// Update Order Status
// =====================================================
export const updateOrderStatus = async (
  orderId,
  orderStatus
) => {
  const response = await api.put(
    `/orders/${orderId}/status`,
    {
      order_status: orderStatus,
    }
  );

  return response.data;
};

// =====================================================
// Update Payment Status
// =====================================================
export const updatePaymentStatus = async (
  orderId,
  paymentStatus
) => {
  const response = await api.put(
    `/orders/${orderId}/payment`,
    {
      payment_status: paymentStatus,
    }
  );

  return response.data;
};

// =====================================================
// Delete Order
// =====================================================
export const deleteOrder = async (orderId) => {
  const response = await api.delete(
    `/orders/${orderId}`
  );

  return response.data;
};

// =====================================================
// Order Statistics
// =====================================================
export const getOrderStats = async () => {
  const restaurantId = getRestaurantId();

  const response = await api.get(
    `/orders/restaurants/${restaurantId}/stats`
  );

  return response.data;
};