import React from "react";
import "./category.styles.scss";
import { connect } from "react-redux";
import { selectCollection } from "../../../redux/shop/shop.selectors";
import CollectionItem from "../../collectionItem/collectionItem.component";

const CategoryPage = ({ collection }) => {
  const { title, items } = collection;

  return (
    <div className="collection">
      {console.log(collection)}
      <h2 className="title">{title}</h2>
      <div className="items">
        {items.map((item) => (
          <CollectionItem key={item.id} item={item}></CollectionItem>
        ))}
      </div>
    </div>
  );
};
const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.category)(state),
});
export default connect(mapStateToProps)(CategoryPage);
