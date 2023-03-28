import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const VerifyButton = ({ stripePromise }) => {
  const [stripe, setStripe] = useState(null);

  useEffect(() => {
    const loadStripeObject = async () => {
      const stripeObject = await stripePromise;
      setStripe(stripeObject);
    };

    loadStripeObject();
  }, [stripePromise]);

  const handleStripe = async (e) => {
    e.preventDefault();

    if (!stripe) {
      return;
    }

    const response = await axios.post(
      "/api/stripe/create-verification-session"
    );

    window.location.href = response.data.url;
  };

  return (
    <button role="link" disabled={!stripe} onClick={handleStripe}>
      Verify
    </button>
  );
};

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_IDENTITY);

const Dash = () => {
  return (
    <div>
      <VerifyButton stripePromise={stripePromise} />
    </div>
  );
};

export default Dash;
