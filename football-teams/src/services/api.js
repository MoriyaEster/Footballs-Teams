import axios from "axios";

const apiClient = axios.create({
  baseURL: 'https://v3.football.api-sports.io', // API URL
  headers: {
    'x-rapidapi-host': 'v3.football.api-sports.io',
    'x-rapidapi-key': '44bc882e7ec1d769ec7cf4eeb170a762'
  },
});

export default apiClient;

// API key - 44bc882e7ec1d769ec7cf4eeb170a762