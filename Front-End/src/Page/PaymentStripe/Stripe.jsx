import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "../../Components/CheckoutForm.css"; // Add your CSS file

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSucceeded, setPaymentSucceeded] = useState(false);
  const [amount, setAmount] = useState(""); // State for amount
  const [description, setDescription] = useState(""); // State for description

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
      // Prepare payload for backend
      const paymentData = {
        amount: parseInt(amount), // Ensure amount is an integer
        currency: "VND",
        stripeToken: token.id,
        description: description,
      };

      // Send token to backend
      const response = await fetch("http://localhost:8080/payment/charge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });

      const responseData = await response.json();
      alert(`Server response: ${JSON.stringify(responseData)}`);

      if (responseData.error) {
        console.error(responseData.error);
      } else {
        if (responseData.paymentIntent.status === "succeeded") {
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
            hidePostalCode: true, // Hide postal code field
          }}
        />
      </div>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
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
