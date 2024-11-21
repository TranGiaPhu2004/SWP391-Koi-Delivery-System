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
  const [emailError, setEmailError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [emailValidationResult, setEmailValidationResult] = useState("");

  const navigate = useNavigate();

  const validateEmail = async (email) => {
    const url = `https://emailvalidation.abstractapi.com/v1/?api_key=c8dbd3dc441a4535a69785c51b64b9c7&email=${email}`;
    
    httpGetAsync(url, (responseText) => {
      const response = JSON.parse(responseText);
      if (response.deliverability === "DELIVERABLE") {
        setEmailValidationResult("Email is valid");
        setEmailError(false);
      } else {
        setEmailValidationResult("Email is invalid");
        setEmailError(true);
      }
    });
  };
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Lấy danh sách vai trò từ backend
    const fetchRoles = async () => {
      try {
        const response = await fetch("http://localhost:8080/role", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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

    // Regular expressions for validation
    await validateEmail(email);

    // Nếu email không hợp lệ, dừng quá trình đăng ký
    if (emailError) {
      setErrorMessage("Invalid email. Please enter a valid email.");
      return;  // Không cho phép tiếp tục nếu email không hợp lệ
    }

    
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{1,}$/;
    const passwordMinLength = 8;

    setEmailError(false);
    setUsernameError(false);
    setPasswordError(false);
    setConfirmPasswordError(false);

    // Basic validation for input fields
    if (!email || !username || !password || !confirmPassword || !role) {
      setErrorMessage("Please fill in all fields.");
      if (!email) {
        setEmailError(true);
      }
      if (!username) {
        setUsernameError(true);
      }
      if (!password) {
        setPasswordError(true);
      }
      if (!confirmPassword) {
        setConfirmPasswordError(true);
      }

      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setConfirmPasswordError(true);
      return;
    }

   
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
      setPasswordError(true);
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
      <div className="Register-LogoRegister">
        <img
          src={LogoLogin}
          alt="LogoRegister"
          className="Register-LogoRegisterImg"
        />
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
              className={`Register-email-input ${emailError ? "error" : ""}`}
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => validateEmail(email)}
            />
            {emailValidationResult && (
              <p style={{ color: emailError ? "red" : "green" }}>
                {emailValidationResult}
              </p>
            )}
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

          <div className="Register-input-group">
            <label className="Register-label">SET ROLE</label>
            <select
              className={`Register-role-select ${!role ? "error" : ""}`}
              value={role}
              onChange={(e) => setConfirmRole(e.target.value)}
            >
              <option value="" disabled>
                Select a role
              </option>
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

function httpGetAsync(url, callback) {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
      callback(xmlHttp.responseText);
    }
  };
  xmlHttp.open("GET", url, true); // true cho không đồng bộ
  xmlHttp.send(null);
}

export default RegisterMethod;
