import React from "react";
import "./collectionItem.styles.scss";

const CollectionItem = ({ item }) => {
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
      {/* <CustomButton
        inverted
        className="custom-button"
        onClick={() => addItems(item)}
      >
        ADD TO CARD
      </CustomButton> */}
    </div>
  );
};
export default CollectionItem;
