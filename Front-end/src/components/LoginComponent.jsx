import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  loginAPICall,
  saveLoggedInUser,
  storeToken,
} from "../services/AuthService";

const LoginComponent = () => {

  const [userNameOrEmail, setUserNameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigator = useNavigate();

  const handleCancel = () => {
    navigator("/");
  };

  async function handleLoginForm(e) {
    e.preventDefault();

    // const loginObj = { userNameOrEmail, password };

    // console.log(loginObj);

    await loginAPICall(userNameOrEmail, password)
      .then((response) => {
        console.log(response.data);

        // Ensure there is a space after 'Basic'
        const token = "Bearer " + response.data.accessToken;

        const role = response.data.role;

        storeToken(token);

        saveLoggedInUser(userNameOrEmail, role);

        navigator("/");

        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 mt-4">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center">Login Form</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleLoginForm}>
                <div className="row mb-3">
                  <label className="col-md-3 control-label">
                    Username or Email:
                  </label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      placeholder="Enter username or email"
                      value={userNameOrEmail}
                      onChange={(e) => setUserNameOrEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label className="col-md-3 control-label">Password:</label>
                  <div className="col-md-9">
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group mb-3 d-flex align-items-center justify-content-between">
                  <div>
                    <button type="submit" className="btn btn-secondary"  onClick={handleLoginForm}>
                      Submit
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary mx-3"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="text-end">
                    <p className="d-inline me-2">Not registered?</p>
                    <a
                      className="nav-link d-inline p-0 text-decoration-underline"
                      href="/register"
                    >
                      Register Here
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
