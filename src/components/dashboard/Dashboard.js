import React, { Component } from "react";
import { connect } from "react-redux";
import { Input, Card } from "antd";
import { Redirect } from "react-router-dom";

class Dashboard extends Component {
  state = {
    nama: ""
  };
  handleChange = e => {
    this.setState({
      nama: e.target.value
    });
    console.log(this.state.nama);
  };
  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
  };
  componentDidMount() {}
  render() {
    const { auth } = this.props;

    if (!auth.uid) {
      return <Redirect to="/login" />;
    }
    return null;
  }
}
const mapStateToProps = state => {};

export default connect(mapStateToProps)(Dashboard);
