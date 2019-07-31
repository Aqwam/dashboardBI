import React, { Component, Fragment } from "react";
import {
  Col,
  Card,
  Row,
  Icon,
  Button
  //  Tabs, Select, DatePicker
} from "antd";
// import _ from "lodash";
// import DropperToCsv from "./component/DropperToCsv";
import { getPurchasedOrder } from "../../../../redux/actions/purchasedActions";
import { getTransactionOrder } from "../../../../redux/actions/transactionActions";
import { getRestockOrder } from "../../../../redux/actions/restockActions";
import ValueCard from "./component/ValueCard";
import { Redirect } from "react-router-dom";
import BarSeriesStackedCard from "./component/BarSeriesStackedCard";
import BarSeries from "./component/BarSeriesCard";
// import TableCard from "./component/TableCard";
// import Uploader from "./component/Uploader";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import { deleteFactPurchasing } from "../../../../redux/actions/etlActions";
import { deleteFactSales } from "../../../../redux/actions/etlActions";

class Purchasing extends Component {
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
  componentDidMount() {}
  handleChecker = () => {
    const {
      deleteFactPurchasing,
      factPurchased,
      deleteFactSales,
      factSales
    } = this.props;
    factPurchased.forEach(item => deleteFactPurchasing(item.id));
    factSales.forEach(item => deleteFactSales(item.id));
  };
  render() {
    // const { spendPeriod, transactionPeriod } = this.state;

    const {
      factPurchased
      //  products
    } = this.props;
    if (!factPurchased) {
      return (
        <div>
          <Icon type="loading" className="splash-loading" />
        </div>
      );
    } else {
      if (factPurchased.length === 0) {
        return <Redirect to="/ETLCard" />;
      } else {
        let counterTrans = factPurchased.map(item => item.transactionId);
        let marketingTrans = [...new Set(counterTrans)].length;
        let counterTotal = factPurchased.map(item => item.subtotal);
        let marketingSpend = counterTotal.reduce((a, c) => {
          return a + c;
        });
        return (
          <Fragment>
            <div className="gutter-example">
              <Row gutter={1}>
                <Col className="gutter-row" sm={24} md={12}>
                  <Card title="Marketing Spend">
                    <div>
                      <ValueCard passedValue={marketingSpend} />
                    </div>
                  </Card>
                </Col>
                <Col className="gutter-row" sm={24} md={12}>
                  <Card title="Marketing transaction">
                    <div>
                      <ValueCard passedValue={marketingTrans} />
                    </div>
                  </Card>
                </Col>
                <Col className="gutter-row" sm={24} md={24}>
                  <Card title="Marketing spend per product">
                    <BarSeries
                      passedValue={factPurchased}
                      type={"purchasing"}
                    />
                  </Card>
                </Col>
                <Col className="gutter-row" sm={24} md={24}>
                  <Card title="Marketing transaction per distributor">
                    <BarSeriesStackedCard
                      passedValue={factPurchased}
                      type={"purchasing"}
                    />
                  </Card>
                </Col>
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
                <Col className="gutter-row" sm={24} md={24} lg={24}>
                  <Card title="Delete Data Warehouse">
                    <Button type="danger" onClick={this.handleChecker}>
                      Delete All fact table
                    </Button>
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
/*

*/
const mapStateToProps = state => {
  return {
    listPurchased: state.purchased.listPurchased,
    listTransaction: state.transaction.listTransaction,
    listRestock: state.restock.listRestock,
    factSales: state.firestore.ordered.factSales,
    factPurchased: state.firestore.ordered.factPurchased,
    distributors: state.firestore.ordered.distributors,
    products: state.firestore.ordered.products
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getPurchasedOrder: () => dispatch(getPurchasedOrder()),
    getTransactionOrder: () => dispatch(getTransactionOrder()),
    getRestockOrder: () => dispatch(getRestockOrder()),
    deleteFactPurchasing: id => dispatch(deleteFactPurchasing(id)),
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
    { collection: "products" },
    { collection: "distributors" }
  ])
)(Purchasing);
