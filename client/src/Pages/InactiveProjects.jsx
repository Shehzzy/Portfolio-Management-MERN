import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import Footer from "../Components/Footer";
import axios from "axios";
import ProjectTable from "../Components/ProjectTable";

function InactiveProjects() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const token = localStorage.getItem("jwt_token");

  // Fetch Projects function
  const getProjects = async () => {
    let apiUrl = "http://localhost:3000/api/projects/inactiveprojects";

    try {
      const response = await axios.get(apiUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(response.data.projectData);
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
    getProjects(); // Fetch projects based on the current filter
  }, [navigate]); // Re-fetch when filter changes

  // Show loading message until the data is fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="main-body">
        <h2 className="new-project-h2 mt-5 mb-5">Explore In-Active Projects</h2>
        <div className="container-fluid">
          {/* Display error if there's any */}
          {error && <div className="alert alert-danger">{error}</div>}

          {/*TABLE COMPONENT*/}

          <ProjectTable tableData={projects} allProjectsPage={false} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default InactiveProjects;
