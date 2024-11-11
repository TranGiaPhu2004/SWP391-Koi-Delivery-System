import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import "./PaymentModal.css";

const PaymentModal = ({ order, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardError, setCardError] = useState("");
  const [paymentSucceeded, setPaymentSucceeded] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [description, setDescription] = useState("");

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

    setIsProcessing(true);

    const paymentData = {
      amount: parseInt(order.totalPrice),
      currency: "VND",
      stripeToken: token.id,
      description,
      orderID: order.orderID,
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
      } else if (responseData.status === "succeeded") {
        console.log("test");
        setPaymentSucceeded(true);
        setDescription("");
        elements.getElement(CardElement).clear();
        setSuccessMessage("Payment completed successfully!");
      }
    } catch (error) {
      setCardError("An error occurred while processing the payment.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Function to handle the "Close" button click
  const handleClose = () => {
    onClose(); // Trigger the modal close event
    window.location.reload(); // Refresh the page
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
      backgroundColor: "#f0f0f0",
      color: "#333",
    },
  };

  return (
    <div className="payment-modal">
      <div className="modal-content">
        <h2>Pay Now</h2>
        <p>Order ID: {order.orderID}</p>
        <p>Amount: {order.totalPrice} VND</p>

        <form onSubmit={handleSubmit}>
          <CardElement options={{ hidePostalCode: true }} />
          <input
            type="text"
            placeholder="Payment Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={styles.input}
          />

          <div className="modal-buttons">
            <button
              type="submit"
              disabled={!stripe || isProcessing}
              className="pay-btn"
            >
              {isProcessing ? "Processing..." : "Pay"}
            </button>

            <button onClick={handleClose} className="close-btn">
              Close
            </button>
          </div>
          {/* Display success message immediately after payment succeeds */}
          {paymentSucceeded && (
            <div style={{ ...styles.alert, ...styles.successAlert }}>
              {successMessage}
            </div>
          )}

          {/* Display error message if payment fails */}
          {cardError && (
            <div style={{ ...styles.alert, ...styles.errorAlert }}>
              {cardError}
            </div>
          )}
        </form>

       
      </div>
    </div>
  );
};

export default PaymentModal;
