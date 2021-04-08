import React from "react";
import "./cartIcon.styles.scss";
import { ReactComponent as BagIcon } from "../../assets/bag.svg";
import { connect } from "react-redux";
import { toggleHiddenAndShow } from "../../redux/cart/cart.actions";
import { createStructuredSelector } from "reselect";
import { selectItemCount } from "../../redux/cart/cart.selectors";

const CartIcon = ({ toggleHiddenAndShow, itemCount }) => {
  return (
    <div className="cart-icon" onClick={toggleHiddenAndShow}>
      <BagIcon className="bag-icon"></BagIcon>
      <span className="item-count">{itemCount}</span>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  toggleHiddenAndShow: () => dispatch(toggleHiddenAndShow()),
});
const mapStateToProps = createStructuredSelector({
  itemCount: selectItemCount,
});
export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
