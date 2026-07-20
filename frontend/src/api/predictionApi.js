import api from "./api";
import { getRestaurantId } from "../utils/restaurant";

// =====================================================
// Get All Predictions
// =====================================================
export const getPredictions = async () => {
  const restaurantId = getRestaurantId();

  const response = await api.get(
    `/predictions/restaurants/${restaurantId}`
  );

  return response.data;
};

// =====================================================
// Get Single Prediction
// =====================================================
export const getPrediction = async (id) => {
  const response = await api.get(
    `/predictions/${id}`
  );

  return response.data;
};

// =====================================================
// Prediction Analytics
// =====================================================
export const getPredictionAnalytics = async () => {
  const restaurantId = getRestaurantId();

  const response = await api.get(
    `/predictions/restaurants/${restaurantId}/analytics`
  );

  return response.data;
};

// =====================================================
// Inventory Analytics
// Used by Prediction Dashboard
// =====================================================
export const getInventoryAnalytics = async () => {
  const restaurantId = getRestaurantId();

  const response = await api.get(
    `/inventory/restaurants/${restaurantId}/stats`
  );

  return response.data;
};

// =====================================================
// Sales Prediction
// =====================================================
export const getSalesPrediction = async () => {
  const restaurantId = getRestaurantId();

  const response = await api.get(
    `/predictions/restaurants/${restaurantId}/sales`
  );

  return response.data;
};

// =====================================================
// Demand Prediction
// =====================================================
export const getDemandPrediction = async () => {
  const restaurantId = getRestaurantId();

  const response = await api.get(
    `/predictions/restaurants/${restaurantId}/demand`
  );

  return response.data;
};