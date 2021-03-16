import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Homepage from "./components/pages/homepage/homepage.component";
import ShopPage from "./components/pages/shop/shoppage.component";
import Header from "./components/header/hedear.component";
import SingInUp from "./components/pages/singInUp/singInUp.component";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
    };
  }
  render() {
    return (
      <div className="App">
        <Header currentUser={this.state.currentUser}></Header>
        <Switch>
          <Route exact path="/" component={Homepage}></Route>
          <Route path="/shop" component={ShopPage}></Route>
          <Route path="/singinup" component={SingInUp}></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
