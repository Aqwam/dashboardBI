import React, { Component } from "react";
import { connect } from "react-redux";
import { Input } from "antd";
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
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit} className="white">
          <Input placeholder="nama" id="nama" onChange={this.handleChange} />
        </form>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {};

export default connect(mapStateToProps)(Dashboard);
