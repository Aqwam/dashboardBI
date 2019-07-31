import React, { Component } from "react";
// import { Row, Col, Card } from "antd";
import { connect } from "react-redux";

import DashboardContent from "./dashchild/DashboardContent";

// import Incomes from "./statistic/Incomes";
// import Profits from "./statistic/Profits";
// import UpDownPrice from "./statistic/UpDownPrice";
// import LowestStock from "./statistic/LowestStock";
class Dashboard extends Component {
  state = {};
  render() {
    return <React.Fragment>ini halaman dashboard</React.Fragment>;
  }
}
const mapStateToProps = state => {};

export default connect(mapStateToProps)(Dashboard);
