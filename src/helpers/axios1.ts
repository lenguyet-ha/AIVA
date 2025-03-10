// src/helpers/axios.ts
import Axios from "axios";
import getConfig from "next/config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { publicRuntimeConfig } = getConfig();


const axios1 = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_ORIGIN_WEB,
}); 


// Add a request interceptor to include the token in headers
axios1.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token"); // Replace 'token' with your actual token key
    if (token) {
      config.headers["x-access-token"] = `${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Add a response interceptor to handle 401 errors
axios1.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // If there's a response error
    if (error.response) {
      // Handle specific status codes
      if (error.response.status === 401) {
        // Display toast notification
        toast.error("Unauthorized! Redirecting to login...", {
          autoClose: 3000,
        });

        // Remove the token and redirect to login
        localStorage.removeItem("token");
        window.location.href = "/login"; // Use window.location.href to redirect
      } else if (error.response.status === 500) {
        // Display toast notification for server error
        toast.error("Internal server error. Please try again later.", {
          autoClose: 3000,
        });
      } else if (error.response.status === 404) {
        // Display toast for not found
        toast.error("Resource not found. Please check the URL.", {
          autoClose: 3000,
        });
      } else {
        // General error message for other status codes
        toast.error(
          `${error.response.data.message || "Something went wrong."}`,
          {
            autoClose: 3000,
          },
        );
      }
    } else {
      // If there's no response from the server
      toast.error("Network error. Please check your connection.", {
        autoClose: 3000,
      });
    }
    return Promise.reject(error?.response?.data?.message); // Delegate error handling to where axios is called
  },
);

export const handleAxiosError = (error: any, dispatch: any) => {
  if (error.response) {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  }
};

export default axios1;
