import React from "react";
import "./Config.css";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { StripeBtn } from "..";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_IDENTITY);

const Config = ({ setIsConfig }) => {
  const { data } = useSelector((state) => state.profile);

  return (
    <div className="popup_outer stop ">
      <div className="popup__inner config sizes">
        <div className="popup_top">
          <p className="popup__top__text">Configuration</p>
          <div className="close__icon">
            <AiOutlineClose onClick={() => setIsConfig(false)} />
          </div>
        </div>

        {!data.stripeId ? (
          <div className="config__content">
            <p>
              After clicking the button, you'll be redirected to set up your
              Stripe account. Please make sure to go through the entire
              application process to complete your account setup.
            </p>
            <StripeBtn stripePromise={stripePromise} />
          </div>
        ) : (
          <div className="submitted-message">
            Your information has been submitted to Stripe and is being
            processed. We'll let you know as soon as your account is ready!
          </div>
        )}
      </div>
    </div>
  );
};

export default Config;
