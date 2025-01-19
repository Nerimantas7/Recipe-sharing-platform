import axios from "axios";
import { getToken } from "./AuthService";

const CATEGORY_REST_API_BASE_URL = 'http://localhost:8080/api/categories'

// Add a request interceptor
axios.interceptors.request.use(function (config) {

    config.headers['Authorization'] = getToken();
    console.log("Token got");
    return config;

  }, function (error) {
    
    return Promise.reject(error);
  });

// export const getAllCategories = () => axios.get(CATEGORY_REST_API_BASE_URL);
export const getAllCategories = () => {
  console.log("Fetching all categories");
  return axios.get(CATEGORY_REST_API_BASE_URL)
    .then(response => {
      console.log("Categories fetched successfully:", response.data);
      return response.data; // Returning the fetched data
    })
    .catch(error => {
      console.error("Error fetching categories:", error);
      throw error; // Re-throw the error for handling in the calling code
    });
};

export const createCategory = (category) => axios.post(CATEGORY_REST_API_BASE_URL, category);

export const getCategoryById = (categoryId) => axios.get(CATEGORY_REST_API_BASE_URL + '/' + categoryId);

export const updateCategory = (categoryId, category) => axios.put(CATEGORY_REST_API_BASE_URL + '/' + categoryId, category);

export const deleteCategory = (categoryId) => axios.delete(CATEGORY_REST_API_BASE_URL + '/' + categoryId);