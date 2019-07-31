import React, { Component, Fragment } from "react";
import { Col, Card, Row } from "antd";
// import Profits from "../statistic/Profits";
// import Incomes from "../statistic/Incomes";
import AreaSeriesCard from "./tabs/component/AreaSeriesCard";
import BarSeriesCard from "./tabs/component/BarSeriesCard";
import BarSeriesStacked from "./tabs/component/BarSeriesStackedCard";
import DropperToCsv from "./tabs/component/DropperToCsv";
import EtlCard from "./tabs/component/EtlCard";
import InfoCard from "./tabs/component/infoCard";
import InputFromCsv from "./tabs/component/InputFromCsv";
import LineSeriesCard from "./tabs/component/LineSeriesCard";
import RadialChartCard from "./tabs/component/RadialChartCard";
import TableCard from "./tabs/component/TableCard";
import Uploader from "./tabs/component/Uploader";
import ValueCard from "./tabs/component/ValueCard";

class DashboardContent extends Component {
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
                      <Card title="Demografi Jenis Kelamin">
                        <RadialChartCard />
                      </Card>
                    </Col>
                    <Col className="gutter-row" sm={24} md={12}>
                      <Card title="Demografi Pendidikan">
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

export default DashboardContent;
