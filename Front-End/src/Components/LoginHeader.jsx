import "./LoginHeader.css";
import Logo from "../assets/image/Logo.png";
import LogoLogin from "../assets/image/LogoLogin.png";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function LoginHeaderMethod() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate(); // Hook để điều hướng

  const handleLogin = async (e) => {
    e.preventDefault();

    // Tạo đối tượng dữ liệu để gửi lên API
    const loginData = {
      usernameOrEmail: username,
      password: password,
    };
        
    try {
      // Gửi yêu cầu POST đến API
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      // Kiểm tra phản hồi từ API
      if (response.ok) {
        const data = await response.json();
        // Lưu token vào localStorage hoặc sessionStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        if (data.role === "Admin") {
          navigate("/Manager");
        } else if (data.role === "User") {
          navigate("/Payment");
        }
        else if (data.role === "Customer") {
          navigate("/Payment");
        }
        else if (data.role === "Delivery Staff") {
          navigate("/DeliveryStatus");
        }
      } else {
        setErrorMessage("Invalid username or password");
      }
    } catch (error) {
      setErrorMessage("Error logging in");
    }
  };
  //------

  return (
    <div className="Login-main">
      <div className="Login-LogoLogin">
        <img src={LogoLogin} alt="LogoLogin" className="Login-LogoLoginImg" />
      </div>
      <div className="Login-form">
        <div className="Login-logo">
          <img src={Logo} alt="Logo" />
        </div>
        <h1>LOGIN PAGE</h1>
        <form onSubmit={handleLogin}>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <div className="Login-input-group">
            <label className="Login-label">USERNAME</label>
            <input
              className="Login-username-input"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="Login-input-group">
            <label className="Login-label">PASSWORD</label>
            <input
              className="Login-password-input"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="Login-links">
            <Link to="/ForgotPass">Forgot password?</Link>
            <Link to="/Register">Register here.</Link>
          </div>
          <button className="Login-button" type="submit">
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}
export default LoginHeaderMethod;
