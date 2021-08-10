import React from "react";
import { SppinerOverlay, SpinnerContainer } from "./withSpinner.styles";

const WithSpinner = (WrappedComponent) => {
  const spinner = ({ isLoading, ...props }) => {
    return isLoading ? (
      <SppinerOverlay>
        <SpinnerContainer></SpinnerContainer>
      </SppinerOverlay>
    ) : (
      <WrappedComponent {...props}></WrappedComponent>
    );
  };
  return spinner;
};

/*const WithSpinner = (WrappedComponent = (isLoading, ...otherProps) => {
  return isLoading ? (
    <SppinerOverlay>
      <SpinnerContainer></SpinnerContainer>
    </SppinerOverlay>
  ) : (
    <WrappedComponent {...otherProps}></WrappedComponent>
  );
});
*/

export default WithSpinner;
