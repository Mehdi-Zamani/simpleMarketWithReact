import React, { useState } from "react";
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
//import { setPostsPerPage } from "../../../redux/pagination/pagination.actions";

const CategoryPage = ({
  collection,
  match,
  collections,
  currentPage,
  postsPerPage,
  //setPostsPerPage,
}) => {
  const exsist = collections.find(
    (colle) => colle.title == match.params.category
  );
  if (!!exsist) {
    const { title, items } = collection;

    //get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = items.slice(indexOfFirstPost, indexOfLastPost);

    //load more
    //const handleLoadMore = () => setPostsPerPage(postsPerPage + 1);

    return (
      <div className="collection">
        <h2 className="title">{title}</h2>
        <div className="items">
          {currentPosts.map((item) => (
            <CollectionItem key={item.id} item={item}></CollectionItem>
          ))}
        </div>
        <Pagination totalPosts={items.length}></Pagination>
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
});
/* const mapDispatchToProps = (dispatch) => ({
  setPostsPerPage: (postCount) => dispatch(setPostsPerPage(postCount)),
}); */
export default connect(mapStateToProps)(CategoryPage);
