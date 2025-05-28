import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:5000/api/v1',
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    // 'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Add token to headers if it exists
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Any status codes outside of 2xx range will trigger this function
    if (error.response && error.response.status === 401) {
      // Handle 401 Unauthorized error
      alert("Session expired. Redirecting to login.");
      localStorage.clear();
      // Optionally, redirect to the login page
      window.location.href = "/sign-in";
    } else if (error.response && error.response.status === 500) {
      // Handle 500 Internal Server Error
      alert("Server error. Please try again later.");
    }
    return Promise.reject(error); // Pass the error to be handled by individual requests if needed
  }
);

export default axiosInstance;
