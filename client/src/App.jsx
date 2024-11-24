import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import LoginPage from './Pages/Login';
import ProfilePage from './Pages/ProfilePage';
import AdminPage from './Pages/AdminPage';
import Home from './Pages/Home';
import NewProject from './Pages/NewProject';

function App() {
  return (
    <Router>
      <div>
        <Routes> 
          <Route path="/login" element={<LoginPage />} /> 
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/create-a-new-project" element={<NewProject />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
