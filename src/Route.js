import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Dashboard from "./components/dashboard/Dashboard";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import EtlCard from "./components/dashboard/dashchild/tabs/component/EtlCard";
import Absensi from "./components/dashboard/Absensi";
import DashboardContent from "./components/dashboard/dashchild/DashboardContent";

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { auth } = this.props;
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={props => {
            return <Dashboard auth={auth} {...props} />;
          }}
        />
        <Route
          exact
          path="/absensi"
          render={props => {
            return <Absensi auth={auth} {...props} />;
          }}
        />
        <Route
          exact
          path="/demografi"
          render={props => {
            return <DashboardContent auth={auth} />;
          }}
        />
        <Route
          exact
          path="/ETLCard"
          render={props => {
            return <EtlCard auth={auth} />;
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
            return <SignUp {...props} />;
          }}
        />
      </Switch>
    );
  }
}

export default Routes;
