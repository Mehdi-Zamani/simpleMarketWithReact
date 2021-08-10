import filterActionsType from "./filter.types";

export const DATA_ENTRIES = 5000; //**************** total Posts
export const ENTRIES_PER_PAGE = 100; //**************postsPerPage

/*
 *******************************filter options
 */
/* export const entryAttr = {
  color: ["red", "blue", "green", "gray", "brown"],
  price: [25, 16, 18],
}; */

////////////////////////////////////
const filtersReducer = (state = { filters: {} }, action) => {
  switch (action.type) {
    case filterActionsType.ADD_FILTER:
      let currentAddFilter =
        state.filters[action.name] && state.filters[action.name].length
          ? state.filters[action.name]
          : [];
      currentAddFilter.push(action.value);

      const newAddState = Object.assign({}, state.filters, {
        [action.name]: currentAddFilter,
      });

      return Object.assign({}, state, { filters: newAddState });

    case filterActionsType.ADD_FILTER_PRICE:
      const addStatePrice = Object.assign({}, state.filters, {
        [action.name]: action.value,
      });

      return Object.assign({}, state, { filters: addStatePrice });

    case filterActionsType.REMOVE_FILTER:
      let currentRemoveFilter =
        state.filters[action.name] && state.filters[action.name].length
          ? state.filters[action.name]
          : [];
      currentRemoveFilter = _.pull(currentRemoveFilter, action.value);

      const newRemoveState = Object.assign({}, state.filters, {
        [action.name]: currentRemoveFilter,
      });

      return Object.assign({}, state, { filters: newRemoveState });

    case filterActionsType.CLEAR_FILTERS:
      return Object.assign({}, state, { filters: {} });

    default:
      return state;
  }
};
export default filtersReducer;

/* export const pagination = (state = { page: 1 }, action) => {
  switch (action.type) {
    case "SET_PAGE":
      return Object.assign({}, state, { page: action.page });
    default:
      return state;
  }
}; */

/* export const content = (state = { entries: [] }, action) => {
  switch (action.type) {
    case "SET_CONTENT":
      return Object.assign({}, state, { entries: action.entries });
    default:
      return state;
  }
}; */
