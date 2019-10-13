import { Menu, Icon } from "antd";

import React from "react"; //Component
import { Link } from "react-router-dom";
const SubMenu = Menu.SubMenu;
const MenuSidebar = () => {
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
          <Menu.Item key="TrendParticle">
            <Link to="/TrendParticles">Trend EM Partikel</Link>
          </Menu.Item>
          <Menu.Item key="TrendMikrobiologi">
            <Link to="/TrendMikrobiologi">Trend EM Mikrobiologi</Link>
          </Menu.Item>
          <Menu.Item key="KeyPerformanceIndicator">
            <Link to="/KeyPerformanceIndicator">Key Performance Indicator</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </React.Fragment>
  );
};
export default MenuSidebar;
