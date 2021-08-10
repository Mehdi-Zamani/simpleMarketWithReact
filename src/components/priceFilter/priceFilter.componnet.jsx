import React, { useEffect } from "react";
import $ from "jquery";
window.jQuery = window.$ = $;
import "./../../assets/jquery ui/jquery-ui.min.css";
import "./../../assets/jquery ui/jquery-ui.min.js";
import { connect } from "react-redux";
import { addFilterPrice } from "../../redux/filter/filter.action";
import { createStructuredSelector } from "reselect";
import { selectFiltersFilters } from "../../redux/filter/filter.selectors";

const PriceFilter = ({ allPrice, addFilterPrice, filters }) => {
  allPrice.sort((a, b) => a - b);

  useEffect(() => {
    $(function () {
      $("#slider-range").slider({
        range: true,
        min: allPrice[0],
        max: allPrice[allPrice.length - 1],
        values: [0, allPrice[allPrice.length - 1]],
        slide: function (event, ui) {
          $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
        },
        change: function () {
          // select price in rage
          const selectedPrice = allPrice.map((pr) => {
            if (
              pr >= $("#slider-range").slider("values", 0) &&
              pr <= $("#slider-range").slider("values", 1)
            ) {
              return pr.toString();
            } else {
              return null;
            }
          });

          var selectedPriceWithoutRepeat = selectedPrice.filter(
            (price, index, self) => {
              if (!_.isEmpty(price)) {
                return self.indexOf(price) == index;
              }
            }
          );

          if (selectedPriceWithoutRepeat.length == 0) {
            var selectedPriceWithoutRepeat = [-1];
          }

          const matchPriceInFilters = (value, name = "price") => {
            addFilterPrice(name, value);
          };
          matchPriceInFilters(selectedPriceWithoutRepeat);
        },
      });

      //// initial value of amount
      $("#amount").val(
        "$" +
          $("#slider-range").slider("values", 0) +
          " - $" +
          $("#slider-range").slider("values", 1)
      );
    });
  }, []);

  useEffect(() => {
    if (_.isEmpty(filters)) {
      $("#slider-range").slider({
        values: [0, allPrice[allPrice.length - 1]],
      });
    }
  }, [filters]);

  return (
    <div className="priceFilter">
      <p>
        <label htmlFor="amount">Price range:</label>
        <input
          type="text"
          id="amount"
          readOnly
          style={{
            border: 0,
            color: "#f6931f",
            fontWeight: "bold",
            backgroundColor: "#606f7c",
          }}
        />
      </p>

      <div id="slider-range"></div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addFilterPrice: (name, value) => {
      dispatch(addFilterPrice(name, value));
    },
  };
};
const mapStateToProps = createStructuredSelector({
  filters: selectFiltersFilters,
});
export default connect(mapStateToProps, mapDispatchToProps)(PriceFilter);
