import MomoQR from "../../assets/image/MomoQR.png";
import logo3 from "../../assets/image/Logo.png";
import "../../Components/MomoQR.css";
import momo from "../../assets/image/momo.png";
import { Link, useNavigate } from "react-router-dom";
function MomoMethod() {
  return (
    <>
      <div className="Momo-Payment">
        <div className="Momo-header">
          <img src={logo3} alt="logo-momo" />
          <img src={momo} alt="momo-logo" className="momo-logo" />
          <h2>Cổng thanh toán MOMO</h2>
        </div>

        <div className="Momo-Content">
          <div className="momo-order-info">
            <h3>Thông tin đơn hàng</h3>
            <p className="momo-info-p">
              Nhà cung cấp: Công ty Vận Chuyển Koi Express
            </p>
            <p className="momo-info-p">Mã đơn hàng: 001</p>
            <p
              className="
            momo-info-p"
            >
              Mô tả: Thanh toán hóa đơn 001 qua ví MoMo
            </p>
            <p className="momo-info-p ">Số tiền: 330.000đ</p>
          </div>
          <div className="momo-qr-code-section">
            <img src={MomoQR} alt="QR Code" className="momoQR" />
            <p>Quét mã QR để thanh toán</p>
            <p>Sử dụng App MoMo hoặc ứng dụng camera hỗ trợ QR code để quét mã</p>
            <a href="/HomeCus">Nhấn vào đây khi đã thanh toán thành công</a>
          </div>
        </div>
      </div>
    </>

  );
}

export default MomoMethod;
