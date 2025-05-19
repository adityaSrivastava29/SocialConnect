// use axois client and do all header concept and hit keep api call seprate component 
// call this component where ever you wanted a data
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:4000", // Set your API base URL here
});

// Add an interceptor to modify outgoing requests
apiClient.interceptors.request.use(
  (config) => {
    // Modify the request config here, e.g., add headers, tokens, etc.
    // You can also access and modify the request parameters here
    return config;
  },
  (error) => {
    // Handle request error
    console.error("Interceptor - Request Error:", error);
    return Promise.reject(error);
  }
);

// Add an interceptor to handle responses
apiClient.interceptors.response.use(
  (response) => {
    return response?.data ?? response;
  },
  (error) => {
    console.error("Interceptor - Response Error:", error);
    return Promise.reject(error);
  }
);

export default apiClient;
