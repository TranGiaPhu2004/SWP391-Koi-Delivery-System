
import "../../Components/Home_Customer.css";
import logo from "../../assets/image/vietnam.png";
import logo1 from "../../assets/image/japan.png";
import logo3 from "../../assets/image/Logo.png";
import Footer from "../../Components/Footer.jsx";
import MainContent from "../../Components/MainContent.jsx";
import avatar from "../../assets/image/avatar.png";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoutButton from "../../Logout.jsx";


function Home_Customer() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");

    // Nếu không có token, điều hướng về trang đăng nhập
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);
  return (
    <>
    <div className="Home-Customer-content">
      <img src={logo} alt="Vietnam Flag" className="Home-flag" />
      <img src={logo1} alt="Japan Flag" className="Home-flag" />
      <img src={logo3} alt="Logo" className="Home-logo" />
      
      <nav className="Home-Customer-nav">
        <a href="/HomeCus">Home</a>
        <a href="/PriceList">PriceList</a>
        <a href="/ViewOrder">View Order</a>
        <a href="/DeliveryTracking">Order Tracking</a>
      </nav>
      <Link to="/Profile">
      <img src={avatar} alt="Avatar" className="Home-Customer-Avatar" />
      </Link>
    </div>
    <MainContent></MainContent>
    <LogoutButton></LogoutButton>
    </>
  );
}

export default Home_Customer;
