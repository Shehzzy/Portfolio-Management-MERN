import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const history = useHistory();
  useEffect(() => {
    const getUserData = async () => {
      const token = localStorage.getItem("jwt_token");
      if (!token) {
        history.push("/login");
        return;
      }

      try {
        const response = await axios.get("http://localhost:3000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser = response.data;
      } catch (err) {
        setError("You are not authorized to view this page");
        history.push("/login");
      }
    };

    getUserData();
  }, [history]);
  
  eturn (
    <div>
      <h2>Profile Page</h2>
      {error && <p>{error}</p>}
      {user ? (
        <div>
          <p>Email: {user.email}</p>
          <button onClick={() => {
            localStorage.removeItem('jwt_token');
            history.push('/login');
          }}>Logout</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProfilePage;
