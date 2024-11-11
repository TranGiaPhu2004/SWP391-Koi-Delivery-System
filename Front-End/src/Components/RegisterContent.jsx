import "./RegisterContent.css";
import Logo from "../assets/image/Logo.png";
import KoiBackground from "../assets/image/KoiBackground.jpg";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterMethod() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Regular expressions for validation
    
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{1,}$/;
    const passwordMinLength = 8;

    setEmailError(false);
    setUsernameError(false);
    setPasswordError(false);
    setConfirmPasswordError(false);

    // Basic validation for input fields
    if (!email || !username || !password || !confirmPassword) {
      setErrorMessage("Please fill in all fields.");
      if(!email){
        setEmailError(true);
      }
      if(!username){
        setUsernameError(true);
      }
      if(!password){
        setPasswordError(true);
      }
      if(!confirmPassword){
        setConfirmPasswordError(true);
      }
      
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setConfirmPasswordError(true);
      return;
    }

    // Validate username: at least 1 uppercase letter, 1 special character, and 1 number
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "password must contain at least 1 uppercase letter, 1 number, and 1 special character."
      );
      setPasswordError(true);
      return;
    }

    
    

    // Validate password: must be at least 8 characters and not contain the username
    if (password.length < passwordMinLength) {
      setErrorMessage("Password must be at least 8 characters long.");
      setPasswordError(true);
      return;
    }

    if (password.includes(username)) {
      setErrorMessage("Password must not contain the username.");
      setUsernameError(true);
      return;
    }

    const registerData = {
      email: email,
      username: username,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccessMessage(
          "Registration successful. Redirecting to login page..."
        );
        setErrorMessage("");
        // Redirect to login page after a short delay
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else if (response.status === 401) {
        setErrorMessage(data.msg);
        setSuccessMessage("");
      } else {
        setErrorMessage("Registration failed. Please try again later.");
        setSuccessMessage("");
      }
    } catch (error) {
      setErrorMessage(
        "Error registering. Please check your network and try again."
      );
      setSuccessMessage("");
    }
  };

  return (
    <div className="Register-main">
      <img
        src={KoiBackground}
        alt="LogoRegister"
        className="Register-LogoRegisterImg"
      />
      <div className="Register-form">
        <div className="Register-logo">
          <img src={Logo} alt="Logo" />
        </div>
        <h1>REGISTER PAGE</h1>
        <form onSubmit={handleRegister}>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

          <div className="Register-input-group">
            <label className="Register-label">EMAIL</label>
            <input
              className={`Register-email-input ${emailError ? "error" : ""}`}
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="Register-input-group">
            <label className="Register-label">USERNAME</label>
            <input
              className={`Register-username-input ${
                usernameError ? "error" : ""
              }`}
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="Register-input-group">
            <label className="Register-label">PASSWORD</label>
            <input
              className={`Register-password-input ${
                passwordError ? "error" : ""
              }`}
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="Register-input-group">
            <label className="Register-label">CONFIRM PASSWORD</label>
            <input
              className={`Register-confirm-password-input ${
                confirmPasswordError ? "error" : ""
              }`}
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button className="Register-button" type="submit">
            REGISTER
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterMethod;
