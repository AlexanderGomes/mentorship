import axios from "axios";

const API_URL = "/api/user/";

const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  return response.data;
};

// Logout user
const logout = async () => {
  await axios.post(API_URL + "logout");
};

const refresh = async () => {
  const response = await axios.get(API_URL + "refresh-token", {
    withCredentials: true,
  });

  return response.data;
};

const authService = {
  register,
  logout,
  login,
  refresh,
};

export default authService;
