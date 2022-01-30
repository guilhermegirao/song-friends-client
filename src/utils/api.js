import axios from "axios";
import store from "@/store";

const baseURL = "http://localhost:3001";

const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  const token = store.getters.getToken;

  config.headers = {
    Authorization: token ? `Bearer ${token}` : "",
  };

  return config;
});

export { baseURL };
export default api;
