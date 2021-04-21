import React, { Component } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectFiltersFilters } from "../../redux/filter/filter.selectors";
import { removeFilter, clearFilters } from "../../redux/filter/filter.action";
import _ from "lodash";
import { setCurrentButton } from "../../redux/pagination/pagination.actions";
import "./filterBubble.styles.scss";

const FilterBubbles = class FilterBubbles extends Component {
  render() {
    const allFilters = Object.keys(this.props.filters)
      .filter((filterName) => filterName !== "price")
      .reduce((filters, filterKey) => {
        if (this.props.filters[filterKey]) {
          this.props.filters[filterKey].forEach((filter) => {
            filters.push({
              name: filterKey,
              value: filter,
            });
          });
        }
        return filters;
      }, []);

    return (
      <ul className="filter-bubbles">
        {allFilters.map((filter) => {
          const filterId = _.snakeCase(`filter-${filter.name}-${filter.value}`);
          return (
            <li key={filterId}>
              <span>{filter.name}: </span>
              {filter.value}
              <button
                type="button"
                onClick={(e) => {
                  this.props.removeFilter(filter.name, filter.value);
                }}
              >
                +
              </button>
            </li>
          );
        })}
        {!!allFilters.length && (
          <li className="filters-bubbles__clear-all">
            <button type="button" onClick={this.props.clearFilters}>
              Clear All
            </button>
          </li>
        )}
      </ul>
    );
  }
};

const FilterBubbleMapStateToProps = createStructuredSelector({
  filters: selectFiltersFilters,
});

const FilterBubbleMapDispatchToProps = (dispatch) => {
  return {
    removeFilter: (name, value) => {
      dispatch(setCurrentButton(1));
      dispatch(removeFilter(name, value));
    },
    clearFilters: () => {
      dispatch(setCurrentButton(1));
      dispatch(clearFilters());
    },
  };
};

export const FilterBubblesContainer = connect(
  FilterBubbleMapStateToProps,
  FilterBubbleMapDispatchToProps
)(FilterBubbles);
