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
    <Menu theme="dark">
      <Menu.Item>
        <Link to="/">Profile</Link>
      </Menu.Item>

      <Menu.Item>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a onClick={props.signOut}>Logout</a>
      </Menu.Item>
    </Menu>
  );
  return (
    <ul
      className=" ant-menu ant-menu-dark ant-menu-root ant-menu-horizontal"
      style={{ lineHeight: "56px", position: "fixed", right: 0 }}
      role="menu"
    >
      <li className="ant-menu-item " role="menuitem" color="dark">
        <Dropdown overlay={Notifications(notifications)}>
          <a className="ant-dropdown-link" href="/playground">
            {/* <Badge dot> */}

            <Icon type="bell" style={{ marginRight: "-24px" }} />
            {/* </Badge>{" "} */}
          </a>
        </Dropdown>
      </li>

      <li className="ant-menu-item " role="menuitem" color="dark">
        <Dropdown overlay={hehe(props)}>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className="ant-dropdown-link" href="#">
            {/* <Badge dot> */}
            <Avatar className="avatar">{props.profile.initials}</Avatar>
            {/* </Badge>{" "} */}
            <Icon type="down" />
          </a>
        </Dropdown>
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
