import React, { useState } from "react";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./category.styles.scss";
import { connect } from "react-redux";
import { selectCollection } from "../../../redux/shop/shop.selectors";
import CollectionItem from "../../collectionItem/collectionItem.component";
import Pagination from "../../pagination/paginations.componnet";

const CategoryPage = ({ collection }) => {
  const { title, items } = collection;

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(1);

  //get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = items.slice(indexOfFirstPost, indexOfLastPost);

  //load more
  //const handleLoadMore = () => setPostPerPage(postsPerPage + 1);

  return (
    <div className="collection">
      <h2 className="title">{title}</h2>
      <div className="items">
        {currentPosts.map((item) => (
          <CollectionItem key={item.id} item={item}></CollectionItem>
        ))}
      </div>
      <Pagination
        totalPosts={items.length}
        setCurrentPage={setCurrentPage}
        postsPerPage={postsPerPage}
      ></Pagination>
      {/* {items.length > postsPerPage ? (
        <button className="btn btn-primary" onClick={handleLoadMore}>
          LoadMore
        </button>
      ) : null} */}
    </div>
  );
};
const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.category)(state),
});
export default connect(mapStateToProps)(CategoryPage);
