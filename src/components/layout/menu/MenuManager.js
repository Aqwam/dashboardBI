import { Menu, Icon } from "antd";
import React from "react"; // Component

import { Link } from "react-router-dom";
const SubMenu = Menu.SubMenu;
const MenuManager = () => {
  return (
    <React.Fragment>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        {/* <SubMenu
          key="dashboard"
          title={
            <span>
              <Icon type="appstore" />
              <span>Dashboard</span>
            </span>
          }
        >
          <Menu.Item key="incoming-order">
            <Link to="/dashboard/purchasing">Purchased</Link>
          </Menu.Item>
          <Menu.Item key="outgoing-order">
            <Link to="/dashboard/sales">Sales</Link>
          </Menu.Item>
        </SubMenu> */}
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
            <Link to="/orders/incoming">Incoming Order</Link>
          </Menu.Item>
          <Menu.Item key="outgoing-order">
            <Link to="/orders/outgoing">Outgoing Order</Link>
          </Menu.Item>
          <Menu.Item key="purchased-order">
            <Link to="/orders/purchased">Purchased Order</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="5">
          <Link to="/employees">
            <Icon type="team" />
            <span>Employees </span>
          </Link>
        </Menu.Item>
      </Menu>
    </React.Fragment>
  );
};
export default MenuManager;
