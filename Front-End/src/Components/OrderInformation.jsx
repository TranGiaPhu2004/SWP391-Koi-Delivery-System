import { useState } from "react";
import "./OrderInformation.css";
import pickoi1 from "../assets/image/pickoi1.png";
import pickoi2 from "../assets/image/pickoi2.png";
import pickoi3 from "../assets/image/pickoi3.png";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const OrderInformation = () => {
  const location = useLocation();

  const { state } = location;
  // kiểm tra xem trong hệ thống đã tồn tại state chứa dữ liệu chưa ?
  const orderData = state ? state.data : {};

  const { totalPrice, startPlace, endPlace, deliveryID, boxes } = orderData;

  // CHUYỂN SANG ĐƠN VỊ TIỀN TỂ LÀ VNĐ
  const formatCurrency = (amount) => {
    return amount.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const initialCount1 = boxes.find((box) => box.boxid === 1)?.quantity || 0;
  const initialCount2 = boxes.find((box) => box.boxid === 2)?.quantity || 0;
  const initialCount3 = boxes.find((box) => box.boxid === 3)?.quantity || 0;

  const [number1, setNumber1] = useState(initialCount1);
  const [number2, setNumber2] = useState(initialCount2);
  const [number3, setNumber3] = useState(initialCount3);

  // Delivery cost calculation
  const DeliveryType = () => {
    return deliveryID === 1 ? 300000 : 850000;
  };

  return (
    <>
      <div className="OrderInformation-paymentmethods">
        <p>
          📦Your order is getting ready🚚 <br /> 🌐🎏❤️
        </p>
      </div>
      <div className="OrderInformation-main-order">
        <div className="OrderInformation-main-pic">
          <div className="OrderInformation-pic-koi1">
            <img src={pickoi1} alt="PIC KOI 1" />
            <div className="OrderInformation-pic1">
              <p>Large Box (S01)</p>
              <div className="OrderInformation-info-box">
                <p>
                  Contains <br /> <span>10-20</span> Koi Fish totality
                </p>
              </div>
              <button className="OrderInformation-button">Delete</button>
            </div>
            <div className="OrderInformation-amount1">
              <button className="decrement-button1">-</button>
              <span className="OrderInformation-count1">{number1}</span>
              <button className="increment-button1">+</button>
            </div>
          </div>

          <div className="OrderInformation-pic-koi2">
            <img src={pickoi2} alt="PIC KOI 2" />
            <div className="OrderInformation-pic2">
              <p>Medium Box (S02)</p>
              <div className="OrderInformation-info-box">
                <p>
                  Contains at least <span>5-10</span> Koi Fish
                </p>
              </div>
              <button className="OrderInformation-button">Delete</button>
            </div>
            <div className="OrderInformation-amount2">
              <button className="decrement-button2">-</button>
              <span className="OrderInformation-count2">{number2}</span>
              <button className="increment-button2">+</button>
            </div>
          </div>

          <div className="OrderInformation-pic-koi3">
            <img src={pickoi3} alt="PIC KOI 3" />
            <div className="OrderInformation-pic3">
              <p>Small Box (S03)</p>
              <div className="OrderInformation-info-box">
                <p>
                  Contains at least <span>3-5</span> Koi Fish maximum
                </p>
              </div>
              <button className="OrderInformation-button">Delete</button>
            </div>
            <div className="OrderInformation-amount3">
              <button className="decrement-button3">-</button>
              <span className="OrderInformation-count3">{number3}</span>
              <button className="increment-button3">+</button>
            </div>
          </div>
        </div>

        <div className="OrderInformation-order-information">
          <div className="OrderInformation-order-details">
            <h2>Order Information</h2>
            <div className="OrderInformation-line"></div>
            <p>Total order: {formatCurrency(totalPrice - DeliveryType())}</p>

            <p>Delivery Cost: {formatCurrency(DeliveryType())} </p>
            <span>Total Amount: {formatCurrency(totalPrice)}</span>
            <p>Sent from: {startPlace}</p>
            <p>Delivery to: {endPlace}</p>
            <p>
              By pressing the button, I agree to the{" "}
              <a href="#">Terms and Conditions.</a>
            </p>

            <Link
              to="/checkout"
              state={{
                orderData: {
                  totalPrice,
                  startPlace,
                  endPlace,
                  deliveryID,
                  boxes,
                },
              }}
            >
              <button className="OrderInformation-payment-button">
                {formatCurrency(totalPrice)} Payment <span>→</span>
              </button>
            </Link>
            <Link
              to="/DeleteOrder"
              state={{
                orderData: {
                  totalPrice,
                  startPlace,
                  endPlace,
                  deliveryID,
                  boxes,
                },
              }}
            >
              <div className="OrderInformation-cancel">
                <a href="#">Delete</a>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderInformation;
