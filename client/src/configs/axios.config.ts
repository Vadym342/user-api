import axios from "axios";
import { getInfoFromLocalStorage } from "../helpers/localstorage.helper";

export const axiosConfig = axios.create({
  baseURL: process.env.SERVER_URL || "http://localhost:8081/",
  headers: {
    Authorization: `Bearer `  + getInfoFromLocalStorage("token"),
  },
});

axiosConfig.interceptors.request.use((config) => {
  const token = getInfoFromLocalStorage("token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});