
import "../../Components/Home_Customer.css";
import "../../Components/ManagerCustomer.css";
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
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    setAlertMessage(`Welcome, ${username}`);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false)
        }, 2000); // 2000ms = 2 giâ
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
        
      </nav>
      
      <Link to="/Profile">
      <img src={avatar} alt="Avatar" className="Home-Customer-Avatar" />
      </Link>
    </div>
    <MainContent></MainContent>
    <LogoutButton></LogoutButton>
    {showAlert && (
        <div className="custom-alert">
          <span>{alertMessage}</span>
          {/* Khi nhấn nút "Close", sẽ tắt alert và chuyển hướng */}
          
        </div>
      )}
    </>
  );
}

export default Home_Customer;
