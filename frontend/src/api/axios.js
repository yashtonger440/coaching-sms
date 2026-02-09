import axios from "axios";

const api = axios.create({
  baseURL: "https://coaching-sms-backend.onrender.com/api"
});

export default api;
