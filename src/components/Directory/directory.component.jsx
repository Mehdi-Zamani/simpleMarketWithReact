import React, { Component } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCategory } from "../../redux/directory/directory.selectors";
import MenuItem from "../MenuItem/MenuItem.component";
import "./directory.styles.scss";

class Directory extends Component {
  render() {
    return (
      <section className="directory-menu">
        {this.props.category.map(({ id, ...otherProps }) => (
          <MenuItem key={id} {...otherProps}></MenuItem>
        ))}
      </section>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  category: selectCategory,
});

export default connect(mapStateToProps)(Directory);
