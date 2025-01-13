import axios from "axios";

const apiClient = axios.create({
  baseURL: 'https://v3.football.api-sports.io',
  headers: {
    'x-rapidapi-key': '44bc882e7ec1d769ec7cf4eeb170a762',
    'x-rapidapi-host': 'v3.football.api-sports.io',
  },
});

export default apiClient;

// API key - 44bc882e7ec1d769ec7cf4eeb170a762
//Talia key - 579ef80b2cd7cc906131cbeb96828135
