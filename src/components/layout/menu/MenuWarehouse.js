import { Menu, Icon } from "antd";
import React from "react";
import { Link } from "react-router-dom";
const SubMenu = Menu.SubMenu;

const MenuWarehouse = () => {
  return (
    <React.Fragment>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
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
          </Link>
        </Menu.Item>
        <SubMenu
          key="orders"
          title={
            <span>
              <Icon type="book" />
              <span>Orders</span>
            </span>
          }
        >
          <Menu.Item key="incoming-order">
            {" "}
            <Link to="/orders/incoming">Incoming Order</Link>
          </Menu.Item>
          <Menu.Item key="outgoing-order">
            {" "}
            <Link to="/orders/outgoing">Outgoing Order</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </React.Fragment>
  );
};
export default MenuWarehouse;
