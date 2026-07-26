import axios from "axios";
import { getRestaurantId } from "../utils/restaurant";

const API = "http://127.0.0.1:8000";

export const getEmployees = async () => {
  const restaurantId = getRestaurantId();

  const response = await axios.get(
    `${API}/employees/restaurant/${restaurantId}`
  );

  return response.data;
};

export const getEmployee = async (id) => {
  const response = await axios.get(
    `${API}/employees/${id}`
  );

  return response.data;
};

export const createEmployee = async (
  employee
) => {
  const response = await axios.post(
    `${API}/employees/`,
    employee
  );

  return response.data;
};

export const updateEmployee = async (
  id,
  employee
) => {
  const response = await axios.put(
    `${API}/employees/${id}`,
    employee
  );

  return response.data;
};

export const deleteEmployee = async (
  id
) => {
  const response = await axios.delete(
    `${API}/employees/${id}`
  );

  return response.data;
};