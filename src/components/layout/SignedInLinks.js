import { Menu, Icon, Dropdown, Avatar } from "antd";
import { Link } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";
import { signOut } from "../../redux/actions/authActions";
import Notifications from "./Notifications";
import { compose } from "redux";

const SignedInLinks = props => {
  const notifications = props.notifications;
  const hehe = props => (
    <Menu theme="light">
      <Menu.Item>
        <Link to="/">Profile</Link>
      </Menu.Item>
    </Menu>
  );
  return (
    <ul
      className=" ant-menu ant-menu-light ant-menu-root ant-menu-horizontal"
      style={{ lineHeight: "56px", position: "fixed", right: 0 }}
      role="menu"
    >
      <li className="ant-menu-item " role="menuitem" color="light">
        <Menu>
          <Menu.Item>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a onClick={props.signOut}>Logout</a>
          </Menu.Item>
        </Menu>
      </li>
    </ul>
  );
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(SignedInLinks);
