import api from "./axios";

export const getProfile = async (userId) => {
  const response = await api.get(`/auth/profile/${userId}`);
  return response.data;
};

export const updateProfile = async (userId, data) => {
  const response = await api.put(`/auth/profile/${userId}`, data);
  return response.data;
};