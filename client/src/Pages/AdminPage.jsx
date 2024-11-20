import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';

function AdminPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      const token = localStorage.getItem('jwt_token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const decoded = jwtDecode(token);  // Decoding the token
        if (decoded.role !== 'admin') {
          setError('You do not have admin access');
          navigate('/profile');
          return;
        }

        const response = await axios.get("http://localhost:3000/api/auth/admin", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(response.data);
      } catch (err) {
        setError('You are not authorized to view this page');
        navigate('/login');
      }
    };
    fetchAdminData();
  }, [navigate]);  

  return (
    <div>
      <h2>Admin Page</h2>
      {error && <p>{error}</p>}
      {data ? (
        <div>
          <p>Admin data: {data.adminData.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default AdminPage;
