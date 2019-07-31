import React, { Component } from "react";
import {
  Table,
  // Divider,
  Tag
} from "antd";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";
// import _ from "lodash";
class TableCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: "Invoice Date",
          dataIndex: "invoiceDate",
          key: "invoiceDate"
          //   render: text => <a href="javascript:;">{text}</a>
        },
        {
          title: "Distributor",
          dataIndex: "distributor",
          key: "distributor"
        },
        {
          title: "Product Name",
          dataIndex: "productName",
          key: "productName"
        },
        {
          title: "Buy Price",
          dataIndex: "buyPrice",
          key: "buyPrice"
        },
        {
          title: "Price Changes",
          key: "priceChanges",
          dataIndex: "priceChanges",
          render: item => {
            let color = item < 0 ? "red" : item > 0 ? "green" : "";
            return <Tag color={color}>{item * 100}%</Tag>;
          }
        }
      ]
    };
  }
  // componentDidUpdate(prevProps){
  //     const { passedValue,products,distributors } = this.props
  //     if (!_.isEqual(prevProps.distributors, distributors)) {
  //         let counterPurchased = passedValue.map(item=>{
  //             let counterDist = distributors.filter(
  //                 x => x.id === item.distId
  //             );
  //             let nameDist = counterDist[0].distributorName

  //             console.log(nameDist)
  //         })
  //     }
  //     if (!_.isEqual(prevProps.products, products)) {
  //         let counterPurchased = passedValue.map(item=>{
  //             let counterProduct = products.filter(
  //                 x => x.id === item.productId
  //             );
  //             let nameProduct = counterProduct[0].productName

  //             console.log(nameProduct)
  //         })
  //     }

  //     // console.log(passedValue)

  // }
  render() {
    const data = [];
    for (let i = 0; i < 6; i++) {
      let counterPrice = 50000;
      let counterPriceChange = 0;
      counterPrice =
        i % 2 === 0 ? counterPrice - i * 5000 : counterPrice + i * 5000;
      if (i === 0) {
        counterPriceChange = 0;
      } else {
        // console.log(counterPrice);
        counterPriceChange = parseFloat(
          Math.round(
            ((counterPrice - data[i - 1].buyPrice) / data[i - 1].buyPrice) * 100
          ) / 100
        ).toFixed(2);
        // console.log(Number(counterPriceChange));
      }
      data.push({
        key: i,
        invoiceDate: `1${i}/06/2019`,
        distributor: `John Brown ${i} `,
        productName: `Nabati`,
        buyPrice: counterPrice,
        priceChanges: counterPriceChange
      });
    }

    return (
      <React.Fragment>
        <div>
          <Table columns={this.state.columns} dataSource={data} />{" "}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.firestore.ordered.products,
    distributors: state.firestore.ordered.distributors
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "distributors" }, { collection: "products" }])
)(TableCard);
