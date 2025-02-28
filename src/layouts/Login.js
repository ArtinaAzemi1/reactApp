import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import { setToken } from "../utils/auth";
import "./../assets/css/Login.css";
import { Link } from "react-router-dom";
import {Button} from 'react-bootstrap';
import axios from "axios";
import * as jwt_decode from 'jwt-decode';
import { MDBInput } from "mdb-react-ui-kit";

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [roles, setRoles] = useState([]);

  const getToken = localStorage.getItem("token");

  const authentikimi = {
    headers: {
      Authorization: `Bearer ${getToken}`,
    },
  };

  function putEmail(value) {
    setEmail(value);
  }

  function putPassword(value) {
    setPassword(value);
  }

  useEffect(() => {
    const loggedUser = localStorage.getItem("user");

    if (loggedUser) {
      setLoggedIn(true);
    }
  });

  async function handleLogIn(e) {
    e.preventDefault();

    try {
      const response = await axios.post("https://localhost:7028/api/Auth/login", {
        email: email,
        password: password,
      }, authentikimi);

      if (response.status === 200) {
        const { token } = response.data;

        localStorage.setItem("token", token);

        const decodedToken = jwt_decode(token);

        localStorage.setItem("id", decodedToken.id);

        navigate("/admin");
      } 
    } catch (error) {
      console.log(error);
    }
  };


  /*const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    if (response.ok) {
      setToken(data.token);
      setUser(data.user);
      navigate("/dashboard");
    } else {
      setError(data.message || "Invalid login credentials");
    }
  };*/

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back</h2>
        <p>Please log in to your account</p>
        <form>
          <div className="input-group">
            <label>Email</label>
            {/*<input type="text" name="email" style={{borderRadius: "200px"}}value={credentials.username} onChange={handleChange} required />*/}
            <input
                  style={{borderRadius: "200px"}}
                  wrapperClass="mb-4 w-100"
                  label="Email address"
                  id="formControlEmailAddress"
                  type="email"
                  onChange={(e) => putEmail(e.target.value)}
                />
          </div>
          <div className="input-group">
            <label>Password</label>
            {/*<input type="password" name="password" style={{borderRadius: "200px"}}value={credentials.password} onChange={handleChange} required />*/} 
            <input
                  style={{borderRadius: "200px"}}
                  wrapperClass="mb-4 w-100"
                  label="Password"
                  id="formControlPassword"
                  type="password"
                  size="lg"
                  onChange={(e) => putPassword(e.target.value)}
                />
          </div>
          <Button type="custom-btn" variant='warning' style={{width : "290px", borderRadius: "200px"}} onClick={handleLogIn}>Login</Button>
          <p>
          Don't have an account? <Link to="/register" style={{color : "#2980b9"}}>Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;