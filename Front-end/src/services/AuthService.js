import axios from "axios";

const AUTH_REST_API_BASE_URL = "http://localhost:8080/api/auth";

export const registerAPICall = (registerObj) =>
  axios.post(AUTH_REST_API_BASE_URL + "/register", registerObj);

export const loginAPICall = (usernameOrEmail, password) =>
  axios.post(AUTH_REST_API_BASE_URL + "/login", { usernameOrEmail, password });

export const storeToken = (token) => {
  console.log("Storing Token:", token); // Debugging stored token
  localStorage.setItem("token", token.trim());
};

export const getToken = () => {
    const token = localStorage.getItem("token");
    console.log(token); // Debugging log
    return token; // Add return statement to return the token
  };
  

export const saveLoggedInUser = (usernameOrEmail, role) => {
  sessionStorage.setItem("authenticatedUser", usernameOrEmail);
  sessionStorage.setItem("role", role);
};

export const isUserLoggedIn = () => {
  const username = sessionStorage.getItem("authenticatedUser");

  if (username == null) {
    return false;
  } else {
    return true;
  }
};

export const getLoggedInUser = () => {
  const username = sessionStorage.getItem("authenticatedUser");
  return username;
};

export const logout = () => {
  localStorage.clear();
  sessionStorage.clear();
};

export const isAdminUser = () => {
  let role = sessionStorage.getItem("role");

  if (role != null && role === "ROLE_ADMIN") {
    return true;
  } else {
    return false;
  }
};
