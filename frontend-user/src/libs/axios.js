import axios from "axios";
const BaseURL = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: BaseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});
export default axiosInstance;
