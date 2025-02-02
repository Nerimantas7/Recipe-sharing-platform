import axios from "axios";
import { getToken } from "./AuthService";

const COMMENT_REST_API_BASE_URL = 'http://localhost:8080/api/comments'

// Add a request interceptor
// axios.interceptors.request.use(function (config) {

//     config.headers['Authorization'] = getToken();

//     return config;

// }, function (error) {

//     return Promise.reject(error);
// });

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

export const getAllComments = () => axios.get(COMMENT_REST_API_BASE_URL);

// export const createComment = (comment, recipeId) => axios.post(COMMENT_REST_API_BASE_URL + '/recipe/' + recipeId, comment);

export const createComment = (comment, recipeId) => {
    console.log("Creating comment:", comment, "for recipeId:", recipeId); // Debugging log
    return axios.post(`${COMMENT_REST_API_BASE_URL}/recipe/${recipeId}`, comment);
  };

export const getCommentById = (commentId) => axios.get(COMMENT_REST_API_BASE_URL + '/' + commentId);

export const getCommentsByRecipeId = (recipeId) => axios.get(COMMENT_REST_API_BASE_URL + '/recipe/' + recipeId);

export const updateComment = (commentId, comment) => axios.put(COMMENT_REST_API_BASE_URL + '/' + commentId, comment);

export const deleteComment = (commentId) => axios.delete(COMMENT_REST_API_BASE_URL + '/' + commentId);