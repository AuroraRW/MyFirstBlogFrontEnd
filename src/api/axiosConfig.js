import axios from 'axios';

// Define base URL and headers in environment variables
const BASE_URL = process.env.API_BASE_URL || 'http://localhost:5000/api';

// Create Axios instance with predefined configuration
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add interceptors if needed for requests and responses
// axiosInstance.interceptors.request.use(config => {
//   // Modify request config if needed (e.g., add authentication tokens)
//   return config;
// }, error => {
//   return Promise.reject(error);
// });

// axiosInstance.interceptors.response.use(response => {
//   // Modify response data if needed
//   return response;
// }, error => {
//   // Handle response errors
//   return Promise.reject(error);
// });

export default axiosInstance;
