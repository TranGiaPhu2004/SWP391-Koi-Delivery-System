import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterContent.css";
import Logo from "../assets/image/Logo.png";
import loginKoi from "../assets/image/register.jpg";

function RegisterCM() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState(""); // Thêm trường nhập OTP
  const [generatedOtp, setGeneratedOtp] = useState(""); // OTP được tạo từ API
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [otpMessage, setOtpMessage] = useState(""); // Thêm thông báo OTP
  const [emailError, setEmailError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [otpError, setOtpError] = useState(false); // Đánh dấu lỗi OTP
  const [otpSent, setOtpSent] = useState(false); // Kiểm tra nếu OTP đã được gửi
  const [emailValidationResult, setEmailValidationResult] = useState(""); // Kết quả xác thực email
  const navigate = useNavigate();

  // Hàm kiểm tra tính hợp lệ của email
  const validateEmail = async (email) => {
    const url = ` https://emailvalidation.abstractapi.com/v1/?api_key=c8dbd3dc441a4535a69785c51b64b9c7&email=${email}`; // Đặt URL API xác thực email của bạn tại đây
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

  // Hàm lấy OTP
  const getOtp = async () => {
    // Chỉ cho phép lấy OTP khi email là hợp lệ
    if (emailValidationResult !== "Email is valid") {
      setErrorMessage("Please enter a valid email before requesting OTP.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/auth/generate-otp/${email}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      if (response.ok) {
        setGeneratedOtp(data.otp); // Lưu mã OTP được gửi từ server
        setOtpMessage("OTP has been sent to your email.");
        setOtpSent(true); // Đánh dấu là đã gửi OTP
        setOtpError(false);
      } else {
        setOtpMessage("Failed to send OTP. Please try again.");
        setOtpError(true);
      }
    } catch (error) {
      setOtpMessage(
        "Error sending OTP. Please check your network and try again."
      );
      setOtpError(true);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validate email first if not already validated
    if (emailValidationResult !== "Email is valid") {
      setErrorMessage("Please enter a valid email before registering.");
      return;
    }

    // Ensure the user has requested an OTP and entered one
    if (!otpSent) {
      setErrorMessage("Please request and enter OTP.");
      return;
    }

    if (!otp) {
      setErrorMessage("Please enter the OTP.");
      return;
    }

    // Call backend API to verify OTP
    try {
      const otpVerifyResponse = await fetch(
        `http://localhost:8080/auth/verify/${email}/${otp}`,
        {
          method: "POST",
        }
      );

      if (otpVerifyResponse.ok) {
        // OTP verification successful, proceed with registration
        setOtpError(false);

        // Validate other inputs (email, password, username)
        if (!email || !username || !password || !confirmPassword) {
          setErrorMessage("Please fill in all fields.");
          return;
        }

        if (password !== confirmPassword) {
          setErrorMessage("Passwords do not match.");
          return;
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{1,}$/;
        const passwordMinLength = 8;

        if (!passwordRegex.test(password)) {
          setErrorMessage(
            "Password must contain at least 1 uppercase letter, 1 number, and 1 special character."
          );
          return;
        }

        if (password.length < passwordMinLength) {
          setErrorMessage("Password must be at least 8 characters long.");
          return;
        }

        if (password.includes(username)) {
          setErrorMessage("Password must not contain the username.");
          return;
        }

        // Send registration data to backend after successful OTP verification
        const registerData = {
          email: email,
          username: username,
          password: password,
        };

        const registerResponse = await fetch(
          "http://localhost:8080/auth/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(registerData),
          }
        );

        const data = await registerResponse.json();
        if (registerResponse.ok) {
          setSuccessMessage(
            "Registration successful. Redirecting to login page..."
          );
          setErrorMessage("");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          setErrorMessage(data.msg || "Registration failed. Please try again.");
          setSuccessMessage("");
        }
      } else {
        // Handle invalid OTP case
        setErrorMessage("Invalid OTP. Please try again.");
        setOtpError(true);
      }
    } catch (error) {
      setErrorMessage(
        "Error verifying OTP. Please check your network and try again."
      );
      setOtpError(true);
    }
  };

  return (
    <div className="Register-main">
      <img
        src={loginKoi}
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
              onBlur={() => validateEmail(email)} // Kiểm tra email khi người dùng rời trường nhập
            />

            {emailValidationResult && (
              <p style={{ color: emailError ? "red" : "green" }}>
                {emailValidationResult}
              </p>
            )}
            {otpMessage && (
              <p style={{ color: otpError ? "red" : "green" }}>{otpMessage}</p>
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
          <button type="button" onClick={getOtp}>
            Get OTP
          </button>
          <div className="Register-input-group">
            <label className="Register-label">OTP</label>
            <input
              className={`Register-otp-input ${otpError ? "error" : ""}`}
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
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

// Hàm kiểm tra email thông qua API
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

export default RegisterCM;
