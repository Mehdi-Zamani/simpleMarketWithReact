import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { selectFiltersFilters } from "../../redux/filter/filter.selectors";
import { setCurrentButton } from "../../redux/pagination/pagination.actions";
import {
  selectCurrentButton,
  selectPostsPerPage,
} from "../../redux/pagination/pagination.selectors";
import "./pagination.styles.scss";

const Pagination = ({
  postsPerPage,
  totalPosts,
  setCurrentButton,
  currentButton,
  filters,
}) => {
  if (totalPosts <= postsPerPage) {
    return null;
  }

  const numberOfPages = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    numberOfPages.push(i);
  }
  // Current active button number
  //const [currentButton, setCurrentButton] = useState(1);

  // Array of buttons what we see on the page
  const [arrOfCurrButtons, setArrOfCurrButtons] = useState([]);

  useEffect(() => {
    let tempNumberOfPages = [...arrOfCurrButtons];

    let dotsInitial = "...";
    let dotsLeft = "... ";
    let dotsRight = " ...";

    if (numberOfPages.length < 6) {
      tempNumberOfPages = numberOfPages;
    } else if (currentButton >= 1 && currentButton <= 3) {
      tempNumberOfPages = [1, 2, 3, 4, dotsInitial, numberOfPages.length];
    } else if (currentButton === 4) {
      const sliced = numberOfPages.slice(0, 5);
      tempNumberOfPages = [...sliced, dotsInitial, numberOfPages.length];
    } else if (currentButton > 4 && currentButton < numberOfPages.length - 2) {
      // from 5 to 8 -> (10 - 2)
      const sliced1 = numberOfPages.slice(currentButton - 2, currentButton); // sliced1 (5-2, 5) -> [4,5]
      const sliced2 = numberOfPages.slice(currentButton, currentButton + 1); // sliced1 (5, 5+1) -> [6]
      tempNumberOfPages = [
        1,
        dotsLeft,
        ...sliced1,
        ...sliced2,
        dotsRight,
        numberOfPages.length,
      ]; // [1, '...', 4, 5, 6, '...', 10]
    } else if (currentButton > numberOfPages.length - 3) {
      // > 7
      const sliced = numberOfPages.slice(numberOfPages.length - 4); // slice(10-4)
      tempNumberOfPages = [1, dotsLeft, ...sliced];
    } else if (currentButton === dotsInitial) {
      // [1, 2, 3, 4, "...", 10].length = 6 - 3  = 3
      // arrOfCurrButtons[3] = 4 + 1 = 5
      // or
      // [1, 2, 3, 4, 5, "...", 10].length = 7 - 3 = 4
      // [1, 2, 3, 4, 5, "...", 10][4] = 5 + 1 = 6
      setCurrentButton(arrOfCurrButtons[arrOfCurrButtons.length - 3] + 1);
    } else if (currentButton === dotsRight) {
      setCurrentButton(arrOfCurrButtons[3] + 2);
    } else if (currentButton === dotsLeft) {
      setCurrentButton(arrOfCurrButtons[3] - 2);
    }
    setArrOfCurrButtons(tempNumberOfPages);
  }, [currentButton, filters]);

  return (
    <nav>
      <ul className="pagination">
        <li className={`page-item ${currentButton == 1 ? "disabled" : ""}`}>
          <a
            href="#"
            className="page-link"
            onClick={() => setCurrentButton(currentButton - 1)}
          >
            Previous
          </a>
        </li>
        {arrOfCurrButtons.map((number, index) => (
          <li
            className={`page-item ${currentButton == number ? "active" : ""}`}
            key={index}
          >
            <a
              onClick={() => setCurrentButton(number)}
              href="#"
              className="page-link"
            >
              {number}
            </a>
          </li>
        ))}

        <li
          className={`page-item ${
            currentButton >= Math.ceil(totalPosts / postsPerPage)
              ? "disabled"
              : ""
          }`}
        >
          <a
            href="#"
            className="page-link"
            onClick={() => setCurrentButton(currentButton + 1)}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

const mapStateToProps = createStructuredSelector({
  postsPerPage: selectPostsPerPage,
  currentButton: selectCurrentButton,
  filters: selectFiltersFilters,
});
const mapDispatchToProps = (dispatch) => ({
  setCurrentButton: (page) => dispatch(setCurrentButton(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
