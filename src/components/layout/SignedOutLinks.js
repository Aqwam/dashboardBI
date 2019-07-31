import React from "react";
// import { Icon, Avatar } from "antd";
import { Link } from "react-router-dom";
const SignedOutLinks = () => {
  return (
    <React.Fragment>
      <ul
        className=" ant-menu ant-menu-dark ant-menu-root ant-menu-horizontal"
        style={{ lineHeight: "56px", position: "fixed", right: 0 }}
        role="menu"
      >
        <li className="ant-menu-item " role="menuitem" color="dark">
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </React.Fragment>
  );
};

export default SignedOutLinks;
