import React from 'react';
import { Link } from 'react-router-dom';
function Sidebar() {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white sidebar" style={{ width: '280px', height: '100vh' }}>
      <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        {/* Replace SVG with an icon */}
        <i className="bi bi-house-door me-2" style={{ fontSize: '32px' }}></i>
        <span className="fs-4">Trackfolio</span>
      </Link>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link to="/" className="nav-link text-white" aria-current="page">
            <i className="bi bi-house-door me-2"></i>
            Home
          </Link>
        </li>
        <li>
          <Link to="/create-a-new-project" className="nav-link text-white">
            <i className="bi bi-table me-2"></i>
            Create A New Project
          </Link>
        </li>
        <li>
          <Link to="/all-projects" className="nav-link text-white">
            <i className="bi bi-tachometer-alt me-2"></i>
            Explore All projects
          </Link>
        </li>

        <li>
          <Link to="/active-projects" className="nav-link text-white">
            <i className="bi bi-tachometer-alt me-2"></i>
            Explore Active projects
          </Link>
        </li>

        <li>
          <Link to="/inactive-projects" className="nav-link text-white">
            <i className="bi bi-tachometer-alt me-2"></i>
            Explore In-Active projects
          </Link>
        </li>
      </ul>
      <hr />
    </div>
  );
}

export default Sidebar;
