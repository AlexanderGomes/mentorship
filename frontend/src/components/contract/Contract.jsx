import React, { useState, useEffect } from "react";
import "./Contract.css";
import { AiOutlineClose } from "react-icons/ai";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useSelector } from "react-redux";
import { is } from "date-fns/locale";
const Contract = ({ setIsCon }) => {
  const [contracts, setContracts] = useState([]);
  const [isMentor, setIsMentor] = useState([]);
  const { id } = useSelector((state) => state.auth);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axiosPrivate.get(`/api/functions/get/profile/${id}`);
        setIsMentor(res.data.isMentor);
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [id]);

  const getContract = async () => {
    try {
      const res = await axiosPrivate.get(
        `/api/contract/get?id=${id}&isMentor=${isMentor}`
      );
      setContracts(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (isMentor !== null && id !== null) {
      getContract();
    }
  }, [isMentor]);

  return (
    <div className="popup_outer stop">
      <div className="popup__inner contract up">
        <div className="popup_top">
          <p className="popup__top__text">Contracts</p>
          <div className="close__icon" onClick={() => setIsCon(false)}>
            <AiOutlineClose />
          </div>
        </div>
        <div className="warning-message">
          <p className="message-text">
            Stripe is in demo mode, not allowed to accept contracts.
          </p>
        </div>
        <div className="contract__content">
          {contracts?.map((c) => (
            <div key={c._id}>
              <Display info={c} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Display = ({ info }) => {
  const date = new Date(info.term);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const formattedPrice = info.price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div className="display__main">
      <div className="top">
        <p>Expiration: {formattedDate}</p>
        <p>{info.agrement.slice(0, 100)}...</p>
        <p>{formattedPrice}</p>
      </div>
    </div>
  );
};

export default Contract;
