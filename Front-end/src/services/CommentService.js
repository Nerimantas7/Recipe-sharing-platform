import axios from "axios";
import { getToken } from "./AuthService";

const COMMENT_REST_API_BASE_URL = 'http://localhost:8080/api/comments'

// Add a request interceptor
axios.interceptors.request.use(function (config) {

    config.headers['Authorization'] = getToken();

    return config;

  }, function (error) {
    
    return Promise.reject(error);
  });

export const getAllComments = () => axios.get(COMMENT_REST_API_BASE_URL);

export const createComment = (comment) => axios.post(COMMENT_REST_API_BASE_URL, comment);

export const getCommentById = (commentId) => axios.get(COMMENT_REST_API_BASE_URL + '/' + commentId);

export const updateComment = (commentId, comment) => axios.put(COMMENT_REST_API_BASE_URL + '/' + commentId, comment);

export const deleteComment = (commentId) => axios.delete(COMMENT_REST_API_BASE_URL + '/' + commentId);