import React from "react";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./category.styles.scss";
import { connect } from "react-redux";
import {
  selectCollection,
  selectCollectionsForPreview,
} from "../../../redux/shop/shop.selectors";
import CollectionItem from "../../collectionItem/collectionItem.component";
import Pagination from "../../pagination/paginations.componnet";
import Error404 from "../../error404/error404.component";
import {
  selectCurrentPage,
  selectPostsPerPage,
} from "../../../redux/pagination/pagination.selectors";
import { FiltersContainer } from "../../filterContainer/filterContainer.component";
import { FilterBubblesContainer } from "../../filter-bubbles/filterBubbles.component";
import { selectFiltersFilters } from "../../../redux/filter/filter.selectors";
//import { setPostsPerPage } from "../../../redux/pagination/pagination.actions";

const CategoryPage = ({
  collection,
  match,
  collections,
  currentPage,
  postsPerPage,
  filters,
  //setPostsPerPage,
}) => {
  const exsist = collections.find(
    (colle) => colle.title == match.params.category
  );
  if (!!exsist) {
    const { title, items } = collection;
    const filterData = () => {
      if (_.isEmpty(filters)) {
        return items;
      }

      return items.filter((item) => {
        let matchFilters = true;

        Object.keys(filters).forEach((filterKey) => {
          if (filters[filterKey].length) {
            matchFilters = filters[filterKey].includes(
              item[filterKey].toString()
            )
              ? matchFilters
              : false;
          }
        });

        return matchFilters;
      });
    };

    //get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const filter_items = filterData();
    const currentPosts = filter_items.slice(indexOfFirstPost, indexOfLastPost);

    //load more
    //const handleLoadMore = () => setPostsPerPage(postsPerPage + 1);

    return (
      <div className="collection">
        <h2 className="title">{title}</h2>
        <FilterBubblesContainer></FilterBubblesContainer>
        <FiltersContainer items={items}></FiltersContainer>
        <div className="items">
          {currentPosts.map((item) => (
            <CollectionItem key={item.id} item={item}></CollectionItem>
          ))}
        </div>
        <Pagination
          totalPosts={filter_items.length}
          className="pagination"
        ></Pagination>
        {/*  {items.length > postsPerPage ? (
          <button className="btn btn-primary" onClick={handleLoadMore}>
            LoadMore
          </button>
        ) : null} */}
      </div>
    );
  } else {
    return <Error404></Error404>;
  }
};
const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.category)(state),
  collections: selectCollectionsForPreview(state),
  currentPage: selectCurrentPage(state),
  postsPerPage: selectPostsPerPage(state),
  filters: selectFiltersFilters(state),
});
/* const mapDispatchToProps = (dispatch) => ({
  setPostsPerPage: (postCount) => dispatch(setPostsPerPage(postCount)),
}); */
export default connect(mapStateToProps)(CategoryPage);
