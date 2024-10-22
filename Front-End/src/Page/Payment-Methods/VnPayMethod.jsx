import VnPayQR from "../../assets/image/VnPayQR.png";
import logo3 from "../../assets/image/Logo.png";
import "../../Components/VnPayQR.css";
import vnpay from "../../assets/image/vnpay.png";
import { Link, useNavigate } from "react-router-dom";
function VnPayMethod() {
  return (
    <div className="vnpay-Payment">
      <div className="vnpay-header">
        <img src={logo3} alt="logo-vnpay" />
        <img src={vnpay} alt="vnpay-logo" className="vnpay-logo" />
        <h2>Cổng thanh toán VNPay</h2>
      </div>

      <div className="vnpay-Content">
        <div className="vnpay-order-info">
          <h3>Thông tin đơn hàng</h3>
          <p className="vnpay-info-p">
            Nhà cung cấp: Công ty Vận Chuyển Koi Express
          </p>
          <p className="vnpay-info-p">Mã đơn hàng: 001</p>
          <p
            className="
          vnpay-info-p"
          >
            Mô tả: Thanh toán hóa đơn 001 qua ví VNPay
          </p>
          <p className="vnpay-info-p ">Số tiền: 330.000đ</p>
        </div>
        <div className="vnpay-qr-code-section">
          <img src={VnPayQR} alt="QR Code" className="vnpayQR" />
          <p>Quét mã QR để thanh toán</p>
          <p>
            Sử dụng App VNPay hoặc ứng dụng camera hỗ trợ QR code để quét mã
          </p>
          <a href="/HomeCus">Nhấn vào đây khi đã thanh toán thành công</a>
        </div>
      </div>
    </div>
  );
}

export default VnPayMethod;
