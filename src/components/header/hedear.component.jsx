import React from "react";
import "./header.styles.scss";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { Link } from "react-router-dom";

const Header = ({ currentUser }) => {
  return (
    <div className="header">
      <Link to="/" className="logo-countainer">
        <Logo></Logo>
      </Link>
      <div className="options">
        <Link className="option" to="/shop">
          SHOP
        </Link>
        <Link className="option" to="/shop">
          CONTACT
        </Link>
        {currentUser ? (
          <div className="option">SING OUT</div>
        ) : (
          <Link to="/singinup" className="option">
            SING IN
          </Link>
        )}
      </div>
    </div>
  );
};
export default Header;
