import api from "./api";

// Login API
export const login = async (loginData) => {
  const response = await api.post("/auth/login", loginData);
  return response.data;
};

// Register API
export const register = async (registerData) => {
  const response = await api.post("/auth/register", registerData);
  return response.data;
};