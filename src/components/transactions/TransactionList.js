import React, { Component } from "react";
import { Table, Button, Tag, Card, Icon } from "antd";
import { connect } from "react-redux";
import { compose } from "redux";
import { Redirect, Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";

class TransactionList extends Component {
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
  }

  render() {
    const { auth, profile, transactions } = this.props;
    const loading = !transactions ? true : false;
    if (!auth.uid) return <Redirect to="/login" />;
    if (profile.role !== "sales") return <Redirect to="/login" />;
    if (!transactions)
      return (
        <div>
          <Icon type="loading" className="splash-loading" />
        </div>
      );
    const paginations = transactions.length <= 10 ? false : "";
    const filteredTransactions =
      profile.role === "sales"
        ? transactions.filter(o => o.salesName === profile.employeeName)
        : transactions;

    return (
      <React.Fragment>
        <Card
          title="List Transactions"
          bordered={false}
          style={{ width: "100%" }}
          extra={
            <Link to="/sell-products">
              <Button type="primary">Sell Products</Button>
            </Link>
          }
        >
          <Table
            className="mobile-table"
            columns={this.columns}
            dataSource={filteredTransactions}
            scroll={{ x: "100%" }}
            loading={loading}
            pagination={paginations}
          />
        </Card>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    transactions: state.firestore.ordered.transactions
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "transactions" }])
)(TransactionList);
