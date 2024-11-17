// AdminPage.js
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

function AdminPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const history = useHistory();

  useEffect(() => {
    const fetchAdminData = async () => {
      const token = localStorage.getItem('jwt_token');
      if (!token) {
        history.push('/login');
        return;
      }

      try {
        const decoded = jwt_decode(token);
        if (decoded.role !== 'admin') {
          setError('You do not have admin access');
          history.push('/profile');
          return;
        }

        const response = await axios.get('/api/admin', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(response.data);
      } catch (err) {
        setError('You are not authorized to view this page');
        history.push('/login');
      }
    };
    fetchAdminData();
  }, [history]);

  return (
    <div>
      <h2>Admin Page</h2>
      {error && <p>{error}</p>}
      {data ? (
        <div>
          <p>Admin data: {data}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default AdminPage;
