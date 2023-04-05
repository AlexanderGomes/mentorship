import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import axios from "axios";

const VerifyButton = ({ stripePromise }) => {
  const { id } = useSelector((state) => state.auth);

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

    const response = await axios.post("/api/stripe/create", { userId: id });

    window.location.href = response.data.url;
  };

  return (
    <button className="button"  role="link" disabled={!stripe} onClick={handleStripe}>
      Verify
    </button>
  );
};

export default VerifyButton;
