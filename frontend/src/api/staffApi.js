import api from "./api";
import { getRestaurantId } from "../utils/restaurant";

// ===================================
// Get All Staff
// ===================================
export const getStaff = async () => {
  const restaurantId = getRestaurantId();

  const response = await api.get(
    `/staff/restaurants/${restaurantId}`
  );

  return response.data;
};

// ===================================
// Get Single Staff Member
// ===================================
export const getStaffById = async (id) => {
  const response = await api.get(`/staff/${id}`);

  return response.data;
};

// ===================================
// Add Staff Member
// ===================================
export const createStaff = async (data) => {
  const restaurantId = getRestaurantId();

  const response = await api.post("/staff/", {
    ...data,
    restaurant_id: restaurantId,
  });

  return response.data;
};

// ===================================
// Update Staff Member
// ===================================
export const updateStaff = async (id, data) => {
  const response = await api.put(
    `/staff/${id}`,
    data
  );

  return response.data;
};

// ===================================
// Delete Staff Member
// ===================================
export const deleteStaff = async (id) => {
  const response = await api.delete(
    `/staff/${id}`
  );

  return response.data;
};

// ===================================
// Staff Statistics
// ===================================
export const getStaffStats = async () => {
  const restaurantId = getRestaurantId();

  const response = await api.get(
    `/staff/restaurants/${restaurantId}/stats`
  );

  return response.data;
};