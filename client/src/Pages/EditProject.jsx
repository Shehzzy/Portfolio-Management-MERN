import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import Footer from "../Components/Footer";

function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt_token");

  // Redirect to login if no token is found
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const [formData, setFormData] = useState({
    category: "",
    cover: null, // cover should be initially null
    screenshot: null, // screenshot should be initially null
    title: "",
    description: "",
    client: "",
    projectType: "",
    date: "",
    address: "",
    liveUrl: "",
    features: "",
    status: "Active", // Default value for status
  });

  // Fetch existing project data to edit
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/projects/getSingleProject/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Fetched Project Data: ", response.data.project[0]);
        // Check if the response is valid and populate formData correctly
        if (response.data && response.data.project && response.data.project[0]) {
          setFormData(response.data.project[0]); // Pre-fill the form with existing data
        } else {
          Swal.fire({
            title: "Error!",
            text: "Failed to fetch project details.",
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Error fetching project:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to fetch project details.",
          icon: "error",
        });
      }
    };

    fetchProject();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData((prevData) => {
        console.log("File input changed: ", name, files[0]);
        return {
          ...prevData,
          [name]: files[0], // Handle file inputs (cover/screenshot)
        };
      });
    } else {
      setFormData((prevData) => {
        console.log("Text input changed: ", name, value);
        return {
          ...prevData,
          [name]: value, // Handle text inputs
        };
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formPayload = new FormData();

    // Append all fields into FormData
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        if (key === "cover" || key === "screenshot") {
          if (formData[key]) {
            formPayload.append(key, formData[key]); // Append files
            console.log(`Appended ${key} with`, formData[key]);  // Debugging line
          }
        } else {
          formPayload.append(key, formData[key]); // Append text fields
          console.log(`Appended ${key} with`, formData[key]);  // Debugging line
        }
      }
    }

    // Log FormData contents (FormData doesn't directly log well, so we will use this trick)
    for (let pair of formPayload.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/api/projects/updateproject/${id}`,
        formPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Use multipart/form-data when sending files
          },
        }
      );
      Swal.fire({
        title: "Project updated successfully!",
        text: "Great job! The project has been updated.",
        icon: "success",
      });
      navigate("/all-projects"); // Redirect to the all projects page
    } catch (error) {
      console.error("Error updating project:", error);
      Swal.fire({
        title: "Error!",
        text: "There was an error updating the project.",
        icon: "error",
      });
    }
};

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="main-body">
        <h2 className="new-project-h2 mt-3">Edit Project</h2>
        <div className="container p-3">
          <form onSubmit={handleSubmit}>
            {/* Project Title */}
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Project Title
              </label>
              <input
                type="text"
                name="title"
                className="form-control"
                id="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            {/* Category */}
            <div className="mb-3">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <input
                type="text"
                name="category"
                className="form-control"
                id="category"
                value={formData.category}
                onChange={handleChange}
              />
            </div>

            {/* Cover Image */}
            <div className="mb-3">
              <label htmlFor="cover" className="form-label">
                Cover Image
              </label>
              <input
                type="file"
                name="cover"
                className="form-control"
                id="cover"
                onChange={handleChange}
              />
              {formData.cover && typeof formData.cover === "string" && (
                <div className="form-text">Current cover: {formData.cover}</div>
              )}
            </div>

            {/* Screenshot Image */}
            <div className="mb-3">
              <label htmlFor="screenshot" className="form-label">
                Screenshot Image
              </label>
              <input
                type="file"
                name="screenshot"
                className="form-control"
                id="screenshot"
                onChange={handleChange}
              />
              {formData.screenshot && typeof formData.screenshot === "string" && (
                <div className="form-text">Current screenshot: {formData.screenshot}</div>
              )}
            </div>

            {/* Description */}
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                name="description"
                className="form-control"
                id="description"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Client */}
            <div className="mb-3">
              <label htmlFor="client" className="form-label">
                Client
              </label>
              <input
                type="text"
                name="client"
                className="form-control"
                id="client"
                value={formData.client}
                onChange={handleChange}
              />
            </div>

            {/* Project Type */}
            <div className="mb-3">
              <label htmlFor="projectType" className="form-label">
                Project Type
              </label>
              <input
                type="text"
                name="projectType"
                className="form-control"
                id="projectType"
                value={formData.projectType}
                onChange={handleChange}
              />
            </div>

            {/* Date */}
            <div className="mb-3">
              <label htmlFor="date" className="form-label">
                Date
              </label>
              <input
                type="text"
                name="date"
                className="form-control"
                id="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>

            {/* Address */}
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                name="address"
                className="form-control"
                id="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            {/* Live URL */}
            <div className="mb-3">
              <label htmlFor="liveUrl" className="form-label">
                Live URL
              </label>
              <input
                type="text"
                name="liveUrl"
                className="form-control"
                id="liveUrl"
                value={formData.liveUrl}
                onChange={handleChange}
              />
            </div>

            {/* Features */}
            <div className="mb-3">
              <label htmlFor="features" className="form-label">
                Features (comma-separated)
              </label>
              <input
                type="text"
                name="features"
                className="form-control"
                id="features"
                value={formData.features}
                onChange={handleChange}
              />
              <div className="form-text">
                Please ensure the features are comma-separated.
              </div>
            </div>

            {/* Status */}
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="status"
                checked={formData.status === "Active"}
                onChange={() =>
                  setFormData((prev) => ({
                    ...prev,
                    status: prev.status === "Active" ? "In-Active" : "Active",
                  }))
                }
              />
              <label className="form-check-label" htmlFor="status">
                Is this Project Active?
              </label>
            </div>

            <button type="submit" className="btn btn-primary">
              Update Project
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default EditProject;
