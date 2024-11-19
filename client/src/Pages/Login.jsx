import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './loginpage.css';
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Attempting login with:", { email, password });

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",  // Your backend login API endpoint
        { email, password }
      );

      console.log("Login response:", response);  // Debugging: Check if the response is correct

      if (response.data.token) {
        localStorage.setItem("jwt_token", response.data.token);  // Store JWT in localStorage
        navigate("/profile");  // Redirect to profile page
      } else {
        setError("Invalid credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);  // Debugging: Log error
      setError("Invalid credentials");  // Show error message to user
    }
  };

  return (
    <>

      <div className="container-fluid d-flex justify-content-center align-items-center mt-5 p-5">
        <div className="login-box p-5">
        <h3 className="text-center">Login and start exploring!</h3>
          <form onSubmit={handleLogin} className="mt-3 d-flex flex-column text-start justify-content-center align-items-center">
            <div className="login-group">
              <label>Email</label>
              <br />
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="login-group">
              <label>Password</label>
              <br />
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="login-group">
              <input type="submit" value="Login" className="mt-3" />
            </div>
          {error && <p className="login-error mt-3">{error}</p>}
          </form>

        </div>
      </div>
    </>
  );
}

export default Login;
