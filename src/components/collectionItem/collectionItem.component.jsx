import React from "react";
import { connect } from "react-redux";
import { AddItemToCartSuccess } from "../../redux/cart/cart.actions";
import "./collectionItem.styles.scss";
import CustomButton from "../CustomButton/CustomButton.component";

const CollectionItem = ({ item, addItemToCart }) => {
  return (
    <div className="collection-item">
      <div
        className="image"
        style={{ backgroundImage: `url(${item.imageUrl})` }}
      ></div>
      <div className="item-footer">
        <span className="name">{item.name}</span>
        <span className="price">{item.price}</span>
      </div>
      {
        <CustomButton
          inverted
          className="custom-button"
          onClick={() => addItemToCart(item)}
        >
          ADD TO CARD
        </CustomButton>
      }
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  addItemToCart: (item) => dispatch(AddItemToCartSuccess(item)),
});
export default connect(null, mapDispatchToProps)(CollectionItem);
