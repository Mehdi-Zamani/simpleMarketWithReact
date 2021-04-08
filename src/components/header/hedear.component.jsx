import React from "react";
import "./header.styles.scss";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrnetUserSuccess } from "../../redux/user/user.action";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import CartIcon from "../cartIcon/cartIcon.component";
import CartDropDown from "../cartDropdown/cartDropDown.component";
import { selectHidden } from "../../redux/cart/cart.selectors";

const Header = ({ currentUser, setCurrentUserToNull, hidden }) => {
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
        <CartIcon></CartIcon>

        {hidden ? null : <CartDropDown></CartDropDown>}
      </div>
    </div>
  );
};
const mapStateTpProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectHidden,
});
const mapDispatchToProps = (dispatch) => ({
  setCurrentUserToNull: (user) => dispatch(setCurrnetUserSuccess(user)),
});
export default connect(mapStateTpProps, mapDispatchToProps)(Header);
