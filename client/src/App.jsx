import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import LoginPage from './Pages/Login';
import ProfilePage from './Pages/ProfilePage';
import AdminPage from './Pages/AdminPage';
import Home from './Pages/Home';
import NewProject from './Pages/NewProject';
import AllProjects from './Pages/AllProjects';
import ActiveProjects from './Pages/ActiveProjects';
import InactiveProjects from './Pages/InactiveProjects';
import EditProject from './Pages/EditProject';

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
          <Route path="/all-projects" element={<AllProjects />} />
          <Route path="/active-projects" element={<ActiveProjects />} />
          <Route path="/inactive-projects" element={<InactiveProjects />} />
          <Route path="/edit-project/:id" element={<EditProject/>} />




        </Routes>
      </div>
    </Router>
  );
}

export default App;
