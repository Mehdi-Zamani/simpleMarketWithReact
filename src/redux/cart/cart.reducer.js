import cartActionTypes from "./cart.types";
import { addItemToCart, removeItemFromCart } from "./cart.utils";

const INITIAL_STATE = {
  items: [],
  hidden: true,
  errorMessage: null,
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    /* case cartActionTypes.ADD_ITEM_TO_CART_START:
      return {
        ...state,
      }; */
    case cartActionTypes.ADD_ITEM_TO_CART_SUCCESS:
      return {
        ...state,
        items: addItemToCart(state.items, action.payload),
      };
    /* case cartActionTypes.ADD_ITEM_TO_CART_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
      }; */
    case cartActionTypes.TOGGLE_HIDDEN_AND_SHOW:
      return {
        ...state,
        hidden: !state.hidden,
      };

    case cartActionTypes.CLEAR_ITEM_FROM_CARTITEM:
      return {
        ...state,
        items: state.items.filter(
          (cartItem) => cartItem.id !== action.payload.id
        ),
      };

    case cartActionTypes.DECREAS_ITEM:
      return {
        ...state,
        items: removeItemFromCart(state.items, action.payload),
      };

    default:
      return state;
  }
};

export default cartReducer;
