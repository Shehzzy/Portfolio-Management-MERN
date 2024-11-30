import React from "react";
import ErrorData from "./ErrorData";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function ProjectTable({
  tableData,
  allProjectsPage,
  activeProjectsPage,
  inactiveProjectsPage,
}) {
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt_token");

  // If no data is available, show error component
  if (tableData.length === 0) {
    return <ErrorData />;
  }

  // Function for activating the project
  const activateProject = async (projectId) => {
    if (!token) {
      console.error("No token found");
      return;
    }
    try {
      let apiUrl = "http://localhost:3000/api/projects/activateproject";
      const response = await axios.put(
        `${apiUrl}/${projectId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response) {
        console.log("This project has been activated.");
        Swal.fire({
          title: "Project activated successfully!",
          text: "Redirecting to active projects page.",
          icon: "success",
        });
        navigate("/active-projects");
      }
    } catch (error) {
      console.log("Server error", error);
    }
  };

  // Function for deactivating the project
  const deactivateProject = async (projectId) => {
    if (!token) {
      console.error("No token found");
      return;
    }
    try {
      let apiUrl = "http://localhost:3000/api/projects/deactivateproject";
      const response = await axios.put(
        `${apiUrl}/${projectId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response) {
        console.log("This project has been deactivated.");
        Swal.fire({
          title: "Project deactivated successfully!",
          text: "Redirecting to inactive projects page.",
          icon: "success",
        });
        navigate("/inactive-projects");
      }
    } catch (error) {
      console.log("Server error", error);
    }
  };

  return (
    <>
      <table className="table table-hover mt-3">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Client</th>
            <th scope="col">Project Type</th>
            <th scope="col">Features</th>
            <th scope="col">Status</th>
            {allProjectsPage === false && <th scope="col">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {tableData.map((project, index) => (
            <tr key={project._id}>
              <th scope="row">{index + 1}</th>
              <td>{project.title}</td>
              <td>{project.description}</td>
              <td>{project.client}</td>
              <td>{project.projectType}</td>
              <td>{project.features}</td>
              <td
                className={
                  project.status === "Active"
                    ? "badge bg-success"
                    : "badge bg-danger"
                }
              >
                {project.status}
              </td>
              {allProjectsPage === false && (
                <td>
                  <button
                    onClick={
                      project.status !== "Active"
                        ? () => activateProject(project._id)
                        : () => deactivateProject(project._id)
                    }
                    className="btn btn-primary"
                  >
                    {project.status !== "Active" ? "Activate" : "Deactivate"}
                  </button>
                </td>
              )}

              {allProjectsPage === true && (
                <td>
                  <Link
                    to={`/edit-project/${project._id}`}
                    className="btn btn-primary"
                  >
                    Update
                  </Link>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ProjectTable;
