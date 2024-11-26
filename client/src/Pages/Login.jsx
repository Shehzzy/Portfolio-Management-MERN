import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/loginpage.css";

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
        "http://localhost:3000/api/auth/login", // Your backend login API endpoint
        { email, password }
      );

      console.log("Login response:", response); // Debugging: Check if the response is correct

      if (response.data.token) {
        localStorage.setItem("jwt_token", response.data.token); // Store JWT in localStorage
        navigate("/"); // Redirect to profile page
      } else {
        setError("Invalid credentials.");
      }
    } catch (error) {
      console.error("Login error:", error); // Debugging: Log error
      setError("Invalid credentials"); // Show error message to user
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    if(token){navigate("/");}
  }, [navigate]);

  return (
    <>
      <div className="main container-fluid d-flex justify-content-center align-items-center">
        <div className="container-fluid d-flex justify-content-center align-items-center p-5">
          <div className="row roww mt-5">
            <div className="col-lg-6 col-md-6 col-sm-12 login-box p-5">
              <h3 className="text-center login-h3">
                Login and start exploring!
              </h3>
              <form
                onSubmit={handleLogin}
                className="mt-3 d-flex flex-column text-start justify-content-center align-items-center"
              >
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
                <div className="login-group btn">
                  <input type="submit" value="Login" className="mt-3" />
                </div>
                {error && <p className="login-error mt-3">{error}</p>}
              </form>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 login-2"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
