import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { compose } from "redux";
import { Table, Button, Tag, Card, Modal, Icon } from "antd";
import { Redirect, Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import { updateStatusPurchased } from "../../../redux/actions/purchasedActions";
import {
  addNewProduct,
  changeProduct
} from "../../../redux/actions/productActions";
import { addNewDist } from "../../../redux/actions/distributorActions";

class PurchasedList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataValidation: []
    };
    this.columns = [
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: record => [
          record === "pending" ? (
            <Tag key="orange" color="orange">
              {" "}
              Pending
            </Tag>
          ) : record === "reject" ? (
            <Tag color="red" key="red">
              Rejected
            </Tag>
          ) : (
            <Tag key="green" color="green">
              {" "}
              Approved
            </Tag>
          )
        ]
      },
      {
        title: "Order ID",
        dataIndex: "id",
        key: "id"
        // render: text => <a href="javascript:;">{text}</a>
      },
      {
        title: "Created At",
        dataIndex: "createdAt",
        key: "createdAt",
        render: dataIndex => [moment(dataIndex.toDate()).calendar()]
      },
      {
        title: "Created By",
        dataIndex: "createdBy",
        key: "createdBy"
      }
    ];
    this.actionCollumn = [
      {
        title: "Action",
        dataIndex: "",
        key: "action",
        render: record => {
          const badge =
            record.status === "pending" ? (
              <div key="pending">
                <Button
                  onClick={this.handleStatus.bind(this, record.id, "approve")}
                  type="primary"
                  loading={this.state.loadCircle}
                >
                  Approve
                </Button>
                <Button
                  onClick={this.handleStatus.bind(this, record.id, "reject")}
                  type="danger"
                  loading={this.state.loadCircle}
                >
                  Reject
                </Button>
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
  async handleStatus(id, status) {
    const {
      profile,
      updateStatusPurchased,
      purchasedOrder,
      addNewProduct,
      changeProduct,
      addNewDist
    } = this.props;
    const pushed = {
      id: id,
      status: status,
      processedBy: profile.employeeName
    };
    const buttonStat = status === "reject" ? "danger" : "primary";
    const titleStat =
      status === "approve"
        ? "Do you want to approve this orders ?"
        : "Do you want to reject this orders ?";
    let counterOrder = purchasedOrder
      .filter(item => item.id.includes(id))
      .map(item => {
        return item;
      });
    let tempDist = counterOrder[0].distributor;
    let tempProf = counterOrder[0].createdBy;
    let tempOrder = counterOrder[0];
    let tempArr = { tempDist, tempProf };

    Modal.confirm({
      title: titleStat,
      okType: buttonStat,
      onOk() {
        updateStatusPurchased(pushed);
        if (!tempOrder.isExistDist) {
          addNewDist(tempArr);
        }
        tempOrder.purchasedList.map(item => {
          if (item.id === null) {
            addNewProduct(item, tempArr);
          } else {
            changeProduct(item, tempArr);
          }
          return 0;
        });
      },
      onCancel() {}
    });
  }
  render() {
    const { purchasedOrder, auth, profile } = this.props;
    const { columns, actionCollumn } = this;
    const restockTable =
      profile.role === "owner" ? columns.concat(actionCollumn) : columns;

    if (!auth.uid) return <Redirect to="/login" />;
    if (profile.role === "sales") return <Redirect to="/login" />;
    if (!purchasedOrder) {
      return (
        <div>
          <Icon type="loading" className="splash-loading" />
        </div>
      );
    }
    const paginations = purchasedOrder.length <= 10 ? false : "";
    return (
      <React.Fragment>
        <Card
          title="Purchased Order List"
          bordered={false}
          style={{ width: "100%" }}
          extra={
            <Link to="/purchased-order">
              <Button type="primary">Input Order</Button>
            </Link>
          }
        >
          {" "}
          <Table
            className="mobile-table"
            columns={restockTable}
            dataSource={purchasedOrder}
            scroll={{ x: "100%" }}
            pagination={paginations}
          />
        </Card>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    purchasedOrder: state.firestore.ordered.purchased,
    auth: state.firebase.auth
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updateStatusPurchased: order => dispatch(updateStatusPurchased(order)),
    addNewProduct: (product, item) => dispatch(addNewProduct(product, item)),
    changeProduct: (product, details) =>
      dispatch(changeProduct(product, details)),
    addNewDist: details => dispatch(addNewDist(details))
  };
};
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "purchased" }])
)(PurchasedList);
