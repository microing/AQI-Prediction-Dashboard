import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

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