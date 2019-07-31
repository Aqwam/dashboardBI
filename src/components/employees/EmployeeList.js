import React, { Component } from "react";
import { Table, Button, Card } from "antd";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import moment from "moment";
import { firestoreConnect } from "react-redux-firebase";

class EmployeeList extends Component {
  constructor(props) {
    super(props);
    this.state = { innerLoading: true };

    this.columns = [
      {
        title: "Employee Name",
        dataIndex: "employeeName",
        key: " employeeName "
        // render: text => <a href="javascript:;">{text}</a>
      },
      {
        title: "Employee Role",
        dataIndex: "role",
        key: "role"
      },
      {
        title: "Joined Since",
        dataIndex: "joinedAt",
        key: "joinedAt",
        render: dataIndex => [moment(dataIndex.toDate()).calendar()]
      }
      // {
      //     title: "Action",
      //     dataIndex: "_id",
      //     key: "action",
      //     render: () => [
      //         <span key="action">
      //             <Button type="primary">Edit</Button>
      //             <Button type="danger">Delete</Button>
      //         </span>
      //     ]
      // }
    ];
  }

  render() {
    const { employees, auth } = this.props;
    const loading = !employees
      ? true
      : employees.length === 1
      ? this.state.innerLoading
      : false;

    if (!auth.uid) return <Redirect to="/login" />;
    return (
      <React.Fragment>
        <Card
          title="Employee List"
          bordered={false}
          style={{ width: "100%" }}
          extra={
            <Link to="/register">
              <Button type="primary">Add New Employee</Button>
            </Link>
          }
        >
          {" "}
          <Table
            className="mobile-table"
            columns={this.columns}
            dataSource={employees}
            scroll={{ x: "100%" }}
            loading={loading}
          />
        </Card>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    employees: state.firestore.ordered.users,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(
    mapStateToProps,
    null
  ),
  firestoreConnect([{ collection: "users" }])
)(EmployeeList);
