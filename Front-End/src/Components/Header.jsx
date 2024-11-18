import React from "react";
import "./Header.css"; // Bạn có thể thêm CSS vào file riêng
import logo from "../assets/image/vietnam.png";
import logo1 from "../assets/image/japan.png";
import logo3 from "../assets/image/Logo.png";
import Login from "../Page/Login/Login";
import { Link } from "react-router-dom";

function Header() {
  function goLogin() {
    return <Login></Login>;
  }
  return (
    <header className="Home-header">
      <div className="Home-header-content">
        <img src={logo} alt="Vietnam Flag" className="Home-flag" />
        <img src={logo1} alt="Japan Flag" className="Home-flag" />
        <img src={logo3} alt="Logo" className="Home-logo" />

        <nav className="Home-nav">
          <a href="/">Home</a>
          <a href="/PriceList">Services</a>
          
        </nav>
        <div className="Home-auth-buttons">
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/Register">
            <button>Register</button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
