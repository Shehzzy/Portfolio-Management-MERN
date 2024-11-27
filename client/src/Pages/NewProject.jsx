import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import Footer from "../Components/Footer";

function NewProject() {
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt_token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);
  const [formData, setFormData] = useState({
    category: "",
    cover: null, // File input for cover image
    screenshot: null, // File input for screenshot image
    title: "",
    description: "",
    client: "",
    projectType: "",
    date: "",
    address: "",
    liveUrl: "",
    features: "", // Features as a comma-separated string
    status: "Active", // Default value for status
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0], // Set the selected file (cover/screenshot)
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value, // Handle the text fields
      }));
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
            formPayload.append(key, formData[key]);
          }
        } else {
          formPayload.append(key, formData[key]);
        }
      }
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/projects/createproject",
        formPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // alert("Project added successfully!"); 
      // add sweet alert whenever a function is getting performed
      Swal.fire({
        title: "Project added successfully!",
        text: "Wow! You're pretty good at this!",
        icon: "success"
      });
      navigate("/all-projects");
    } catch (error) {
      console.error("Error adding project:", error);
      alert("Error adding project.");
    }
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="main-body">
        <h2 className="new-project-h2 mt-3">Create A New Project</h2>
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
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default NewProject;
