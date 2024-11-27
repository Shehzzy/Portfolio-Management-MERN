import React, { useState } from "react";
import ErrorData from "./ErrorData";
import Modal from "react-bootstrap/Modal"; // Import Modal from react-bootstrap (or any other modal library)

function MainProjectCards({ cardData }) {
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [selectedProject, setSelectedProject] = useState(null); // State to store the selected project's details

  const handleShowModal = (project) => {
    setSelectedProject(project); // Set the selected project data
    setShowModal(true); // Show the modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
    setSelectedProject(null); // Reset the selected project data
  };

  if (cardData.length === 0) {
    return <ErrorData />;
  }

  return (
    <>
      <div className="row">
        {cardData.map((project) => {
          return (
            <div
              key={project._id}
              className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
            >
              <div className="card" style={{ width: "100%" }}>
                <img
                  src={project.cover}
                  className="card-img-top img-fluid"
                  alt="..."
                  style={{
                    height: "200px",
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{project.title}</h5>
                  <p className="card-text">{project.description}</p>
                  <p
                    className={
                      project.status === "Active"
                        ? "badge bg-success text-decoration-none"
                        : "badge bg-danger text-decoration-none"
                    }
                  >
                    {project.status}
                  </p>
                  <button
                    className="btn btn-primary mt-2 d-block"
                    onClick={() => handleShowModal(project)} // Pass the project data to handleShowModal
                  >
                    See More
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal to show project details */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedProject?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={selectedProject?.cover}
            className="img-fluid"
            alt={selectedProject?.title}
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
            }}
          />
          <p>{selectedProject?.description}</p>
          <p><strong>Category:</strong> {selectedProject?.category}</p>
          <p><strong>Client:</strong> {selectedProject?.client}</p>
          <p><strong>Project Type:</strong> {selectedProject?.projectType}</p>
          <p><strong>Features:</strong> {selectedProject?.features}</p>
          <p><strong>Date:</strong> {selectedProject?.date}</p>
          <p><strong>Address:</strong> {selectedProject?.address}</p>

          <p><strong>Live URL:</strong> <a href={selectedProject?.liveUrl} target="_blank" rel="noopener noreferrer">View Live</a></p>
          <p
            className={
              selectedProject?.status === "Active"
                ? "badge bg-success"
                : "badge bg-danger"
            }
          >
            {selectedProject?.status}
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default MainProjectCards;
