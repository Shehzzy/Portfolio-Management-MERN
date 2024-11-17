import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email, password }
      );
      if (response.data.token) {
        localStorage.setItem("jwt_token", response.data.token);
        history.push("/profile");
      }
    } catch (error) {
      setError("Invalid Credentials");
    }
  };

  return(
    <>
    <h1>Login</h1>
    <form onSubmit={handleLogin}>
    <label >Email</label>
    <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
    <label >Password</label>
    <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
    <input type="submit" value="Login" />
    </form>
    </>
  )
}

export default Login;
