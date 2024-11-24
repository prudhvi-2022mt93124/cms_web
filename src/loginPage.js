import React, { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom'; // useNavigate is used for redirection in React Router v6
import { FormContainer, Input, Button } from "./styleComponent";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const loginResponse = await axios.post("http://127.0.0.1:8181/auth/login", {
        "email": username,
        "password": password
      });
      console.log('Signup success', loginResponse.data);
      if (!loginResponse.data.token) {
        localStorage.setItem("authToken", loginResponse.data.token);
        localStorage.setItem("userRole", loginResponse.data.data.roleName);
        console.log('Signup failed:', loginResponse.data);
        setError(loginResponse.data.message);
        return loginResponse;
      } else {
        if (loginResponse.data.data.roleId === "2" && loginResponse.data.data.roleName === "user") {
          navigate('/coursesList');
        } else {
          navigate("/courses");
        }
      }

      // if (username === 'admin' && password === 'password123') {
      //   // Redirect to the dashboard after successful login
      // } else {
      //   setError('Invalid username or password');
      // }
    }
    catch (err) {
      console.log('Signup failed:', err);
      setError('Email already in use or invalid input');
    }

  }

  return (
    <FormContainer>
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <Input
          type="username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </FormContainer>
  );
};




export default LoginPage;
