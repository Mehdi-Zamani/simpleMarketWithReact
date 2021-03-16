import React from "react";
import "./MenuItem.styles.scss";

const MenuItem = ({ title, imageUrl, size }) => {
  return (
    <div className={`item-menu ${size ? "large" : ""}`}>
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className="content">
        <h1 className="title">{title.toUpperCase()}</h1>
        <span className="subtitle">SHOP NOW</span>
      </div>
    </div>
  );
};
export default MenuItem;
