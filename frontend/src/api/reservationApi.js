import api from "./api";
import { getRestaurantId } from "../utils/restaurant";

// Get all reservations for a restaurant
export const getReservations = async () => {
  const restaurantId = getRestaurantId();

  const response = await api.get(
    `/reservations/restaurants/${restaurantId}`
  );

  return response.data;
};

// Get reservation by ID
export const getReservation = async (id) => {
  const response = await api.get(
    `/reservations/${id}`
  );

  return response.data;
};

// Create reservation
export const createReservation = async (data) => {
  const restaurantId = getRestaurantId();

  const response = await api.post(
    "/reservations/",
    {
      ...data,
      restaurant_id: restaurantId,
    }
  );

  return response.data;
};

// Update reservation
export const updateReservation = async (
  id,
  data
) => {
  const response = await api.put(
    `/reservations/${id}`,
    data
  );

  return response.data;
};

// Delete reservation
export const deleteReservation = async (id) => {
  const response = await api.delete(
    `/reservations/${id}`
  );

  return response.data;
};

// Reservation statistics
export const getReservationStats = async () => {
  const restaurantId = getRestaurantId();

  const response = await api.get(
    `/reservations/restaurants/${restaurantId}/stats`
  );

  return response.data;
};

// Today's reservations
export const getTodayReservations = async () => {
  const restaurantId = getRestaurantId();

  const response = await api.get(
    `/reservations/restaurants/${restaurantId}/today`
  );

  return response.data;
};