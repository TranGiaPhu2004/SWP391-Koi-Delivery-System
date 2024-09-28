import React from 'react';
import './Header.css'; // Bạn có thể thêm CSS vào file riêng
import logo from '../assets/image/vietnam.png'
import logo1 from '../assets/image/japan.png'
import logo3 from '../assets/image/Logo.png'
import Login from '../Page/Login/Login';
import { Link } from "react-router-dom";

function Header() {
  function goLogin(){
      return(
        <Login></Login>
      )
  }
  return (
    <header>
      
      

      <div className="header-content">
      
        <img src={logo} alt="Vietnam Flag" className="flag" />
        <img src={logo1} alt="Japan Flag" className="flag" />
        <img src={logo3} alt="Logo" className="logo" />
        
        <nav>
          <a href="/">Home</a>
          <a href="/services">Services</a>
          <a href="/about">About Us</a>
          <a href="/contact">Contact</a>
          <a href="/news">News</a>
        </nav>
        <div className="auth-buttons">
        <Link to="/login">
        <button>Login</button>
      </Link>
          <button>Register</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
