import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FormContainer, Input, Button } from "./styleComponent";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (email && password && confirmPassword) {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
      } else {
        // Simulate signup logic

        try {
          console.log("Signing up with:", email, password);
          const userSignUpResponse = await axios.post("http://127.0.0.1:8181/users", {
            "firstName": firstName,
            "lastName": secondName,
            "email": email,
            "password": password
          });
          console.log('Signup success', userSignUpResponse.data);
          if (userSignUpResponse && userSignUpResponse.data.success === true) {

            navigate("/login");
          }
          else {
            setError(userSignUpResponse.data.message);
          }
          // Redirect to login after successful signup
        }
        catch (err) {
          console.error('Signup failed:', err);
          setError('Email already in use or invalid input');
        }

      }
    } else {
      setError("Please fill in all fields");
    }
  };

  return (
    <FormContainer>
      <h2>Signup</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSignup}>
        <Input
          type="firstName"
          placeholder="Enter your first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          type="secondName"
          placeholder="Enter your Last name"
          value={secondName}
          onChange={(e) => setSecondName(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button type="submit">Signup</Button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </FormContainer>
  );
};

export default SignupPage;
