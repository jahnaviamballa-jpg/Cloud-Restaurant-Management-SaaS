import api from "./api";
import { getRestaurantId } from "../utils/restaurant";

export const getEmployees = async () => {
  const restaurantId = getRestaurantId();

  const response = await api.get(
    `/employees/restaurant/${restaurantId}`
  );

  return response.data;
};

export const getEmployee = async (id) => {
  const response = await api.get(`/employees/${id}`);
  return response.data;
};

export const createEmployee = async (employee) => {
  const response = await api.post(
    "/employees/",
    employee
  );

  return response.data;
};

export const updateEmployee = async (
  id,
  employee
) => {
  const response = await api.put(
    `/employees/${id}`,
    employee
  );

  return response.data;
};

export const deleteEmployee = async (id) => {
  const response = await api.delete(
    `/employees/${id}`
  );

  return response.data;
};