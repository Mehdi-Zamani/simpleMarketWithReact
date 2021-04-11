import React, { Component, lazy, Suspense } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/header/hedear.component";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user.selectors";

const Homepage = lazy(() =>
  import("./components/pages/homepage/homepage.component")
);
const ShopPage = lazy(() =>
  import("./components/pages/shop/shoppage.component")
);
const SingInUp = lazy(() =>
  import("./components/pages/singInUp/singInUp.component")
);
const CheckOutPage = lazy(() =>
  import("./components/pages/checkOut/checkOutPage.component")
);

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header></Header>
        <Switch>
          <Suspense fallback={<div>.....</div>}>
            <Route exact path="/" component={Homepage}></Route>
            <Route path="/shop" component={ShopPage}></Route>
            <Route
              path="/singinup"
              render={() =>
                this.props.currentUser ? (
                  <Redirect to="/"></Redirect>
                ) : (
                  <SingInUp></SingInUp>
                )
              }
            ></Route>
            <Route path="/checkout" component={CheckOutPage}></Route>
          </Suspense>
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(App);
