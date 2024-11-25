import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import Footer from "../Components/Footer";
import axios from 'axios';

function AllProjects() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [allProjects, setAllProjects] = useState([]);
    const token = localStorage.getItem("jwt_token");

    // Fetch Projects function
    const getProjects = async () => {
        const apiUrl = "http://localhost:3000/api/projects/projects";
        try {
            const response = await axios.get(apiUrl, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Set allProjects to the projectData array from the response
            setAllProjects(response.data.projectData); // Fix: Now accessing the correct data
            console.log("Data has been fetched.", response.data);
        } catch (error) {
            console.error("Error fetching projects:", error);
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
                const response = await axios.get("http://localhost:3000/api/auth/user", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(response.data);
                console.log('User data response:', response.data);
            } catch (err) {
                console.error('Error fetching user data:', err.response?.data || err.message);
                setError("You are not authorized to view this page");
                navigate("/login");
            } finally {
                setLoading(false);
            }
        };

        getUserData();
        getProjects();
    }, [navigate]);

    // Show loading message until the data is fetched
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar />
            <Sidebar />
            <div className="main-body">
                <h2 className="new-project-h2 mt-3">Explore All Projects</h2>
                <div className="container-fluid">
                    {/* Display error if there's any */}
                    {error && <div className="alert alert-danger">{error}</div>}

                    <table className="table table-hover mt-3">
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Title</th>
                                <th scope="col">Description</th>
                                <th scope="col">Client</th>
                                <th scope="col">Project Type</th>
                                <th scope="col">Features</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allProjects.map((project, index) => (
                                <tr key={project._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{project.title}</td>
                                    <td>{project.description}</td>
                                    <td>{project.client}</td>
                                    <td>{project.projectType}</td>
                                    <td>{project.features}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default AllProjects;
