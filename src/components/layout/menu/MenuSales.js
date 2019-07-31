import { Menu, Icon } from "antd";

import React from "react"; //Component
import { Link } from "react-router-dom";

const MenuSales = () => {
  return (
    <React.Fragment>
      <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1">
          <Link to="/">
            <Icon type="appstore" />
            <span> Dashboard</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/products">
            <Icon type="shopping-cart" />
            <span> Products</span>
          </Link>{" "}
        </Menu.Item>
        <Menu.Item key="transcation">
          <Link to="/transactions">
            <Icon type="pay-circle" />
            <span>Transcations </span>
          </Link>{" "}
        </Menu.Item>
      </Menu>
    </React.Fragment>
  );
};
export default MenuSales;
