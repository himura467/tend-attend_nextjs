import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.BACKEND_API_URL || "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": process.env.API_GATEWAY_API_KEY,
  },
});

export default axiosInstance;
