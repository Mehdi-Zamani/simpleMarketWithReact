import React from "react";
import "./header.styles.scss";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrnetUserSuccess } from "../../redux/user/user.action";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";

const Header = ({ currentUser, setCurrentUserToNull }) => {
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
          <div className="option" onClick={() => setCurrentUserToNull(null)}>
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
const mapStateTpProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
const mapDispatchToProps = (dispatch) => ({
  setCurrentUserToNull: (user) => dispatch(setCurrnetUserSuccess(user)),
});
export default connect(mapStateTpProps, mapDispatchToProps)(Header);
