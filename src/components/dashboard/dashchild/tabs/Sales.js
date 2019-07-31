import React, { Component, Fragment } from "react";
import {
  Col,
  Card,
  Row,
  Icon
  // Tabs, Select, DatePicker
} from "antd";
// import _ from "lodash";
// import DropperToCsv from "./component/DropperToCsv";
import { getPurchasedOrder } from "../../../../redux/actions/purchasedActions";
import { getTransactionOrder } from "../../../../redux/actions/transactionActions";
import { getRestockOrder } from "../../../../redux/actions/restockActions";
import ValueCard from "./component/ValueCard";
// import BarSeriesStackedCard from "./component/BarSeriesStackedCard";
import BarSeries from "./component/BarSeriesCard";
// import TableCard from "./component/TableCard";
// import Uploader from "./component/Uploader";
// import RadialChartCard from "./component/RadialChartCard";
import EtlCard from "./component/EtlCard";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { deleteFactSales } from "../../../../redux/actions/etlActions";

class Sales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardLoading: true,
      spendPerProdPeriod: "alltime",
      transactionPerDistPeriod: "alltime",
      counterListPurchased: [],
      counterListResctock: [],
      counterListTransaction: [],
      counterPurchased: []
    };
  }
  handleChecker = () => {
    const {
      deleteFactSales,
      // factPurchased,
      factSales
    } = this.props;
    factSales.forEach(item => deleteFactSales(item.id));
    //deleteFactSales(id)
    //console.log("clicked")
  };
  render() {
    // const { spendPeriod, transactionPeriod } = this.state;
    const {
      factPurchased,
      // products,
      factSales
    } = this.props;
    if (!factSales) {
      return (
        <div>
          <Icon type="loading" className="splash-loading" />
        </div>
      );
    }
    if (!factPurchased) {
      return (
        <div>
          <Icon type="loading" className="splash-loading" />
        </div>
      );
    } else {
      if (factSales.length === 0) {
        return <Redirect to="/ETLCard" />;
      }
      if (factPurchased.length === 0) {
        return (
          <Fragment>
            <div>
              data memerlukan factPurchased, klik tombol dibawah untuk
              memasukkan data kedalam data warehouse
            </div>
            <EtlCard type={"purchased"} />
          </Fragment>
        );
      } else {
        // let counterTrans = factPurchased.map(
        //     item => item.transactionId
        // );
        // // let marketingTrans = [...new Set(counterTrans)].length;
        let counterTotal = factPurchased.map(item => item.subtotal);
        let marketingSpend = counterTotal.reduce((a, c) => {
          return a + c;
        });
        let counterTotalSales = factSales.map(item => item.subtotal);
        let income = counterTotalSales.reduce((a, c) => {
          return a + c;
        });
        let profit = income - marketingSpend;
        return (
          <Fragment>
            <div className="gutter-example">
              <Row gutter={1}>
                <Col className="gutter-row" sm={24} md={12}>
                  <Card title="Income">
                    <div>
                      <ValueCard passedValue={income} />
                    </div>
                  </Card>
                </Col>
                <Col className="gutter-row" sm={24} md={12}>
                  <Card title="Profit">
                    <div>
                      <ValueCard passedValue={profit} />
                    </div>
                  </Card>
                </Col>
                <Col className="gutter-row" sm={24} md={24}>
                  <Card title="Income per Product">
                    <BarSeries passedValue={factSales} type={"sales"} />
                  </Card>
                </Col>
                {/* <Col className="gutter-row" sm={24} md={24}>
                                    <Card title="Most Sale Product">
                                        <RadialChartCard
                                            passedValue={factPurchased}/>
                                    </Card>
                                </Col> */}
                {/* <Col
                                    className="gutter-row"
                                    sm={24}
                                    md={24}
                                    lg={24}
                                >
                                    <Card title="Product price comparation">
                                        <TableCard
                                            passedValue={factPurchased}
                                        />
                                    </Card>
                                </Col> */}
              </Row>
            </div>
          </Fragment>
        );
      }
    }
  }
}
/*

*/
const mapStateToProps = state => {
  return {
    factSales: state.firestore.ordered.factSales,
    factPurchased: state.firestore.ordered.factPurchased,
    products: state.firestore.ordered.products
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getPurchasedOrder: () => dispatch(getPurchasedOrder()),
    getTransactionOrder: () => dispatch(getTransactionOrder()),
    getRestockOrder: () => dispatch(getRestockOrder()),
    deleteFactSales: id => dispatch(deleteFactSales(id))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([
    { collection: "factPurchased" },
    { collection: "factSales" },
    { collection: "products" }
  ])
)(Sales);

/*
import React, { Component, Fragment } from "react";
import { Col, Card, Row, Icon, Button, Tabs, Select, DatePicker } from "antd";
import _ from "lodash";
import DropperToCsv from "./component/DropperToCsv";
import { connect } from "react-redux";
import { getPurchasedOrder } from "../../../../redux/actions/purchasedActions";
import { getTransactionOrder } from "../../../../redux/actions/transactionActions";
import { getRestockOrder } from "../../../../redux/actions/restockActions";
import ValueCard from "./component/ValueCard";
import BarSeriesStackedCard from "./component/BarSeriesStackedCard";
import TableCard from "./component/TableCard";
import AreaSeriesCard from "./component/AreaSeriesCard";
import LineSeriesCard from "./component/LineSeriesCard";
import RadialChartCard from "./component/RadialChartCard";
class Sales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardLoading: true,
            spendPerProdPeriod: "alltime",
            transactionPerDistPeriod: "alltime",
            counterListPurchased: [],
            counterListResctock: [],
            counterListTransaction: [],
            counterPurchased: []
        };
    }

    render() {
        const { spendPeriod, transactionPeriod } = this.state;

        return (
            <Fragment>
                <div className="gutter-example">
                    <Row gutter={1}>
                        <Col className="gutter-row" sm={24} md={12}>
                            <Card title="Profit value">
                                <div>
                                    <ValueCard passedValue={spendPeriod} />
                                </div>
                            </Card>
                        </Col>
                        <Col className="gutter-row" sm={24} md={12}>
                            <Card title="Income value">
                                <div>
                                    <ValueCard
                                        passedValue={transactionPeriod}
                                    />
                                </div>
                            </Card>
                        </Col>
                        <Col className="gutter-row" sm={24} md={24} lg={24}>
                            <Card title="Profit Comparator">
                                <LineSeriesCard curve={"curveMonotoneX"} />
                            </Card>
                        </Col>

                        <Col className="gutter-row" sm={24} md={12}>
                            <Card title="Marketing spend per product">
                                <LineSeriesCard />
                            </Card>
                        </Col>
                        <Col className="gutter-row" sm={24} md={12}>
                            <Card title="Trend Product">
                                <AreaSeriesCard />
                            </Card>
                        </Col>
                        <Col className="gutter-row" sm={24} md={12}>
                            <Card title="Trend Product 1">
                                <RadialChartCard />
                            </Card>
                        </Col>
                        <Col className="gutter-row" sm={24} md={12}>
                            <Card title="Trend Product 2">
                                <AreaSeriesCard />
                            </Card>
                        </Col>
                        <Col className="gutter-row" sm={24} md={24} lg={24}>
                            <Card>
                                <DropperToCsv />
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        listPurchased: state.purchased.listPurchased,
        listTransaction: state.transaction.listTransaction,
        listRestock: state.restock.listRestock
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getPurchasedOrder: () => dispatch(getPurchasedOrder()),
        getTransactionOrder: () => dispatch(getTransactionOrder()),
        getRestockOrder: () => dispatch(getRestockOrder())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Sales);
*/
