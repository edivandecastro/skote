import { baseURL } from './api_service';
import axios from 'axios';

const API_URL = baseURL.gateway_service;

export const createTransaction = async (payload) => {
  const response = await axios.post(`${API_URL}/transactions`, payload, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return response.data;
};
