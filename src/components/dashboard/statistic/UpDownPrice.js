import React, { Component } from "react";
import {
  Table
  // Button, Card
} from "antd";

import { connect } from "react-redux";
import { compose } from "redux";
// import { Redirect } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
class UpDownPrice extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.columns = [
      {
        title: "Product Name",
        dataIndex: "productName",
        key: "productName "
        // render: text => <a href="javascript:;">{text}</a>
      },
      {
        title: "Distributor",
        dataIndex: "distributor",
        key: "distributor"
      },
      {
        title: "Stock",
        dataIndex: "stock",
        key: "stock"
      }
    ];
  }
  render() {
    const {
      products
      // auth, profile
    } = this.props;
    const loading = !products ? true : false;
    return (
      <React.Fragment>
        <Table
          className="mobile-table"
          columns={this.columns}
          dataSource={products}
          scroll={{ x: "100%" }}
          loading={loading}
          pagination={false}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.firestore.ordered.products
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "products" }])
)(UpDownPrice);
