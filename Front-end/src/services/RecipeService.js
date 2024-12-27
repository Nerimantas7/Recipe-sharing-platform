import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/recipes";

export const listRecipes = () => axios.get(REST_API_BASE_URL);

export const createRecipe = (recipe) => axios.post(REST_API_BASE_URL, recipe);

export const getRecipe = (recipeId) => axios.get(REST_API_BASE_URL + '/' + recipeId);

export const updateRecipe = (recipeId, recipe) => axios.put(REST_API_BASE_URL + '/' + recipeId, recipe);

export const deleteRecipe = (recipeId) => axios.delete(REST_API_BASE_URL + '/' + recipeId);