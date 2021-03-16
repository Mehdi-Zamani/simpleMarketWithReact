import React from "react";
import "./header.styles.scss";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrnetUser } from "../../redux/user/user.action";

const Header = ({ currentUser, setCurrentUser }) => {
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
          <div className="option" onClick={() => setCurrentUser(null)}>
            SING OUT
          </div>
        ) : (
          <Link to="/singinup" className="option">
            SING IN
          </Link>
        )}
      </div>
    </div>
  );
};
const mapStateTpProps = ({ user }) => ({
  currentUser: user.currentUser,
});
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrnetUser(user)),
});
export default connect(mapStateTpProps, mapDispatchToProps)(Header);
