import axios from "axios";
import { getToken } from "./AuthService";

const CATEGORY_REST_API_BASE_URL = 'http://localhost:8080/api/categories'

// Add a request interceptor
axios.interceptors.request.use(function (config) {

    config.headers['Authorization'] = getToken();

    return config;

  }, function (error) {
    
    return Promise.reject(error);
  });

export const getAllCategories = () => axios.get(CATEGORY_REST_API_BASE_URL);

export const createCategory = (category) => axios.post(CATEGORY_REST_API_BASE_URL, category);

export const getCategoryById = (categoryId) => axios.get(CATEGORY_REST_API_BASE_URL + '/' + categoryId);

export const updateCategory = (categoryId, category) => axios.put(CATEGORY_REST_API_BASE_URL + '/' + categoryId, category);

export const deleteCategory = (categoryId) => axios.delete(CATEGORY_REST_API_BASE_URL + '/' + categoryId);