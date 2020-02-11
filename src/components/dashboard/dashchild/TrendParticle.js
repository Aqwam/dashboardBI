import React, { Component, Fragment } from "react";
import { Col, Card, Row, Button } from "antd";
import DropperToCsv from "./tabs/component/DropperToCsv";
import ChartTrendParticle from "./tabs/component/Chart Trend Particle";
import { CsvToHtmlTable } from "react-csv-to-table";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
class TrendParticle extends Component {
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
                <Card title="Import data to be processed">
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
                  <Card title="Graphic Display of Environment Monitoring Production Division at PT Bio Farma">
                    <div className="gutter-example">
                      <Row gutter={1}>
                        <Col className="gutter-row">
                          <Card title="Trend Environment Monitoring Particle">
                            <ChartTrendParticle type="trendParticle" />
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

export default connect(mapStateToProps)(TrendParticle);
