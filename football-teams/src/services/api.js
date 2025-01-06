import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://v3.football.api-sports.io", // API URL
  headers: {
    "X-RapidAPI-Key": "44bc882e7ec1d769ec7cf4eeb170a762", // API key
    "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
  },
});

export default apiClient;
