import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { setCurrnetUser } from "../../redux/user/user.action";
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

    var formData = new FormData();
    formData.append("email", this.state.email);
    formData.append("password", this.state.password);

    axios
      .post("http://localhost/marketphp-code/singIn.php", formData)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          const { displayName, email, id } = response.data;
          this.props.setCurrentUser({
            displayName,
            email,
            id,
          });
          this.setState({ email: "", password: "" });
        }
      })
      .catch((e) => console.log(e));
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
            autoComplete="on"
          ></InputForm>
          <div className="bottons">
            <CustomButton type="submit">SING IN</CustomButton>
          </div>
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrnetUser(user)),
});

export default connect(null, mapDispatchToProps)(SingIn);
