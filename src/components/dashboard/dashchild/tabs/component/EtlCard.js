import React, { Component } from "react";
import { Row, Button } from "antd";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import {
  etlDimProducts,
  etlDimDistributors,
  etlDimTime,
  etlDimEmployees,
  etlFactPurchasing,
  etlFactSales
} from "../../../../../redux/actions/etlActions";
import moment from "moment";
class EtlCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  async handleCheck() {
    const {
      products,
      distributors,
      purchased,
      etlFactPurchasing,
      etlFactSales,
      transactions
      /* `users,
       etlDimProducts,
       etlDimDistributors,
       etlDimTime,
       etlDimEmployees,
      */
    } = this.props;
    /*==ETL PRODUCTS==
    products.map(item=>{
        etlDimProducts(item)
     })*/

    /*==ETL DISTRIBUTOR==
    distributors.map(item=>{
         etlDimDistributors(item)
     })*/

    /*==ETL WAKTU==
     purchased.map(item=>{
         let data={
             date:(JSON.stringify(moment(item.createdAt.toDate()).format('L'))).slice(4,6),
             month:(JSON.stringify(moment(item.createdAt.toDate()).format('L'))).slice(1,3),
             year:(JSON.stringify(moment(item.createdAt.toDate()).format('L'))).slice(7,11),
             id:((JSON.stringify(moment(item.createdAt.toDate()).format('L'))).slice(4,6)+(JSON.stringify(moment(item.createdAt.toDate()).format('L'))).slice(1,3)+(JSON.stringify(moment(item.createdAt.toDate()).format('L'))).slice(7,11)),

         }
         etlDimTime(data)
     })*/

    /*==ETL USER==
     users.map(item=>{
         etlDimEmployees(item)
     })*/

    /*===ETL FACT PURCHASED
    
            timeId: data.timeId,
            productId : data.productId,
            distId : data.distId,
            qty : data.qty,
            pricePerProduct : data.buyPrice,
            subtotal : data.subtotal
        */

    let i = 0;

    purchased.map(list => {
      if (list.status === "approve") {
        let counterTime =
          JSON.stringify(moment(list.createdAt.toDate()).format("L")).slice(
            4,
            6
          ) +
          JSON.stringify(moment(list.createdAt.toDate()).format("L")).slice(
            1,
            3
          ) +
          JSON.stringify(moment(list.createdAt.toDate()).format("L")).slice(
            7,
            11
          );
        let counterDist = distributors.filter(
          x => x.distributorName === list.distributor
        );

        list.purchasedList.map(item => {
          console.log(item.productName);
          let counterProduct = products.filter(
            x => x.productName === item.productName
          );
          let counterTotal = item.qty * item.buyPrice;

          let data = {
            id: list.id,
            productId: counterProduct[0].id,
            timeId: counterTime,
            distId: counterDist[0].id,
            qty: item.qty,
            pricePerProduct: item.buyPrice,
            subTotal: counterTotal
          };
          etlFactPurchasing(data);
          return 0;
        });
        i += 1;
        console.log(i);
        return 0;
      }
      return 0;
    });
    transactions.map(list => {
      if (list.status === "approve") {
        let counterTime =
          JSON.stringify(moment(list.createdAt.toDate()).format("L")).slice(
            4,
            6
          ) +
          JSON.stringify(moment(list.createdAt.toDate()).format("L")).slice(
            1,
            3
          ) +
          JSON.stringify(moment(list.createdAt.toDate()).format("L")).slice(
            7,
            11
          );

        list.buyList.map(item => {
          let counterProduct = products.filter(
            x => x.productName === item.productName
          );

          let data = {
            id: list.id,
            productId: counterProduct[0].id,
            timeId: counterTime,
            qty: item.qty,
            subTotal: item.prices
          };
          etlFactSales(data);
          return 0;
        });
      }
      return 0;
    });
    await setTimeout(() => {
      this.props.history.push("/");
    }, 3000);
  }

  render() {
    return (
      <React.Fragment>
        <div>
          data kosong, klik tombol dibawah untuk memasukkan data kedalam data
          warehouse
        </div>

        <Row>
          <Button onClick={this.handleCheck.bind(this)}>Process</Button>
        </Row>
      </React.Fragment>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    etlDimProducts: data => dispatch(etlDimProducts(data)),
    etlDimDistributors: data => dispatch(etlDimDistributors(data)),
    etlDimTime: data => dispatch(etlDimTime(data)),
    etlDimEmployees: data => dispatch(etlDimEmployees(data)),
    etlFactPurchasing: data => dispatch(etlFactPurchasing(data)),
    etlFactSales: data => dispatch(etlFactSales(data))
  };
};

const mapStateToProps = state => {
  return {
    products: state.firestore.ordered.products,
    purchased: state.firestore.ordered.purchased,
    users: state.firestore.ordered.users,
    transactions: state.firestore.ordered.transactions,
    distributors: state.firestore.ordered.distributors,
    factPurchased: state.firestore.ordered.factPurchased
  };
};
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([
    { collection: "products", orderBy: ["productName", "asc"] },
    { collection: "transactions" },
    { collection: "users" },
    { collection: "purchased" },
    { collection: "distributors" },
    { collection: "factPurchased" }
  ])
)(EtlCard);
