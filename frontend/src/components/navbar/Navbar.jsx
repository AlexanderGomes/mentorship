import React, { useState, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import { logout } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Config } from "../";

import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfig, setIsConfig] = useState(false);

  const { id } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logOut = () => {
    dispatch(logout());
  };

  const toggleConfig = () => {
    setIsOpen(!isOpen);
    setIsConfig(!isConfig);
  };

  return (
    <>
      {isConfig && <Config setIsConfig={setIsConfig} />}
      <div className="nav__main">
        <div className="nav__logo">
          <p>
            Career<span>Connect</span>
          </p>
        </div>
        <ul className="links__main">
          <Link className="remove" to={"/search"}>
            <li>Search</li>
          </Link>
          <Link className="remove" to={`/profile/${id}`}>
            <li>profile</li>
          </Link>
          <li onClick={() => setIsConfig(true)}>config</li>
           <li>contract</li>
          <button className="logout__btn" onClick={logOut}>
            Log Out
          </button>
        </ul>

        <MobileNav
          toggleMenu={toggleMenu}
          isOpen={isOpen}
          logOut={logOut}
          id={id}
          toggleConfig={toggleConfig}
        />
      </div>
    </>
  );
};

const MobileNav = ({ toggleMenu, isOpen, logOut, id, toggleConfig }) => {
  return (
    <div className="hamburguer__nav">
      <div className="icon__nav" onClick={toggleMenu}>
        <RxHamburgerMenu />
      </div>

      {isOpen && (
        <div className="ham__icons">
          <div className="ham__inner">
            <div className="ham__top">
              <p className="nav__logo size">
                Career<span>Connect</span>
              </p>
              <div className="icon__nav red" onClick={toggleMenu}>
                <AiOutlineClose />
              </div>
            </div>

            <ul className="ham__links">
              <Link className="remove" to={"/search"}>
                <li onClick={toggleMenu}>Search</li>
              </Link>
              <Link className="remove" to={`/profile/${id}`}>
                <li onClick={toggleMenu}>profile</li>
              </Link>
              <li onClick={toggleConfig}>config</li>
              <li onClick={toggleMenu}>contract</li>
              <button className="logout__btn" onClick={logOut}>
                Log Out
              </button>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
