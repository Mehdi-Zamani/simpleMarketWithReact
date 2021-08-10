import cartActionTypes from "./cart.types";

export const toggleHiddenAndShow = () => ({
  type: cartActionTypes.TOGGLE_HIDDEN_AND_SHOW,
});

/* export const AddItemToCartStart = () => ({
  type: cartActionTypes.ADD_ITEM_TO_CART_START,
  
}); */
export const AddItemToCartSuccess = (item) => ({
  type: cartActionTypes.ADD_ITEM_TO_CART_SUCCESS,
  payload: item,
});
/* export const AddItemToCartFailure = (error) => ({
  type: cartActionTypes.ADD_ITEM_TO_CART_FAILURE,
  payload: error,
}); */

export const clearItemFromCartItems = (item) => ({
  type: cartActionTypes.CLEAR_ITEM_FROM_CARTITEM,
  payload: item,
});

export const decreasItem = (item) => ({
  type: cartActionTypes.DECREAS_ITEM,
  payload: item,
});
