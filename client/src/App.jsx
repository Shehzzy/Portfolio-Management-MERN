import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Use Routes instead of Switch
import LoginPage from './Pages/Login';
import ProfilePage from './Pages/ProfilePage';
import AdminPage from './Pages/AdminPage';

function App() {
  return (
    <Router>
      <div>
        <h1>React Authentication</h1>
        <Routes>  {/* Use Routes instead of Switch */}
          <Route path="/login" element={<LoginPage />} />  {/* Use `element` prop for rendering components */}
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/" element={<h2>Welcome! Please log in.</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
