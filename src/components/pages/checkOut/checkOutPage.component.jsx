import React, { Component } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selecetCartTotal,
  selectCartItems,
} from "../../../redux/cart/cart.selectors";
import "./checkOutPage.styles.scss";
import CheckoutItem from "../../checkoutItem/checkoutItem.component";
class CheckOutPage extends Component {
  render() {
    return (
      <div className="checkout-page">
        <div className="checkout-header">
          <div className="header-block">
            <span>Product</span>
          </div>
          <div className="header-block">
            <span>discription</span>
          </div>
          <div className="header-block">
            <span>Quantity</span>
          </div>
          <div className="header-block">
            <span>Price</span>
          </div>
          <div className="header-block">
            <span>Remove</span>
          </div>
        </div>
        {this.props.items.map((item) => (
          <CheckoutItem key={item.id} item={item}></CheckoutItem>
        ))}
        <div className="total">
          <span>Total:{this.props.total} </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  items: selectCartItems,
  total: selecetCartTotal,
});
export default connect(mapStateToProps)(CheckOutPage);
