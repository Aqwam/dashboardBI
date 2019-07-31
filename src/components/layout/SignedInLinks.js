import { Menu } from "antd";
import React from "react";
import { connect } from "react-redux";
import { signOut } from "../../redux/actions/authActions";
import { compose } from "redux";

const SignedInLinks = props => {
  return (
    <ul
      className=" ant-menu ant-menu-light ant-menu-root ant-menu-horizontal"
      style={{ lineHeight: "56px", position: "fixed", right: 0 }}
      role="menu"
    >
      <li className="ant-menu-item" role="menuitem" color="light">
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
