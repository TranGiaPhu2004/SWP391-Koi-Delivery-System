import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../Components/OrderInformation.css";
import pickoi1 from "../../assets/image/pickoi1.png";
import pickoi2 from "../../assets/image/pickoi2.png";
import pickoi3 from "../../assets/image/pickoi3.png";
import Payment from '../../Components/Payment.jsx'
import PaymentFooter from '../../Components/PaymentFooter.jsx'

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSucceeded, setPaymentSucceeded] = useState(false);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const location = useLocation();
  const { orderData } = location.state || {};
  const { totalPrice, startPlace, endPlace, deliveryID, boxes ,orderID} =
    orderData || {};
  const navigate = useNavigate();
  const createdOrderID = localStorage.getItem("orderID");

  const initialCount1 = boxes.find((box) => box.boxid === 1)?.quantity || 0;
  const initialCount2 = boxes.find((box) => box.boxid === 2)?.quantity || 0;
  const initialCount3 = boxes.find((box) => box.boxid === 3)?.quantity || 0;

  const [number1, setNumber1] = useState(initialCount1);
  const [number2, setNumber2] = useState(initialCount2);
  const [number3, setNumber3] = useState(initialCount3);

  const DeliveryType = () => {
    return deliveryID === 1 ? 300000 : 850000;
  };

  // Hàm để định dạng số tiền với dấu phẩy
  const formatAmount = (amount) => {
    return new Intl.NumberFormat("vi-VN", { style: "decimal" }).format(amount);
  };

  const formatCurrency = (amount) => {
    return amount.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  // Hiển thị số tiền đã định dạng
  const displayAmount = totalPrice ? formatAmount(totalPrice) : "";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);
    setCardError(null);
    setPaymentSucceeded(false);
    setSuccessMessage(""); // Reset success message

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
      setCardError(error.message);
      setIsProcessing(false);
      return;
    }

    const paymentData = {
      amount: parseInt(totalPrice),
      currency: "VND",
      stripeToken: token.id,
      description,
      orderID: createdOrderID
    };

    try {
      const response = await fetch("http://localhost:8080/payment/charge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });
      const responseData = await response.json();

      if (responseData.error) {
        setCardError(responseData.error.message || "Payment failed.");
      } else if (
        responseData.paymentIntent &&
        responseData.paymentIntent.status === "succeeded"
      ) {
        setAmount("");
        setDescription("");
        elements.getElement(CardElement).clear();
      }
      setPaymentSucceeded(true);
      setSuccessMessage(
        "Payment completed successfully! Redirect to home page after 2 second."
      ); // Set success message
      setTimeout(() => {
        navigate("/HomeCus"); // Điều hướng sau 2 giây
      }, 2000); // 2000ms = 2 giây
    } catch (error) {
      setCardError("An error occurred while processing the payment.");
    } finally {
      setIsProcessing(false);
    }
  };

  const styles = {
    form: {
      maxWidth: "400px",
      margin: "auto",
      padding: "20px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      backgroundColor: "#f9f9f9",
    },
    amountDisplay: {
      fontSize: "15px",
      // fontWeight: "bold",
      margin: "10px 0",
      textAlign: "center",
    },
    input: {
      width: "100%",
      padding: "10px",
      margin: "10px 0",
      border: "1px solid #ddd",
      borderRadius: "4px",
      boxSizing: "border-box",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: isProcessing ? "#c3e6cb" : "#28a745",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      fontSize: "16px",
      cursor: isProcessing ? "not-allowed" : "pointer",
    },
    alert: {
      padding: "10px",
      borderRadius: "4px",
      marginTop: "15px",
      fontWeight: "bold",
      textAlign: "center",
    },
    successAlert: {
      backgroundColor: "#d4edda",
      color: "#155724",
      border: "1px solid #c3e6cb",
    },
    errorAlert: {
      backgroundColor: "#f8d7da",
      color: "#721c24",
      border: "1px solid #f5c6cb",
    },
    orderDetails: {
      backgroundColor: "#f0f0f0", // Màu nền
      color: "#333", // Màu chữ
    },
  };

  return (
    <>
      <Payment />
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
          <div
            className="OrderInformation-order-details"
            style={styles.orderDetails}
          >
            <div style={styles.form}>
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "15px" }}>
                  <CardElement options={{ hidePostalCode: true }} />
                </div>
                {/* <input
          type="number"
          placeholder="Amount"
          value={totalPrice}
          onChange={(e) => setAmount(e.target.value)}
          required
          style={styles.input}
          // hidden
        /> */}
                <div style={styles.amountDisplay}>Payment Amount</div>
                <div style={styles.amountDisplay}>
                  {displayAmount} VND {/* Hiển thị số tiền với chữ "VND" */}
                </div>
                <input
                  type="text"
                  placeholder="Payment Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  style={styles.input}
                />
                <button
                  type="submit"
                  disabled={!stripe || isProcessing}
                  style={styles.button}
                >
                  {isProcessing ? "Processing..." : "Pay"}
                </button>

                {paymentSucceeded && (
                  <div style={{ ...styles.alert, ...styles.successAlert }}>
                    {successMessage}
                  </div>
                )}
                {cardError && (
                  <div style={{ ...styles.alert, ...styles.errorAlert }}>
                    {cardError}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      <PaymentFooter />
    </>
  );
};

export default CheckoutForm;
