import React, { useEffect } from "react";

import houseIcon from "../assets/house-door.svg";
import speedometerIcon from "../assets/speedometer2.svg";
import tableIcon from "../assets/table.svg";
import gridIcon from "../assets/grid.svg";
import personIcon from "../assets/person-circle.svg";

import "bootstrap/dist/css/bootstrap.min.css"; 
import "bootstrap/dist/js/bootstrap.bundle.min";


const SidebarLeftComponent = () => {

    useEffect(() => {
        import("bootstrap/dist/js/bootstrap.bundle.min").then((bootstrap) => {
          new bootstrap.Dropdown(document.getElementById("dropdownUser2"));
        });
      }, []);

  return (
    <>
      <div
        className="d-flex flex-column flex-shrink-0 p-3 bg-light"
        style={{ width: "280px" }}
      >
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
        >
          <span className="fs-4">Sidebar</span>
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <a href="#" className="nav-link active" aria-current="page">
            <img
              src={houseIcon}
              alt=""
              width="24"
              height="24"
              className="me-2"
            />
              Home
            </a>
          </li>
          <li>
            <a href="#" className="nav-link link-dark">
            <img
              src={speedometerIcon}
              alt=""
              width="24"
              height="24"
              className="me-2"
            />
              Dashboard
            </a>
          </li>
          <li>
            <a href="#" className="nav-link link-dark">
            <img
              src={tableIcon}
              alt=""
              width="24"
              height="24"
              className="me-2"
            />
              Orders
            </a>
          </li>
          <li>
            <a href="#" className="nav-link link-dark">
            <img
              src={gridIcon}
              alt=""
              width="24"
              height="24"
              className="me-2"
            />
              Products
            </a>
          </li>
          <li>
            <a href="#" className="nav-link link-dark">
            <img
              src={personIcon}
              alt=""
              width="24"
              height="24"
              className="rounded-circle me-2"
            />
              Customers
            </a>
          </li>
        </ul>
        <hr />
        <div className="dropdown">
          <a
            href="#"
            className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
            id="dropdownUser2"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://img.icons8.com/3d-fluency/94/businessman.png" 
              alt="businessman"              
              width="32"
              height="32"
              className="rounded-circle me-2"
            />
            <strong>Admin</strong>
          </a>
          <ul
            className="dropdown-menu text-small shadow"
            aria-labelledby="dropdownUser2"
          >
            <li>
              <a className="dropdown-item" href="#">
                New project...
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Settings
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Profile
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SidebarLeftComponent;
