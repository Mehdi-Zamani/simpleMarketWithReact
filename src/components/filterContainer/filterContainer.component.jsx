import React from "react";
import { connect } from "react-redux";
import { addFilter, removeFilter } from "../../redux/filter/filter.action";
import _ from "lodash";
import { setCurrentButton } from "../../redux/pagination/pagination.actions";
import { createStructuredSelector } from "reselect";
import { selectFiltersFilters } from "../../redux/filter/filter.selectors";
import "./filterContainer.styles.scss";
import PriceFilter from "../priceFilter/priceFilter.componnet";

const Filters = ({ addFilter, removeFilter, resetPage, items, filters }) => {
  const updateFilter = (name, e) => {
    if (e.target.checked) {
      addFilter(name, e.target.value);
    } else {
      removeFilter(name, e.target.value);
    }

    resetPage();
  };

  const filterList = {
    color: [],
  };

  // get option base of database column ATTr
  const dynamicFilterOption = (data_items, filterList) => {
    const filterListAttribute = Object.keys(filterList).map((key) => key);
    const itemsAttribute = Object.keys(data_items[0]);

    const myFilter = itemsAttribute.filter((attr) =>
      filterListAttribute.includes(attr)
    );

    myFilter.map((filterName) => {
      data_items.map((item) => {
        const existOption = filterList[filterName].find(
          (perOption) =>
            perOption.toLowerCase() == item[filterName].toLowerCase()
        );
        if (!existOption && !_.isEmpty(item[filterName])) {
          filterList[filterName].push(item[filterName]);
        } else {
          return filterName;
        }
      });
    });
  };

  dynamicFilterOption(items, filterList);

  return (
    <div className="filters">
      <header className="filters__header">
        <h2 className="filters__header__title">Filters</h2>
      </header>
      <div className="filters__inner">
        {Object.keys(filterList)
          .filter((filterName) => filterName !== "price")
          .map((attr, i) => {
            if (filterList[attr].length > 1) {
              return (
                <div key={`filter-${i}`} className="filters__filter">
                  <h3 className="filters__filter__title">{attr}</h3>
                  <ul>
                    {filterList[attr].map((attrValue, attrValueKey) => {
                      const inputId = _.snakeCase(attr + attrValue);
                      const checked = filters[attr]
                        ? filters[attr].includes(attrValue.toString())
                        : false;

                      return (
                        <li key={`${attrValue}-${attrValueKey}`}>
                          <input
                            type="checkbox"
                            id={inputId}
                            value={attrValue}
                            name={attrValue}
                            checked={checked}
                            onChange={(e) => {
                              updateFilter(attr, e);
                            }}
                          />
                          <label htmlFor={inputId}>{attrValue}</label>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            } else {
              return null;
            }
          })}

        <PriceFilter
          allPrice={items.map((item) => Number(item.price))}
        ></PriceFilter>
      </div>
    </div>
  );
};

const FiltersMapStateToProps = createStructuredSelector({
  filters: selectFiltersFilters,
});

const FiltersMapDispatchToProps = (dispatch) => {
  return {
    addFilter: (name, value) => {
      dispatch(addFilter(name, value));
    },
    removeFilter: (name, value) => {
      dispatch(removeFilter(name, value));
    },
    resetPage: () => {
      dispatch(setCurrentButton(1));
    },
  };
};

export const FiltersContainer = connect(
  FiltersMapStateToProps,
  FiltersMapDispatchToProps
)(Filters);
