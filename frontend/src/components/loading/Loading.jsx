import React from "react";
import "./Loading.css";

const Loading = ({ error }) => {
  return (
    <>
      {error ? (
        <div className="loading-container error">
          <p>{error}</p>
        </div>
      ) : (
        <div className="loading-container">
          <div className="loading-logo">
            <p>
              Career<span>Connect</span>
            </p>
          </div>
          <div className="loading">Loading...</div>
        </div>
      )}
    </>
  );
};

export default Loading;
