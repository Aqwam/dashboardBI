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
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={props => {
            return <Dashboard {...props} />;
          }}
        />
        <Route
          exact
          path="/absensi"
          render={props => {
            return <Absensi {...props} />;
          }}
        />
        <Route
          exact
          path="/demografi"
          render={props => {
            return <DashboardContent />;
          }}
        />
        <Route
          exact
          path="/ETLCard"
          render={props => {
            return <EtlCard />;
          }}
        />

        <Route
          exact
          path="/login"
          render={props => {
            return <SignIn {...props} />;
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
