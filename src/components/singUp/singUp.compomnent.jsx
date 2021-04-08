import React, { Component } from "react";
import { connect } from "react-redux";
import { singupSetCurrnetUserStart } from "../../redux/user/user.action";
import CustomButton from "../CustomButton/CustomButton.component";
import InputForm from "../input-form/input-form.component";
import "./singUp.styles.scss";

class SingUp extends Component {
  constructor() {
    super();
    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }
  handelSubmit = (event) => {
    event.preventDefault();
    const { displayName, email, password, confirmPassword } = this.state;
    const { setCurrentUser } = this.props;

    if (password !== confirmPassword) {
      alert("passwords do not mached");
    } else if (email === "" || password === "" || confirmPassword === "") {
      alert("please Complete Email & password  ");
    } else {
      setCurrentUser(displayName, email, password);
    }
    /* if (password !== confirmPassword) {
      alert("passwords do not mached");
    } else {
      var formData = new FormData();
      formData.append("displayName", displayName);
      formData.append("email", email);
      formData.append("password", password);

      axios
        .post("http://localhost/marketphp-code/insertUserData.php", formData)

        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            const { displayName, email, id } = response.data;
            this.props.setCurrentUser({
              displayName,
              email,
              id,
            });
            this.setState({
              displayName: "",
              email: "",
              password: "",
              confirmPassword: "",
            });
          }
        })

        .catch((e) => console.log(e));
    } */
  };
  handelChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className="singup">
        <div className="title">
          <h2>I do not have an account </h2>
          <span>sing up with yuor email&password</span>
        </div>
        <form className="form" onSubmit={this.handelSubmit}>
          <InputForm
            type="text"
            name="displayName"
            label="Name"
            value={displayName}
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
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (displayName, email, password) =>
    dispatch(singupSetCurrnetUserStart(displayName, email, password)),
});

export default connect(null, mapDispatchToProps)(SingUp);
