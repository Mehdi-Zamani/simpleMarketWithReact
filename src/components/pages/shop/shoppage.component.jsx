import React, { Component } from "react";
import "./shoppage.styles.scss";
import SHOP_DATA from "./shop-data";
import CollectionPreview from "../../collectionPreview/collectionPreview.component";

class ShopPage extends Component {
  constructor() {
    super();
    this.state = {
      shopData: SHOP_DATA,
    };
  }
  render() {
    return (
      <div className="shoppage">
        {this.state.shopData.map(({ id, ...otherProps }) => (
          <CollectionPreview key={id} {...otherProps}></CollectionPreview>
        ))}
      </div>
    );
  }
}
export default ShopPage;
