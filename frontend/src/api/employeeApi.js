import api from "./api";
import { getRestaurantId } from "../utils/restaurant";

export const getEmployees = async () => {
  const restaurantId = getRestaurantId();

  const response = await api.get(
    `/employees/restaurants/${restaurantId}`
  );

  return response.data;
};

export const getEmployee = async (id) => {
  const response = await api.get(
    `/employees/${id}`
  );

  return response.data;
};

export const createEmployee = async (data) => {
  const restaurantId = getRestaurantId();

  const response = await api.post(
    "/employees/",
    {
      ...data,
      restaurant_id: restaurantId,
    }
  );

  return response.data;
};

export const updateEmployee = async (
  id,
  data
) => {
  const response = await api.put(
    `/employees/${id}`,
    data
  );

  return response.data;
};

export const deleteEmployee = async (
  id
) => {
  const response = await api.delete(
    `/employees/${id}`
  );

  return response.data;
};

export const getEmployeeStats = async () => {
  const restaurantId = getRestaurantId();

  const response = await api.get(
    `/employees/restaurants/${restaurantId}/stats`
  );

  return response.data;
};