import React, { Component } from "react";
import "./shoppage.styles.scss";
import CollectionOverview from "../../collectionOverView/collectionOverview.component";
import CategoryPage from "../category/category.component";
import { Route } from "react-router";
import { connect } from "react-redux";
import { fetchCollectionStart } from "../../../redux/shop/shop.actions";
import WithSpinner from "../../with-spinner/withSpinner.component";
import { createStructuredSelector } from "reselect";
import {
  selectCollectionsLoaded,
  selectIsfetching,
} from "../../../redux/shop/shop.selectors";

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CategoryPageWithSpinner = WithSpinner(CategoryPage);

class ShopPage extends Component {
  componentDidMount() {
    this.props.fetchCollectionRequest();
  }
  render() {
    const { match, isFetching, isCollectionsLoaded } = this.props;
    return (
      <div className="shoppage">
        <Route
          exact
          path={`${match.path}`}
          render={(props) => (
            <CollectionOverviewWithSpinner
              {...props}
              isLoading={isFetching}
            ></CollectionOverviewWithSpinner>
          )}
        ></Route>
        <Route
          path={`${match.path}/:category`}
          render={(props) => (
            <CategoryPageWithSpinner
              {...props}
              isLoading={!isCollectionsLoaded}
            ></CategoryPageWithSpinner>
          )}
        ></Route>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  isFetching: selectIsfetching,
  isCollectionsLoaded: selectCollectionsLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionRequest: () => dispatch(fetchCollectionStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
