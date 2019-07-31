import React, { Component, Fragment } from "react";
import { Col, Card, Row } from "antd";
// import Profits from "../statistic/Profits";
// import Incomes from "../statistic/Incomes";

class Warehouseboard extends Component {
  state = {};
  render() {
    return (
      <Fragment>
        <div className="gutter-example">
          <Row gutter={1}>
            {" "}
            <Col className="gutter-row">
              <Card title="Profits">
                <div>Selamat datang di halaman utama MOGO-BI</div>
              </Card>
            </Col>
          </Row>
        </div>
      </Fragment>
    );
  }
}

export default Warehouseboard;
