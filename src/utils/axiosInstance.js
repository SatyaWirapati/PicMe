import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL + "/api/v1",
});

// TESTING ONLY — Hardcode APIKey & Token
axiosInstance.interceptors.request.use((config) => {
  config.headers.apiKey = "c7b411cc-0e7c-4ad1-aa3f-822b00e7734b";

  config.headers.Authorization =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbjIxZ21haWwuY29tIiwidXNlcklkIjoiNzNiNjNiZGEtY2YxMy00Zjk2LWIxN2YtM2I3YzhmMDUzNGE2Iiwicm9sZSI6ImdlbmVyYWwiLCJpYXQiOjE3NjMxOTkyNTV9.sdnWds0-y5lNSr2vnCGZkl471DHlERY1MSokrKa53es";

  return config;
});

export default axiosInstance;
