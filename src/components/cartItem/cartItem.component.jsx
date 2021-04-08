import React from "react";
import "./cartItem.styles.scss";

const CartItem = ({ item: { imageUrl, name, price, quantity } }) => {
  return (
    <div className="cart-item">
      <img alt="item" src={imageUrl}></img>
      <div className="content-item">
        <span className="name">{name}</span>
        <span className="name">
          {price}$ * {quantity}
        </span>
      </div>
    </div>
  );
};
export default CartItem;
