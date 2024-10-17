import React from "react";
import "../../Components/Home_Customer.css";
import logo from "../../assets/image/vietnam.png";
import logo1 from "../../assets/image/japan.png";
import logo3 from "../../assets/image/Logo.png";
import Footer from "../../Components/Footer.jsx";
import MainContent from "../../Components/MainContent.jsx";
import avatar from "../../assets/image/avatar.png";
import { Link } from "react-router-dom";
function Home_Customer() {
  return (
    <div className="Home-Customer-content">
      <img src={logo} alt="Vietnam Flag" className="Home-flag" />
      <img src={logo1} alt="Japan Flag" className="Home-flag" />
      <img src={logo3} alt="Logo" className="Home-logo" />

      <nav className="Home-Customer-nav">
        <a href="/">Home</a>
        <a href="/PriceList">PriceList</a>
        <a href="/ViewOrder">View Order</a>
      </nav>
      <img src={avatar} alt="Avatar" className="Home-Customer-Avatar" />
      <MainContent></MainContent>
      <Footer></Footer>
    </div>
  );
}

export default Home_Customer;
