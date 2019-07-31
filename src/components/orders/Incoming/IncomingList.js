import React, { Component, Fragment } from "react";
import { Table, Button, Tag, Card, Icon, Modal } from "antd";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  Redirect
  // Link
} from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import _ from "lodash";
import {
  updateStatusTransaction,
  getTransaction,
  rejectTransaction
} from "../../../redux/actions/transactionActions";
import {
  getProduct,
  updateStockProduct
} from "../../../redux/actions/productActions";

// const confirm = Modal.confirm;
class IncomingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataValidation: [],
      loadCircle: false,
      tempTransaction: null,
      tempId: null,
      tempStatus: null,
      visibleModal: false,
      tempProd: null
    };
    this.columns = [
      {
        title: "status",
        dataIndex: "status",
        key: "status",
        render: record => [
          record === "pending" ? (
            <Tag key="status" color="orange">
              {" "}
              Pending
            </Tag>
          ) : record === "reject" ? (
            <Tag key="status" color="red">
              Rejected
            </Tag>
          ) : (
            <Tag key="status" color="green">
              {" "}
              Approved
            </Tag>
          )
        ]
      },
      {
        title: "Transaction ID",
        dataIndex: "id",
        key: "id"
        // render: text => <a href="javascript:;">{text}</a>
      },
      // {
      //     title: "Transaction date",
      //     dataIndex: "",
      //     key: "key"
      // },
      {
        title: "Sales Name",
        dataIndex: "salesName",
        key: "salesName"
      },
      {
        title: "Client Name",
        dataIndex: "clientName",
        key: "clientName"
      }
    ];
    this.processedCollumn = [
      {
        title: "Processed By",
        dataIndex: "processedBy",
        key: "processedBy"
      }
    ];
    this.actionCollumn = [
      {
        title: "Action",
        dataIndex: "",
        key: "action",
        render: record => {
          const { tempTransaction, visibleModal } = this.state;
          const links = tempTransaction === null ? "kosong" : "Are you sure ?";
          const badge =
            record.status === "pending" ? (
              <div key="pending">
                <Button
                  onClick={this.showModal.bind(this, record.id, "approve")}
                  // onClick={this.handleStatus.bind(
                  //     this,
                  //     record.id,
                  //     "approve"
                  // )}
                  type="primary"
                  loading={this.state.loadCircle}
                >
                  Approve
                </Button>
                <Button
                  onClick={this.showModal.bind(this, record.id, "reject")}
                  type="danger"
                  loading={this.state.loadCircle}
                >
                  Reject
                </Button>
                <Modal
                  visible={visibleModal}
                  onOk={this.handleOk.bind(this, record.id)}
                  onCancel={this.handleCancel.bind(this)}
                >
                  <div>{links}</div>
                </Modal>
              </div>
            ) : record.status === "reject" ? (
              <Button key="reject" type="primary" disabled>
                Rejected
              </Button>
            ) : (
              <Button key="approve" type="primary" disabled>
                Approved
              </Button>
            );
          return <div>{badge}</div>;
        }
      }
    ];
  }
  async componentDidUpdate(prevProps, prevState) {
    const { selectedTransaction, getTransaction } = this.props;
    const {
      // tempTransaction,
      tempId
    } = this.state;
    if (!_.isEqual(prevProps.selectedTransaction, selectedTransaction)) {
      getTransaction(tempId);
      if (selectedTransaction !== null) {
        this.setState({
          tempTransaction: selectedTransaction
        });
      }
    }
  }

  async showModal(id, status) {
    // const { visibleModal, tempTransaction } = this.state;
    const {
      getTransaction
      //  selectedTransaction
    } = this.props;
    this.setState({ loadCircle: true, tempStatus: status, tempId: id });
    getTransaction(id);
    await setTimeout(() => {
      this.setState({
        visibleModal: true,
        loadCircle: false
      });
    }, 1000);
  }
  async handleOk() {
    const { tempTransaction, tempStatus, tempId } = this.state;
    const { profile, updateStatusTransaction, rejectTransaction } = this.props;
    const pushed = {
      id: tempId,
      status: tempStatus,
      employeeName: profile.employeeName,
      employeeRole: profile.employeeRole
    };
    this.setState({ visibleModal: false });
    console.log(tempTransaction);
    if (tempStatus === "reject") {
      tempTransaction.buyList.map(item => {
        let counterProduct = {
          id: item.productId,
          stock: item.qty
        };
        rejectTransaction(counterProduct);
        updateStatusTransaction(pushed);
        return 0;
      });
    }
    if (tempStatus === "approve") {
      updateStatusTransaction(pushed);
    }
  }
  async handleCancel() {
    const { tempTransaction } = this.state;
    this.setState({ visibleModal: false });
    tempTransaction.buyList.map(item => {
      console.log("ini id:", item.productId, "ini qty:", item.qty);
      return 0;
    });
  }
  handleStatus = (e, k) => {
    const { profile, updateStatusTransaction, getTransaction } = this.props;
    const pushed = {
      id: e,
      status: k,
      employeeName: profile.employeeName,
      employeeRole: profile.role
    };
    this.setState({
      loadCircle: true,
      tempId: e
    });
    updateStatusTransaction(pushed);
    getTransaction(e);

    setTimeout(() => {
      this.setState({
        loadCircle: false
      });
    }, 1000);
  };

  render() {
    const { auth, profile, transactions } = this.props;
    const loading = !transactions ? true : false;
    const ownerCollumns = this.columns.concat(this.processedCollumn);
    const warehouseCollumns = this.columns.concat(this.actionCollumn);
    const columns =
      profile.role === "owner" ? ownerCollumns : warehouseCollumns;
    if (!auth.uid) return <Redirect to="/login" />;
    if (profile.role === "sales") return <Redirect to="/login" />;
    if (!transactions)
      return (
        <div>
          <Icon type="loading" className="splash-loading" />
        </div>
      );
    const paginations = transactions.length <= 10 ? false : "";

    return (
      <Fragment>
        <Card
          title="List Transactions"
          bordered={false}
          style={{ width: "100%" }}
        >
          <Table
            className="mobile-table"
            columns={columns}
            dataSource={transactions}
            scroll={{ x: "100%" }}
            loading={loading}
            pagination={paginations}
          />
        </Card>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    transactions: state.firestore.ordered.transactions,
    selectedTransaction: state.transaction.transaction,
    selectedProduct: state.product.product
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateStatusTransaction: transaction =>
      dispatch(updateStatusTransaction(transaction)),
    updateStockProduct: id => dispatch(updateStockProduct(id)),
    getTransaction: id => dispatch(getTransaction(id)),
    getProduct: id => dispatch(getProduct(id)),
    rejectTransaction: product => dispatch(rejectTransaction(product))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "transactions" }])
)(IncomingList);
