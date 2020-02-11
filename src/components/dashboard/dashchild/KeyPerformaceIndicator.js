import React, { Component, Fragment } from "react";
import { Col, Card, Row, Button } from "antd";
import DropperToCsv from "./tabs/component/DropperToCsv";
import ChartKPIIntervalDay from "./tabs/component/Chart KPI Interval Day";
import ChartCountPercentage from "./tabs/component/Chart Count Percentage";
import ChartPercentageSampleStatus from "./tabs/component/Chart Percentage Sample Status";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
class KeyPerformaceIndicator extends Component {
  state = {};

  render() {
    const { auth, importedData } = this.props;
    if (!auth.uid) {
      return <Redirect to="/login" />;
    } else {
      if (!importedData) {
        return (
          <React.Fragment>
            <Row gutter={1}>
              <Col className="gutter-row">
                <Card title="Masukkan data yang akan di olah">
                  <DropperToCsv />
                </Card>
              </Col>
            </Row>
          </React.Fragment>
        );
      } else {
        return (
          <Fragment>
            <div className="gutter-example">
              <Row gutter={1}>
                <Col className="gutter-row">
                  <Card title="Tampilan Grafik Environment Monitoring Bagian Produksi PT Biofarma">
                    <div className="gutter-example">
                      <Row gutter={1}>
                        <Col className="gutter-row" sm={24} md={12}>
                          <Card title="Key Performance Indicator">
                            <ChartPercentageSampleStatus />
                          </Card>
                        </Col>
                        <Col className="gutter-row" sm={24} md={12}>
                          <Card title=".                 ">
                            <ChartKPIIntervalDay />
                          </Card>
                        </Col>
                      </Row>
                      <Row gutter={1}>
                        <Col className="gutter-row">
                          <Card>
                            <ChartCountPercentage />
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
  }
}

const mapStateToProps = state => {
  return { importedData: state.etl.importedData };
};

export default connect(mapStateToProps)(KeyPerformaceIndicator);
