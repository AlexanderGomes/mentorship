import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="nav__main">
      <div className="nav__logo">
        <p>
          Career<span>Connect</span>
        </p>
      </div>
      <ul className="links__main">
        <li>home</li>
        <li>config</li>
        <li>profile</li>
      </ul>
      <div className="hamburguer__nav">
        <div className="icon__nav" onClick={toggleMenu}>
          <RxHamburgerMenu />
        </div>

        <div className="ham__icons">
          {isOpen && (
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
                <li>home</li>
                <li>config</li>
                <li>profile</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
