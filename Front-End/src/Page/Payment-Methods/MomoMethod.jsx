import { useLocation } from "react-router-dom";
import MomoQR from "../../assets/image/MomoQR.png";
import logo3 from "../../assets/image/Logo.png";
import "../../Components/MomoQR.css";
import momo from "../../assets/image/momo.png";

function MomoMethod() {
  // Retrieve passed data from the state
  const location = useLocation();
  const { totalPrice, startPlace, endPlace } = location.state || {};  // Use optional chaining for safety

  const formatCurrencyyy = (amount) => {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };


  return (
    <div className="Momo-Payment">
      <div className="Momo-header">
        <img src={logo3} alt="logo-momo" />
        <img src={momo} alt="momo-logo" className="momo-logo" />
        <h2>MOMO Wallet Payment Gateway</h2>
      </div>

      <div className="Momo-Content">
        <div className="momo-order-info">
          <h3>Order Information</h3>
          <p className="momo-info-p1">
            Express Koi Delivery Ordering Enterprise
          </p>
          <p className="momo-info-p">Total Amount: {formatCurrencyyy(totalPrice)}</p>
          <p className="momo-info-p">Sent From: {startPlace}</p>
          <p className="momo-info-p">Delivery to: {endPlace}</p>
        </div>
        <div className="momo-qr-code-section">
          <img src={MomoQR} alt="QR Code" className="momoQR" />
          <p>Scan QR code to pay</p>
          <p>Use MoMo App or camera app that supports QR code to scan the code</p>
          <a href="/HomeCus">Click here when payment is successful</a>
        </div>
      </div>
    </div>
  );
}

export default MomoMethod;
