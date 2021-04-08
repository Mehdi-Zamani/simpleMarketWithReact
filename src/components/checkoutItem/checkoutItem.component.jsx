import React from "react";
import "./checkout.styles.scss";
import { connect } from "react-redux";
import {
  clearItemFromCartItems,
  decreasItem,
  AddItemToCartSuccess,
} from "../../redux/cart/cart.actions";

const CheckoutItem = ({ item, clearItem, removeItem, addItem }) => {
  const { imageUrl, name, quantity, price } = item;
  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={imageUrl} alt="item" />
      </div>
      <span className="name">{name}</span>
      <div className="quantity">
        <span className="arrow" onClick={() => removeItem(item)}>
          &#10094;
        </span>
        <span className="value">{quantity}</span>
        <span className="arrow" onClick={() => addItem(item)}>
          &#10095;
        </span>
      </div>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={() => clearItem(item)}>
        &#10007;
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  clearItem: (item) => dispatch(clearItemFromCartItems(item)),
  removeItem: (item) => dispatch(decreasItem(item)),
  addItem: (item) => dispatch(AddItemToCartSuccess(item)),
});
export default connect(null, mapDispatchToProps)(CheckoutItem);
