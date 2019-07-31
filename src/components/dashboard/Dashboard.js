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
    return (
      <React.Fragment>
        <div>halo</div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {};

export default connect(mapStateToProps)(Dashboard);
