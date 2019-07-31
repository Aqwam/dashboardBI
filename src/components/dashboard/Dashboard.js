import React, { Component } from "react";
import { connect } from "react-redux";

class Dashboard extends Component {
  state = {};
  render() {
    return <React.Fragment>ini halaman dashboard</React.Fragment>;
  }
}
const mapStateToProps = state => {};

export default connect(mapStateToProps)(Dashboard);
