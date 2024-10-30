import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "../../Components/CheckoutForm.css"; // Thêm tệp CSS cho form

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSucceeded, setPaymentSucceeded] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);
    setCardError(null);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
      setCardError(error.message);
      setIsProcessing(false);
    } else {
      alert(`Token created successfully: ${token.id}`);

      // Gửi token đến backend
      const response = await fetch("http://localhost:8080/charge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: token.id }),
      });

      const responseData = await response.json();
      alert(`Server response: ${JSON.stringify(responseData)}`);

      if (result.error) {
        console.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          setPaymentSucceeded(true);
          console.log("Payment succeeded");
        }
      }

      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <div className="card-element">
        <CardElement
          options={{
            hidePostalCode: true, // Tắt phần nhập ZIP code
            
          }}
        />
      </div>
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="pay-button"
      >
        {isProcessing ? "Processing..." : "Pay"}
      </button>
      {paymentSucceeded && <p>Payment successful!</p>}
      {cardError && <div style={{ color: 'red' }} role="alert">{cardError}</div>}
    </form>
  );
};

export default CheckoutForm;
