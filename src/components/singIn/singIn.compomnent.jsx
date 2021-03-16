import React, { Component } from "react";
import CustomButton from "../CustomButton/CustomButton.component";
import InputForm from "../input-form/input-form.component";
import "./singIn.styles.scss";

class SingIn extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }
  handelSubmit = (event) => {
    event.preventDefault();
  };
  handelChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <div className="singin">
        <div className="title">
          <h2>I already have an account </h2>
          <span>sing in with yuor email&password</span>
        </div>
        <form className="form" onSubmit={this.handelSubmit}>
          <InputForm
            label="Email"
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handelChange}
          ></InputForm>
          <InputForm
            label="Password"
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handelChange}
          ></InputForm>
          <div className="bottons">
            <CustomButton type="submit">SING IN</CustomButton>
          </div>
        </form>
      </div>
    );
  }
}
export default SingIn;
