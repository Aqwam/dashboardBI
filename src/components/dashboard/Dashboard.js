import React, { Component } from "react";
// import { Row, Col, Card } from "antd";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Managerboard from "./dashchild/Managerboard";
import Warehouseboard from "./dashchild/Warehouseboard";
import Salesboard from "./dashchild/Salesboard";

// import Incomes from "./statistic/Incomes";
// import Profits from "./statistic/Profits";
// import UpDownPrice from "./statistic/UpDownPrice";
// import LowestStock from "./statistic/LowestStock";
class Dashboard extends Component {
  state = {};
  render() {
    const { auth, profile } = this.props;
    const child =
      profile.role === "owner" ? (
        <Managerboard />
      ) : profile.role === "warehouse" ? (
        <Warehouseboard />
      ) : (
        <Salesboard />
      );
    if (!auth.uid) return <Redirect to="/login" />;
    return <React.Fragment>{child}</React.Fragment>;
  }
}
const mapStateToProps = state => {
  return { auth: state.firebase.auth };
};

export default connect(mapStateToProps)(Dashboard);
