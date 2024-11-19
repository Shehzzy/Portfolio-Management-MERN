import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      const token = localStorage.getItem("jwt_token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get("http://localhost:3000/api/auth/user", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);
      } catch (err) {
        console.error('Error fetching user data:', err.response?.data || err.message); // Log the error response from the backend
        setError("You are not authorized to view this page");
        navigate("/login");
      }   
      
    };

    getUserData();
  }, [navigate]);

  return (
    <div>
      <h2>Profile Page</h2>
      {error && <p>{error}</p>}
      {user ? (
        <div>
          <p>Email: {user.userData.email}</p>
          <button onClick={() => {
            localStorage.removeItem('jwt_token');
            navigate('/login');
          }}>Logout</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProfilePage;
