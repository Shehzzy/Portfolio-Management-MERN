import React from 'react';

function Sidebar() {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white sidebar" style={{ width: '280px', height:'100vh'}}>
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        {/* Replace SVG with an icon */}
        <i className="bi bi-house-door me-2" style={{ fontSize: '32px' }}></i>
        <span className="fs-4">Trackfolio</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <a href="#" className="nav-link text-white" aria-current="page">
            <i className="bi bi-house-door me-2"></i>
            Home
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-white">
            <i className="bi bi-tachometer-alt me-2"></i>
            Dashboard
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-white">
            <i className="bi bi-table me-2"></i>
            Orders
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-white">
            <i className="bi bi-grid me-2"></i>
            Products
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-white">
            <i className="bi bi-person-circle me-2"></i>
            Customers
          </a>
        </li>
      </ul>
      <hr />
      <div className="dropdown">
        <a
          href="#"
          className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
          id="dropdownUser1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="https://github.com/mdo.png"
            alt=""
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <strong>mdo</strong>
        </a>
        <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
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
  );
}

export default Sidebar;
