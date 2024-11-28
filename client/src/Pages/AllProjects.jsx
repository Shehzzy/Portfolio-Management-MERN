import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import Footer from "../Components/Footer";
import axios from "axios";
import ProjectTable from "../Components/ProjectTable";
import ProjectCards from "../Components/ProjectCards"; // Ensure this is imported
import MainProjectCards from "../Components/MainProjectCards";

function AllProjects() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("all"); // 'all', 'active', 'inactive'
  const [cardLayout, setCardLayout] = useState("table-layout");
  const token = localStorage.getItem("jwt_token");

  // Fetch Projects function
  const getProjects = async (filter) => {
    let apiUrl = "http://localhost:3000/api/projects/projects"; // Default for 'all' projects
    if (filter === "active") {
      apiUrl = "http://localhost:3000/api/projects/activeprojects";
    } else if (filter === "inactive") {
      apiUrl = "http://localhost:3000/api/projects/inactiveprojects";
    }

    try {
      const response = await axios.get(apiUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(response.data.projectData); // Set fetched projects based on filter
      console.log("Data has been fetched.", response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError("An error occurred while fetching projects.");
    }
  };

  // Fetch User data and check token validity
  useEffect(() => {
    const getUserData = async () => {
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:3000/api/auth/user",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(response.data);
        console.log("User data response:", response.data);
      } catch (err) {
        console.error(
          "Error fetching user data:",
          err.response?.data || err.message
        );
        setError("You are not authorized to view this page");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    getUserData();
    getProjects(filter); // Fetch projects based on the current filter
  }, [navigate, filter]); // Re-fetch when filter changes

  // Show loading message until the data is fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="main-body">
        <h2 className="new-project-h2 mt-5 mb-5">Explore All Projects</h2>
        <div className="container-fluid">
          {/* Display error if there's any */}
          {error && <div className="alert alert-danger">{error}</div>}

          {/* Show buttons if there's any data available */}
          {projects.length != 0 ? (
            <div className="mb-5 mt-3 d-flex justify-content-between">
              <div>
                <button
                  className="btn btn-primary mx-2"
                  onClick={() =>
                    setCardLayout((prev) =>
                      prev === "table-layout" ? "card-layout" : "table-layout"
                    )
                  }
                >
                  {cardLayout === "table-layout"
                    ? "Show In Card Layout Form"
                    : "Show In Table Layout Form"}
                </button>
              </div>

              {/* Filter buttons or dropdown */}
              <div>
                <button
                  className="btn btn-warning text-white mx-2"
                  onClick={() => setFilter("all")}
                >
                  All Projects
                </button>
                <button
                  className="btn btn-success mx-2"
                  onClick={() => setFilter("active")}
                >
                  Active Projects
                </button>
                <button
                  className="btn btn-danger mx-2"
                  onClick={() => setFilter("inactive")}
                >
                  Inactive Projects
                </button>
              </div>
            </div>
          ) : (
            ""
          )}

          {cardLayout === "table-layout" ? (
            <ProjectTable tableData={projects} allProjectsPage={true}/>
          ) : (
            <div className="row mt-3">
              <MainProjectCards cardData={projects} />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AllProjects;
