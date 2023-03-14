import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dash = () => {
  const { accessToken } = useSelector((state) => state.auth);

  const navigate = useNavigate();


  useEffect(() => {
    if (!accessToken) {
      navigate("/auth/register");
    }
  }, []);

  return <div>Dash</div>;
};

export default Dash;
