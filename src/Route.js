import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Dashboard from "./components/dashboard/Dashboard";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import EtlCard from "./components/dashboard/dashchild/tabs/component/EtlCard";

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { profile, auth } = this.props;

    return (
      <Switch>
        <Route
          exact
          path="/"
          render={props => {
            return <Dashboard auth={auth} profile={profile} {...props} />;
          }}
        />
        <Route
          exact
          path="/ETLCard"
          render={props => {
            return <EtlCard auth={auth} profile={profile} {...props} />;
          }}
        />

        <Route
          exact
          path="/login"
          render={props => {
            return <SignIn auth={auth} {...props} />;
          }}
        />
        <Route
          exact
          path="/register"
          render={props => {
            return <SignUp auth={auth} profile={profile} {...props} />;
          }}
        />
      </Switch>
    );
  }
}

export default Routes;
