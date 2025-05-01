import axios from "axios";

/**
 * Configured Axios instance - 
 *
 * @property {string} baseURL - Base URL for all API requests, refers to .env.local file which contains url to backend
 * @property {boolean} withCredentials - Ensures cookies are sent with requests
 * @property {Object} headers - Default headers for all requests
 */

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
