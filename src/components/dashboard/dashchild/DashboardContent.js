import React, { Component, Fragment } from "react";
import { Col, Card, Row, Button } from "antd";
// import Profits from "../statistic/Profits";
// import Incomes from "../statistic/Incomes";
import DropperToCsv from "./tabs/component/DropperToCsv";
import RadialChartCard from "./tabs/component/RadialChartCard";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
class DashboardContent extends Component {
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
                  <Card title="Welcome">
                    <div className="gutter-example">
                      <Row gutter={1}>
                        <Col className="gutter-row" sm={24} md={12}>
                          <Card title="Demografi Jenis Kelamin">
                            <RadialChartCard
                              type="demografiJK"
                              data={importedData}
                            />
                          </Card>
                        </Col>
                        <Col className="gutter-row" sm={24} md={12}>
                          <Card title="Demografi Pendidikan">
                            <RadialChartCard
                              type="demografiPendidikan"
                              data={importedData}
                            />
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

export default connect(mapStateToProps)(DashboardContent);
