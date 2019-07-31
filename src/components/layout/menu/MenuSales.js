import { Menu, Icon } from "antd";

import React from "react"; //Component
import { Link } from "react-router-dom";
const SubMenu = Menu.SubMenu;
const MenuSales = () => {
  return (
    <React.Fragment>
      <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
        <SubMenu
          key="orders"
          title={
            <span>
              <Icon type="book" />
              <span>Dashboard</span>
            </span>
          }
        >
          <Menu.Item key="demografi">
            <Link to="/demografi">Demografi</Link>
          </Menu.Item>
          <Menu.Item key="absensi">
            <Link to="/absensi">Absensi</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </React.Fragment>
  );
};
export default MenuSales;
