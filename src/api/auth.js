import axios from "./axios";

export const registerRequest = async (user) => {
  return await axios.post("/users/register/", user);
};

export const usersRequest = async () => {
  return await axios.get("/users/users/");
};

export const loginRequest = async (user) => {
  return await axios.post("/users/login/", user);
};

export const verifyTokenRequest = async () => {
  return await axios.get("/auth/verify");
};
export const updateUserRequest = async (userId, updatedData) => {
  // Usamos PATCH para actualizar parcialmente los datos del usuario.
  return await axios.patch(`/users/${userId}/`, updatedData);
};