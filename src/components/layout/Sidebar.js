import React, { Component } from "react";
import {
  Layout,
  Menu
  // Icon
} from "antd";
import MenuSidebar from "./menu/MenuSidebar";
import logo from "../../assets/img/LogoDashboard.png";
import { connect } from "react-redux";
const { Sider } = Layout;

class Sidebar extends Component {
  render() {
    const { isCollapsed } = this.props;
    const { profile } = this.props;
    const links = profile => {
      return <MenuSidebar />;
    };
    return (
      <React.Fragment>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          trigger={null}
          collapsible
          collapsed={this.props.collapsed}
          theme="light"
          style={{
            height: "100vh",
            position: "fixed",
            zIndex: 1,
            left: 0
          }}
        >
          <Menu theme="light">
            <li
              className="ant-menu-item div-logo"
              role="menuitem"
              onClick={isCollapsed}
            >
              <img src={logo} alt="logo" className="logoMogo" />
            </li>
            {links(profile)}
          </Menu>
        </Sider>
        <Sider
          collapsedWidth="0"
          trigger={null}
          collapsible
          collapsed={this.props.collapsed}
          style={{
            height: "100vh",
            zIndex: -1
          }}
        />
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    profile: state.firebase.profile
  };
};

export default connect(mapStateToProps)(Sidebar);
