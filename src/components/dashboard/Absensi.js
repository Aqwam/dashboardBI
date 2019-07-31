import React, { Component, Fragment } from "react";
import { Col, Card, Row } from "antd";
// import Profits from "../statistic/Profits";
// import Incomes from "../statistic/Incomes";

import RadialChartCard from "./dashchild/tabs/component/RadialChartCard";

class Absensi extends Component {
  state = {};
  render() {
    return (
      <Fragment>
        <div className="gutter-example">
          <Row gutter={1}>
            <Col className="gutter-row">
              <Card title="Welcome">
                <div className="gutter-example">
                  <Row gutter={1}>
                    <Col className="gutter-row" sm={24} md={12}>
                      <Card title="Absensi Kedatangan Karyawan">
                        <RadialChartCard />
                      </Card>
                    </Col>
                    <Col className="gutter-row" sm={24} md={12}>
                      <Card title="Kerja Lembur Karyawan">
                        <RadialChartCard />
                      </Card>
                    </Col>
                  </Row>

                  {/* <TableCard /> */}
                  {/* <Uploader /> */}
                  {/* <ValueCard /> */}
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </Fragment>
    );
  }
}

export default Absensi;
