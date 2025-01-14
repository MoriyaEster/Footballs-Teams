import axios from "axios";

const apiClient = axios.create({
  baseURL: 'https://v3.football.api-sports.io',
  headers: {
    'x-rapidapi-key': '528d45c9b4d41c33b7b813fbaeda7d25',
    'x-rapidapi-host': 'v3.football.api-sports.io',
  },
});

export default apiClient;

// API key - 44bc882e7ec1d769ec7cf4eeb170a762
//ORI key - 528d45c9b4d41c33b7b813fbaeda7d25
