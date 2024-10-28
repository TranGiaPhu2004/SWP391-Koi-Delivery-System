import VnPayQR from "../../assets/image/VnPayQR.png";
import logo3 from "../../assets/image/Logo.png";
import "../../Components/VnPayQR.css";
import vnpay from "../../assets/image/vnpay.png";
import { useLocation } from "react-router-dom";
function VnPayMethod() {
  // Retrieve passed data from the state
  const location = useLocation();
  const { totalPrice, startPlace, endPlace } = location.state || {}; // Use optional chaining for safety

  const formatCurrencyyy = (amount) => {
    return amount.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };
  return (
    <div className="vnpay-Payment">
      <div className="vnpay-header">
        <img src={logo3} alt="logo-vnpay" />
        <img src={vnpay} alt="vnpay-logo" className="vnpay-logo" />
        <h2>VNPay Wallet Payment Gateway</h2>
      </div>

      <div className="vnpay-Content">
        <div className="vnpay-order-info">
          <h3>Order Information</h3>
          <p className="vnpay-info-p">
            Express Koi Delivery Ordering Enterprise
          </p>
          <p className="vnpay-info-p">
            Total Amount: {formatCurrencyyy(totalPrice)}
          </p>
          <p className="vnpay-info-p">Sent From: {startPlace}</p>
          <p className="vnpay-info-p">Delivery to: {endPlace}</p>
        </div>
        <div className="vnpay-qr-code-section">
          <img src={VnPayQR} alt="QR Code" className="vnpayQR" />
          <p>Scan QR code to pay</p>
          <p>
            Use MoMo App or camera app that supports QR code to scan the code
          </p>
          <a href="/HomeCus">Click here when payment is successful</a>
        </div>
      </div>
    </div>
  );
}

export default VnPayMethod;
