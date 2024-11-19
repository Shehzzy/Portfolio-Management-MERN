  import React, { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import axios from "axios";

  function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
      e.preventDefault(); // Ensure the form doesn't reload the page
      console.log("Attempting login with:", { email, password });  // Debugging: Check values before making the request
      
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
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input type="submit" value="Login" />
          </div>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </>
    );
  }

  export default Login;
