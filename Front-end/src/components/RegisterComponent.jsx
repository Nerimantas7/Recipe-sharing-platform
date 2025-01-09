import React from "react";
import { useNavigate } from "react-router-dom";
import { registerAPICall } from "../services/AuthService";
import { useState } from "react";

const RegisterComponent = () => {

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigator = useNavigate();

  const handleCancel = () => {
    navigator("/");
  };

  function handleRegistrationForm(e) {
    e.preventDefault();

    const register = { name, username, email, password };

    console.log(register);

    registerAPICall(register)
      .then((response) => {
        console.log(response.data);
        navigator("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center">User Registration Form</h2>
            </div>
            <div className="card-body">
              <form>
                <div className="row mb-3">
                  <label className="col-md-3 control-label">Name:</label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Enter name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    ></input>
                  </div>
                </div>

                <div className="row mb-3">
                  <label className="col-md-3 control-label">Username:</label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      placeholder="Enter username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    ></input>
                  </div>
                </div>

                <div className="row mb-3">
                  <label className="col-md-3 control-label">Email:</label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      name="email"
                      className="form-control"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    ></input>
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
                    ></input>
                  </div>
                </div>

                <div className="form-group mb-3 d-flex align-items-center justify-content-between">
                  <div className="form-group mb-3">
                    <button
                      className="btn btn-secondary"
                      onClick={(e) => handleRegistrationForm(e)}
                    >
                      Submit
                    </button>
                    <button
                      className="btn btn-outline-secondary mx-3"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="text-end">
                    <p className="d-inline me-2">Already registered?</p>
                    <a
                      className="nav-link d-inline p-0 text-decoration-underline"
                      href="/login"
                    >
                      Login Here
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

export default RegisterComponent;
