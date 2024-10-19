import "../../Components/RegisterContent.css";
import Logo from "../../assets/image/Logo.png";
import LogoLogin from "../../assets/image/LogoLogin.png";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RegisterMethod() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setConfirmRole] = useState("");
  const [roles, setRoles] = useState([]); // Lưu danh sách các vai trò từ backend
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Lấy danh sách vai trò từ backend
    const fetchRoles = async () => {
      try {
        const response = await fetch("http://localhost:8080/role");
        if (response.ok) {
          const data = await response.json();
          setRoles(data.allRole); // Cập nhật state với danh sách vai trò
        } else {
          console.error("Failed to fetch roles");
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchRoles();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    // Basic validation for input fields
    if (!email || !username || !password || !confirmPassword || !role) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    const registerData = {
      email: email,
      username: username,
      password: password,
      role: role,
    };

    try {
      const response = await fetch("http://localhost:8080/admin/employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(registerData),
      });

      if (response.ok) {
        setSuccessMessage("Registration successful. Redirecting to login page...");
        setErrorMessage("");
        // Redirect to login page after a short delay
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else if (response.status === 409) {
        setErrorMessage("Email already exists.");
        setSuccessMessage("");
      } else {
        setErrorMessage("Registration failed. Please try again later.");
        setSuccessMessage("");
      }
    } catch (error) {
      setErrorMessage("Error registering. Please check your network and try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="Register-main">
      <div className="Register-LogoRegister">
        <img src={LogoLogin} alt="LogoRegister" className="Register-LogoRegisterImg" />
      </div>
      <div className="Register-form">
        <div className="Register-logo">
          <img src={Logo} alt="Logo" />
        </div>
        <h1>CREATE ACCOUNT PAGE</h1>
        <form onSubmit={handleRegister}>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
          <div className="Register-input-group">
            <label className="Register-label">EMAIL</label>
            <input
              className="Register-email-input"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="Register-input-group">
            <label className="Register-label">USERNAME</label>
            <input
              className="Register-username-input"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="Register-input-group">
            <label className="Register-label">PASSWORD</label>
            <input
              className="Register-password-input"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="Register-input-group">
            <label className="Register-label">CONFIRM PASSWORD</label>
            <input
              className="Register-confirm-password-input"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="Register-input-group">
            <label className="Register-label">SET ROLE</label>
            <select
              className="Register-role-select"
              value={role}
              onChange={(e) => setConfirmRole(e.target.value)}
            >
              <option value="" disabled>Select a role</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
          <button className="Register-button" type="submit">
            CREATE
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterMethod;
