import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar';
import '../assets/style.css';
import FlashOn from '../assets/flash.png';
import FlashOff from '../assets/flash_off.png';
import User from '../assets/user.png';
import Work from '../assets/work.png';
import Footer from '../Components/Footer';
import ProjectCards from '../Components/ProjectCards';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [countAll, setCountAll] = useState(0);
  const [countActive, setCountActive] = useState(0);
  const [countInActive, setCountInactive] = useState(0);

  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // Added loading state
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt_token");


// fetch all count api 
  const getCountAllProjects = async () => {
    const resp = await axios.get("http://localhost:3000/api/projects/countallprojects", {
      headers:{Authorization: `Bearer ${token}`}
    });

    setCountAll(resp.data);
  }

  // fetch active count api 
  const getCountActiveProjects = async () => {
    const resp = await axios.get("http://localhost:3000/api/projects/countactiveprojects", {
      headers:{Authorization: `Bearer ${token}`}
    });

    setCountActive(resp.data);
  }

  // fetch inactive count api 
  const getCountInActiveProjects = async () => {
    const resp = await axios.get("http://localhost:3000/api/projects/countinactiveprojects", {
      headers:{Authorization: `Bearer ${token}`}
    });

    setCountInactive(resp.data);
  }

  useEffect(() => {
    const getUserData = async () => {
      if (!token) {
        // Redirect to login if token is missing
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
        setLoading(false); // Set loading to false after fetching
      }
    };



    getUserData();
    getCountAllProjects();
    getCountActiveProjects();
    getCountInActiveProjects();
  }, [navigate]);

  // If loading, show a loading state or a spinner
  if (loading) {
    return <p>Loading...</p>;
  }

  // If no user, redirect to login page
  if (!user) {
    navigate("/login");
    return null; // Return nothing while redirecting
  }

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className='main-body'>
        <div className="container-fluid p-5">
          <div className='row'>
            <div className='col-lg-12 col-md-12 col-sm-12'>
              <div className='card profile-card d-flex justify-content-center align-items-center'>
                <h3 className="mt-2 homepage-h3 mb-3">Welcome to Trackfolio - Your all in one <br /> portfolio management tool!</h3>
              </div>
            </div>
          </div>

          <div className='row mt-5'>
            <div className='col-lg-12 col-md-12 col-sm-12'>
              <div className='card profile-card-2 d-flex justify-content-center align-items-center'>
                <div className='card-logo d-flex justify-content-center align-items-center'>
                  <img src={User} />
                </div>
                <h3 className='homepage-h3 mt-2'>{user.userData.name}</h3>
                <ul>
                  <li>Laravel Developer |</li>
                  <li>Flutter Developer |</li>
                  <li>Full Stack Developer</li>
                </ul>
                <p>Student - Aptech Metro Stargate</p>
                <p>Karachi, Pakistan</p>
                <p className="text-capitalize">A project for managing my portfolio projects.</p>
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <ProjectCards imgSrc={FlashOn} projectHeading={"Active Projects"} projectNumbers={countActive.count} />
            <ProjectCards imgSrc={FlashOff} projectHeading={"In-Active Projects"} projectNumbers={countInActive.count} />
            <ProjectCards imgSrc={Work} projectHeading={"All Projects"} projectNumbers={countAll.count} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
