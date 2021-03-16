import React from "react";
import SingIn from "../../singIn/singIn.compomnent";
import SingUp from "../../singUp/singUp.compomnent";
import "./singInUp.styles.scss";

const SingInUp = () => {
  return (
    <div className="singinup">
      <SingIn></SingIn>
      <SingUp></SingUp>
    </div>
  );
};
export default SingInUp;
