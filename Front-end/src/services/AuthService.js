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
  

// export const saveLoggedInUser = (usernameOrEmail, role, username, userId) => {
//   sessionStorage.setItem("authenticatedUser", usernameOrEmail);
//   sessionStorage.setItem("role", role);
//   sessionStorage.setItem("Username", username);
//   sessionStorage.setItem("UserId", userId);
// };

export const saveLoggedInUser = (usernameOrEmail, role, username, userId) => {
  const userData = { usernameOrEmail, role, username, userId };
  localStorage.setItem("user", JSON.stringify(userData)); // Store as JSON
};

// export const isUserLoggedIn = () => {
//   const usernameOrEmail = sessionStorage.getItem("authenticatedUser");
//   const role = sessionStorage.getItem("role");
//   const username = sessionStorage.getItem("Username");
//   const userId = sessionStorage.getItem("UserId");
//   console.log("(1) User is authenticated", usernameOrEmail);
//   console.log("(1) User role is", role);
//   console.log("(1) User name is", username);
//   console.log("(1) User ID is", userId);

//   if (username == null) {
//     return false;
//   } else {
//     return true;
//   }
// };

export const isUserLoggedIn = () => {
  const user = getLoggedInUser();
  return user !== null; // Returns true if user exists
};

// export const getLoggedInUser = () => {
//   const username = sessionStorage.getItem("authenticatedUser");
//   const userId = sessionStorage.getItem("UserId");
//   console.log("(2) user ID is: ", userId); 
//   console.log("(2) User get authenticated", username);
//   return username;
// };

export const getLoggedInUser = () => {
  const user = localStorage.getItem("user");
  console.log("(2) User stored", user);
  if (user) {
    return JSON.parse(user); // Convert back to object
  }
  return null;
};


// export const logout = () => {
//   localStorage.clear();
//   sessionStorage.clear();
// };

export const logout = () => {
  localStorage.removeItem("token"); // Remove token
  localStorage.removeItem("user"); // Remove user details
};

// export const isAdminUser = () => {
//   let role = sessionStorage.getItem("role");

//   if (role != null && role === "ROLE_ADMIN") {
//     return true;
//   } else {
//     return false;
//   }
// };

export const isAdminUser = () => {
  const user = getLoggedInUser();
  return user?.role === "ROLE_ADMIN"; // Optional chaining
};

