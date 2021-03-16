import React, { Component } from "react";
import CustomButton from "../CustomButton/CustomButton.component";
import InputForm from "../input-form/input-form.component";
import "./singUp.styles.scss";

class SingUp extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
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
    const { name, email, password, confirmPassword } = this.state;
    return (
      <div className="singup">
        <div className="title">
          <h2>I do not have an account </h2>
          <span>sing up with yuor email&password</span>
        </div>
        <form className="form" onSubmit={this.handelSubmit}>
          <InputForm
            type="text"
            name="name"
            label="Name"
            value={name}
            onChange={this.handelChange}
          ></InputForm>
          <InputForm
            type="email"
            name="email"
            value={email}
            onChange={this.handelChange}
            label="Email"
            className="form-input"
            required
          ></InputForm>
          <InputForm
            type="password"
            name="password"
            value={password}
            onChange={this.handelChange}
            className="form-input"
            label="Password"
            autoComplete="on"
            required
          ></InputForm>
          <InputForm
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={this.handelChange}
            className="form-input"
            label=" confirmPassword"
            autoComplete="on"
            required
          ></InputForm>
          <div className="buttons">
            <CustomButton type="submit">SING UP</CustomButton>
          </div>
        </form>
      </div>
    );
  }
}
export default SingUp;
