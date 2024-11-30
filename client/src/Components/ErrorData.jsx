import React from "react";
import NoResults from '../assets/Error.png';
import { useNavigate } from "react-router-dom";

function ErrorData() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(0); // Reload current page
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-center align-items-center">
        <div
          className="card d-flex justify-content-center align-items-center p-5 mb-5"
          style={{ width: "800px", boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}
        >
          <div className="card-header">
            <img src={NoResults} alt="No Results" />
          </div>
          <h3 className="mt-3">Uh Oh!</h3>
          <p>No Data was found here!</p>
          <p>Well, you can always go back to where you came from!</p>
        </div>
      </div>
    </div>
  );
}

export default ErrorData;
