import React, { Component } from "react";
import {
  Layout,
  Icon
  // Menu, Dropdown
} from "antd";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from "react-redux";
import logo from "../../assets/img/LogoDashboard.png";
const { Header } = Layout;

class Navbar extends Component {
  state = {};
  hiddenNav = (collapsed, auth) => {
    const isCollapsed = this.props.isCollapsed;
    const logoBut = auth.uid ? isCollapsed : null;
    if (collapsed) {
      return (
        <ul
          className=" ant-menu ant-menu-light ant-menu-root ant-menu-horizontal"
          style={{
            lineHeight: "56px",
            position: "fixed",
            left: 0
          }}
          role="menu"
        >
          <li
            className="ant-menu-item div-logo "
            role="menuitem"
            onClick={logoBut}
          >
            <Icon
              className="trigger menuLogo"
              type={this.props.collapsed ? "menu-unfold" : "menu-fold"}
            />
            <img src={logo} alt="logo" className="logoMogo" />
          </li>{" "}
        </ul>
      );
    }
    if (!collapsed && !auth.uid) {
      return (
        <ul
          className=" ant-menu ant-menu-light ant-menu-root ant-menu-horizontal"
          style={{
            lineHeight: "56px",
            position: "fixed",
            left: 0
          }}
          role="menu"
        >
          <li
            className="ant-menu-item div-logo"
            role="menuitem"
            onClick={logoBut}
          >
            <Icon className="trigger" type={"menu-unfold"} />
            <img src={logo} alt="logo" className="logoMogo" />
          </li>{" "}
        </ul>
      );
    }
  };
  render() {
    const { auth, collapsed, profile, notifications } = this.props;
    const links = auth.uid ? (
      <SignedInLinks
        profile={profile}
        auth={auth}
        notifications={notifications}
      />
    ) : (
      <SignedOutLinks />
    );
    return (
      <React.Fragment>
        <Header
          style={{
            background: "#ffffff",
            width: "100%",
            height: 56,
            zIndex: 1,
            position: "fixed"
          }}
        >
          {this.hiddenNav(collapsed, auth)}
          {links}
        </Header>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.firebase.auth };
};

export default connect(mapStateToProps)(Navbar);
