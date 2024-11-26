import React from "react";
import { Link, useNavigate} from "react-router-dom";

function Navbar() {
  
const navigate = useNavigate();
  return (
    <>
      <nav className="navbar navbar-expand-lg nb">
        <div className="container-fluid">
          <a className="navbar-brand nb-brand" href="#">
            Trackfolio
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse w-100"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-end w-100">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"  style={{cursor:'pointer'}}
                  onClick={() => {
                    localStorage.removeItem("jwt_token");
                    navigate("/login");
                  }}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
