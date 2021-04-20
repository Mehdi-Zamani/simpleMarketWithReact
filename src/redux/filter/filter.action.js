import filterActionsType from "./filter.types";

export const addFilter = (name, value) => {
  return {
    type: filterActionsType.ADD_FILTER,
    name,
    value,
  };
};

export const removeFilter = (name, value) => {
  return {
    type: filterActionsType.REMOVE_FILTER,
    name,
    value,
  };
};

export const clearFilters = () => {
  return {
    type: filterActionsType.CLEAR_FILTERS,
  };
};

/* 
******************************setCurrentButton

*/
/* export const setPage = (page) => {
  return {
    type: "SET_PAGE",
    page,
  };
}; */

/*
 *********************FETCH_COLLECTIONS_START
 */
/* export const setContent = (entries) => {
  return {
    type: "SET_CONTENT",
    entries,
  };
}; */
