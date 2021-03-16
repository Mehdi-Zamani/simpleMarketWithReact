import React from "react";
import "./inputForm.styles.scss";

const InputForm = ({ label, ...otherProps }) => (
  <div className="group">
    <input className="form-input" {...otherProps}></input>
    {label ? (
      <label
        className={` form-input-label ${
          otherProps.value.length ? "shrink" : ""
        }`}
      >
        {label}
      </label>
    ) : null}
  </div>
);
export default InputForm;
