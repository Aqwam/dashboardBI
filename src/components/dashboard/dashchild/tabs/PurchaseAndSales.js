import React, { Component, Fragment } from "react";
import {
  Col,
  Card,
  Row,
  // Icon, Tabs,
  Button
} from "antd";
import _ from "lodash";
import DropperToCsv from "./component/DropperToCsv";
import { connect } from "react-redux";
import { getPurchasedOrder } from "../../../../redux/actions/purchasedActions";
import { getTransactionOrder } from "../../../../redux/actions/transactionActions";
import { getRestockOrder } from "../../../../redux/actions/restockActions";

class PurchaseAndSales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardLoading: true,
      counterListPurchased: [],
      counterListResctock: [],
      counterListTransaction: []
    };
  }
  componentDidMount() {
    const {
      getPurchasedOrder,
      getRestockOrder,
      getTransactionOrder
    } = this.props;
    getPurchasedOrder();
    getTransactionOrder();
    getRestockOrder();

    setTimeout(() => {
      this.setState({
        cardLoading: false
      });
    }, 1000);
  }
  componentDidUpdate(prevProps, prevState) {
    const {
      listPurchased,
      listRestock,
      listTransaction,
      getPurchasedOrder,
      getRestockOrder,
      getTransactionOrder
    } = this.props;
    const {
      counterListPurchased,
      counterListResctock,
      counterListTransaction
    } = this.state;
    if (!_.isEqual(prevProps.listPurchased, listPurchased)) {
      getPurchasedOrder();
      if (counterListPurchased.length === 0) {
        let newListPurchased = [];
        newListPurchased = listPurchased.slice(0);
        this.setState({
          counterListPurchased: newListPurchased
        });
      }
    }
    if (!_.isEqual(prevProps.listRestock, listRestock)) {
      getRestockOrder();
      if (counterListResctock.length === 0) {
        let newListRestock = [];
        newListRestock = listRestock.slice(0);
        this.setState({
          counterListResctock: newListRestock
        });
      }
    }
    if (!_.isEqual(prevProps.listTransaction, listTransaction)) {
      getTransactionOrder();
      if (counterListTransaction.length === 0) {
        let newListTransaction = [];
        newListTransaction = listTransaction.slice(0);
        this.setState({
          counterListTransaction: newListTransaction
        });
      }
    }
  }
  handleClick = () => {};
  render() {
    // const { listPurchased, listTransaction } = this.props;

    return (
      <Fragment>
        <div className="gutter-example">
          <Button onClick={this.handleClick} />
          <Row gutter={1}>
            <Col className="gutter-row" sm={24} md={12}>
              <Card title="Profits">
                <div>ini profit</div>
              </Card>
            </Col>
            <Col className="gutter-row" sm={24} md={12}>
              <Card title="Daily Income">
                <div>Ini incomes</div>
              </Card>
            </Col>
            <Col className="gutter-row" sm={24} md={24} lg={24}>
              <Card title="Up/ Down Price">
                <div>ini apa hayo</div>
              </Card>
            </Col>
            <Col className="gutter-row" sm={24} md={24} lg={24}>
              <Card title="Lowest Stock List">
                <div className="gutter-box">LowestStock</div>
              </Card>
            </Col>
            <Col className="gutter-row" sm={24} md={24} lg={24}>
              <Card>
                <div className="gutter-box">list expire</div>
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
)(PurchaseAndSales);
