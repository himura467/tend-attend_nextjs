import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://dubte1y7uk.execute-api.ap-northeast-1.amazonaws.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
