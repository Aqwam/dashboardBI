import React, { Component, Fragment } from "react";
import { Col, Card, Row } from "antd";
// import Profits from "../statistic/Profits";
// import Incomes from "../statistic/Incomes";
import DropperToCsv from "./tabs/component/DropperToCsv";
import RadialChartCard from "./tabs/component/RadialChartCard";
import { Redirect } from "react-router-dom";
class DashboardContent extends Component {
  state = {};
  render() {
    const { auth } = this.props;

    if (!auth.uid) {
      return <Redirect to="/login" />;
    }

    return (
      <Fragment>
        <div className="gutter-example">
          <Row gutter={1}>
            <Col className="gutter-row">
              <Card title="Welcome">
                <div className="gutter-example">
                  <Row gutter={1}>
                    <Col className="gutter-row" sm={24} md={12}>
                      <Card title="Demografi Jenis Kelamin">
                        <RadialChartCard />
                      </Card>
                    </Col>
                    <Col className="gutter-row" sm={24} md={12}>
                      <Card title="Demografi Pendidikan">
                        <RadialChartCard />
                      </Card>
                    </Col>
                    <Col className="gutter-row" sm={24} md={12}>
                      <Card title="Demografi Pendidikan">
                        <DropperToCsv />
                      </Card>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </Fragment>
    );
  }
}

export default DashboardContent;
