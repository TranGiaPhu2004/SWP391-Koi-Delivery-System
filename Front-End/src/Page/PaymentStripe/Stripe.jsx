import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

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
  const { totalPrice} = orderData || {};
  const navigate = useNavigate();
 
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
      } else if (responseData.paymentIntent && responseData.paymentIntent.status === "succeeded") {
        setAmount("");
        setDescription("");
        elements.getElement(CardElement).clear();
      }
      setPaymentSucceeded(true);
      setSuccessMessage("Payment completed successfully!"); // Set success message
      setTimeout(() => {
        navigate('/HomeCus'); // Điều hướng sau 2 giây
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
  };

  return (
    <>
    <div style={styles.form}>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <CardElement options={{ hidePostalCode: true }} />
        </div>
        <input
          type="number"
          placeholder="Amount"
          value={totalPrice}
          onChange={(e) => setAmount(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Description"
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
    </>
  );
};

export default CheckoutForm;
