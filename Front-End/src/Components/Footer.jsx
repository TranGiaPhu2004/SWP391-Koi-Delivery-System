import React from "react";
import './Footer.css';  // Import CSS cho Footer

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Bên trái */}
        <div className="footer-left">
          <p>🌸 <strong>Address</strong></p>
          <p>E2a-7 lot, Saigon High-tech Park, <br /> Long Thanh My Ward, Thu Duc City, HCMC</p>
          <p>📧 <strong>Email</strong></p>
          <p>KoiDeliveryOrderSystem@gmail.com</p>
          <p>📱 <strong>Connect with us</strong></p>
          <p>Connect with us on social media</p>
        </div>

        {/* Ở giữa */}
        <div className="footer-center">
          <div className="footer-stars">
            ⭐⭐⭐
          </div>
          <p>Thanks For Coming</p>
          <p>See you soon❤️</p>
          <div className="footer-flowers">
            🌸🌸🌸
          </div>
        </div>

        {/* Bên phải */}
        <div className="footer-right">
          <p>🚢 <strong>Shipping</strong></p>
          <p>Create Bill of Lading <br /> Track Order <br /> Rates & Time</p>
          <p>🌐 <strong>Services</strong></p>
          <p>
            Cross-Border E-Commerce <br />
            Cross-Border Shipping <br />
            Air Freight & Customs Clearance <br />
            Selling in Vietnam <br />
            Selling Overseas
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
