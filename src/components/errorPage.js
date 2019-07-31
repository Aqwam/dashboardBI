import React, { Component } from "react";
import { Card, Button } from "antd";
// import errorLogo from "../assets/img/error404.png";
import { Link } from "react-router-dom";
class ErrorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Card style={{ width: "96vw" }}>
          <div style={{ width: "100%", height: "50vh" }}>
            {" "}
            {/* <img src={errorLogo} className="errorLogo " /> */}
            <span style={{ textAlign: "center", display: "block" }}>
              <p>Page not Found !</p>
              <Link to="/">
                <Button type="primary"> Go back </Button>
              </Link>
            </span>
          </div>
        </Card>
      </div>
    );
  }
}
export default ErrorPage;
