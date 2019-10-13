import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Dashboard from "./components/dashboard/Dashboard";
import SignIn from "./components/auth/SignIn";
import TrendParticles from "./components/dashboard/dashchild/TrendParticle";
import TrendMikrobiologi from "./components/dashboard/dashchild/TrendMikrobiologi";
import KeyPerformaceIndicator from "./components/dashboard/dashchild/KeyPerformaceIndicator";

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
          path="/trendParticles"
          render={props => {
            return <TrendParticles auth={auth} {...props} />;
          }}
        />
        <Route
          exact
          path="/trendMikrobiologi"
          render={props => {
            return <TrendMikrobiologi auth={auth} />;
          }}
        />
        <Route
          exact
          path="/keyPerformanceIndicator"
          render={props => {
            return <KeyPerformaceIndicator auth={auth} />;
          }}
        />
        <Route
          exact
          path="/login"
          render={props => {
            return <SignIn auth={auth} {...props} />;
          }}
        />
      </Switch>
    );
  }
}

export default Routes;
