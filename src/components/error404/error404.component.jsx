import React from "react";
import {
  ErrorImageOverlay,
  ErrorImageText,
  ImageContainer,
} from "./error404.styled";

const Error404 = () => {
  return (
    <ErrorImageOverlay>
      <ImageContainer
        imageUrl={"https://i.imgur.com/Q2BAOd2.png"}
      ></ImageContainer>
      <ErrorImageText>this page is not exist (404)</ErrorImageText>
    </ErrorImageOverlay>
  );
};
export default Error404;
