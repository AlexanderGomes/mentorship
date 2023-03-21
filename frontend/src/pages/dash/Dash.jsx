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

const stripePromise = loadStripe(
  "pk_test_51KuN4jHuJoqGVoMBtHjOHAz4R7tIx5VnaIe3n5y8rtD8KOb4K4M54sISAmUzsK7N652CmDB84AR2PXtEll4BsliL00ZZArW8gT"
);

const Dash = () => {
  return (
    <div>
      <VerifyButton stripePromise={stripePromise} />
    </div>
  );
};

export default Dash;
