import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { compose } from "redux";
import { Table, Button, Tag, Card, Modal, Icon } from "antd";
import { Redirect, Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import { updateStatusRestock } from "../../../redux/actions/restockActions";

class OutgoingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataValidation: []
    };
    this.columns = [
      {
        title: "status",
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
    const { profile, updateStatusRestock } = this.props;
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
    Modal.confirm({
      title: titleStat,
      okType: buttonStat,
      onOk() {
        updateStatusRestock(pushed);
      },
      onCancel() {}
    });
  }
  render() {
    const { restockOrders, auth, profile } = this.props;
    const { columns, actionCollumn } = this;
    const restockTable =
      profile.role === "owner" ? columns.concat(actionCollumn) : columns;

    if (!auth.uid) return <Redirect to="/login" />;
    if (profile.role === "sales") return <Redirect to="/login" />;
    if (!restockOrders) {
      return (
        <div>
          <Icon type="loading" className="splash-loading" />
        </div>
      );
    }
    const paginations = restockOrders.length <= 10 ? false : "";
    return (
      <React.Fragment>
        <Card
          title="Restock Order List"
          bordered={false}
          style={{ width: "100%" }}
          extra={
            <Link to="/order-products">
              <Button type="primary">Create Order</Button>
            </Link>
          }
        >
          {" "}
          <Table
            className="mobile-table"
            columns={restockTable}
            dataSource={restockOrders}
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
    restockOrders: state.firestore.ordered.restocks,
    auth: state.firebase.auth
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updateStatusRestock: order => dispatch(updateStatusRestock(order))
  };
};
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "restocks" }])
)(OutgoingList);
