import React, { Component } from "react";
import { Table, Button, Tag, Card } from "antd";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
const data = [];
for (let i = 0; i < 21; i++) {
  data.push({
    key: i,
    transactionId: "kasmfams" + i,
    status: `Pending`,
    transactionDate: "29-Mar-2015",
    employeeName: "Dimas azka",
    clientName: "Ziyan Marzuq"
  });
}
class SalesReportList extends Component {
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
          record === "Pending" ? (
            <Tag key="status" color="orange">
              {" "}
              Pending
            </Tag>
          ) : record === "Rejected" ? (
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
        dataIndex: "transactionId",
        key: "transactionId"
        // render: text => <a href="javascript:;">{text}</a>
      },
      {
        title: "Transaction date",
        dataIndex: "transactionDate",
        key: "transactionDate"
      },
      {
        title: "Employee Name",
        dataIndex: "employeeName",
        key: "employeeName"
      },
      {
        title: "Client Name",
        dataIndex: "clientName",
        key: "clientName"
      },
      {
        title: "Action",
        dataIndex: "",
        key: "action",
        render: record => [
          record.status === "Pending" ? (
            <div key="Pending">
              <Button type="primary">Approve</Button>
              <Button type="danger">Reject</Button>
            </div>
          ) : record.status === "Rejected" ? (
            <Button key="Rejected" type="primary" disabled>
              Rejected
            </Button>
          ) : (
            <Button key="Approved" type="primary" disabled>
              Approved
            </Button>
          )
        ]
      }
    ];
  }

  render() {
    const { salesReports, auth } = this.props;
    if (!auth.uid) return <Redirect to="/login" />;
    return (
      <React.Fragment>
        <Card title="Sales Report" bordered={false} style={{ width: "100%" }}>
          {" "}
          <Table
            className="mobile-table"
            columns={this.columns}
            dataSource={salesReports}
            scroll={{ x: "100%" }}
          />
        </Card>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    salesReports: state.salesReport.salesReports,
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(SalesReportList);
