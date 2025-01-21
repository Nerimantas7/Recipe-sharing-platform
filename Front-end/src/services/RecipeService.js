import axios from "axios";
import { getToken } from "./AuthService";

const REST_API_BASE_URL = "http://localhost:8080/api/recipes";

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    const token = getToken();
    if (token) {
      console.log("Token being sent:", token); // Debugging log
      config.headers['Authorization'] = getToken();
    }
    return config;
  },
  function (error) {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);


export const listRecipes = () => axios.get(REST_API_BASE_URL);

export const createRecipe = (recipe) => axios.post(REST_API_BASE_URL, recipe);

export const getRecipe = (recipeId) => axios.get(REST_API_BASE_URL + '/' + recipeId);

export const updateRecipe = (recipeId, recipe) => axios.put(REST_API_BASE_URL + '/' + recipeId, recipe);

export const deleteRecipe = (recipeId) => axios.delete(REST_API_BASE_URL + '/' + recipeId);