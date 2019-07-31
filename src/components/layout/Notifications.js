import { Menu } from "antd";
import React from "react";
import moment from "moment";
const Notifications = props => {
  const notifications = props;
  const links =
    notifications.length === 0 ? (
      <Menu.Item>No new notifications</Menu.Item>
    ) : (
      notifications &&
      notifications.map(item => (
        <Menu.Item key={item.id}>
          <span>{item.user} </span>
          <span>{item.content}</span>
          <div>{moment(item.time.toDate()).fromNow()}</div>
        </Menu.Item>
      ))
    );

  return <Menu theme="dark">{links}</Menu>;
};

export default Notifications;
