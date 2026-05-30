import axios from "axios";

const API_URL = "https://aqi-dashboard-backend.onrender.com";

export const getAQI = async (city: string) => {
  const response = await axios.get(
    `${API_URL}/aqi/${city}/`
  );

  return response.data;
};

export const getHistory = async () => {
  const response = await axios.get(
    `${API_URL}/history/`
  );

  return response.data;
};

export const getAllCapitals = async () => {
  const response = await axios.get(
    `${API_URL}/all-capitals/`
  );

  return response.data;
};