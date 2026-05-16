import axios from "axios";

const api = axios.create({
  baseURL: "https://exquisite-gems-erp.onrender.com/api",
});

export default api;