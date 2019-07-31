import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Dashboard from "./components/dashboard/Dashboard";
import ProductList from "./components/products/ProductList";
import ProductDetails from "./components/products/ProductDetails";
import EmployeeList from "./components/employees/EmployeeList";
import EmployeeDetails from "./components/employees/EmployeeDetails";
import IncomingList from "./components/orders/incoming/IncomingList";
import IncomingDetails from "./components/orders/incoming/IncomingDetails";
import OutgoingList from "./components/orders/outgoing/OutgoingList";
import OutgoingDetails from "./components/orders/outgoing/OutgoingDetails";
import RestockOrder from "./components/orders/outgoing/RestockOrder";
import SalesReportList from "./components/sales-report/SalesReportList";
import SalesReportDetails from "./components/sales-report/SalesReportDetails";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Playground from "./components/playground";
import ErrorPage from "./components/errorPage";
import TransactionList from "./components/transactions/TransactionList";
import TransactionDetails from "./components/transactions/TransactionDetails";
import SellProducts from "./components/transactions/SellProducts";
import PurchasedList from "./components/orders/purchase/PurchasedList";
import PurchasedDetails from "./components/orders/purchase/PurchasedDetails";
import InputPurchased from "./components/orders/purchase/InputPurchased";
import EtlCard from "./components/dashboard/dashchild/tabs/component/EtlCard";

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { profile, auth } = this.props;

    return (
      <Switch>
        <Route
          exact
          path="/"
          render={props => {
            return <Dashboard auth={auth} profile={profile} {...props} />;
          }}
        />
        <Route
          exact
          path="/ETLCard"
          render={props => {
            return <EtlCard auth={auth} profile={profile} {...props} />;
          }}
        />
        <Route
          exact
          path="/products"
          render={props => {
            return <ProductList profile={profile} auth={auth} {...props} />;
          }}
        />
        <Route exact path="/products/:id" component={ProductDetails} />
        <Route
          exact
          path="/employees"
          render={props => {
            return <EmployeeList auth={auth} profile={profile} {...props} />;
          }}
        />
        <Route
          exact
          path="/employees/:id"
          render={props => {
            return <EmployeeDetails auth={auth} profile={profile} {...props} />;
          }}
        />
        <Route
          exact
          path="/orders/outgoing/"
          render={props => {
            return <OutgoingList auth={auth} profile={profile} {...props} />;
          }}
        />{" "}
        <Route
          exact
          path="/order-products/"
          render={props => {
            return <RestockOrder auth={auth} profile={profile} {...props} />;
          }}
        />
        <Route
          exact
          path="/orders/outgoing/:id"
          render={props => {
            return <OutgoingDetails auth={auth} profile={profile} {...props} />;
          }}
        />
        <Route
          exact
          path="/orders/incoming/"
          render={props => {
            return <IncomingList auth={auth} profile={profile} {...props} />;
          }}
        />
        <Route
          exact
          path="/orders/incoming/:id"
          render={props => {
            return <IncomingDetails auth={auth} profile={profile} {...props} />;
          }}
        />
        <Route
          exact
          path="/orders/purchased/"
          render={props => {
            return <PurchasedList auth={auth} profile={profile} {...props} />;
          }}
        />
        <Route
          exact
          path="/orders/purchased/:id"
          render={props => {
            return (
              <PurchasedDetails auth={auth} profile={profile} {...props} />
            );
          }}
        />
        <Route
          exact
          path="/purchased-order"
          render={props => {
            return <InputPurchased auth={auth} profile={profile} {...props} />;
          }}
        />
        <Route
          exact
          path="/sales-report/"
          render={props => {
            return <SalesReportList auth={auth} profile={profile} {...props} />;
          }}
        />
        <Route
          exact
          path="/sales-report/:id"
          render={props => {
            return (
              <SalesReportDetails auth={auth} profile={profile} {...props} />
            );
          }}
        />
        <Route
          exact
          path="/sell-products"
          render={props => {
            return <SellProducts auth={auth} profile={profile} {...props} />;
          }}
        />
        <Route
          exact
          path="/transactions"
          render={props => {
            return <TransactionList auth={auth} profile={profile} {...props} />;
          }}
        />
        <Route
          exact
          path="/transactions/:id"
          render={props => {
            return (
              <TransactionDetails auth={auth} profile={profile} {...props} />
            );
          }}
        />
        <Route
          exact
          path="/login"
          render={props => {
            return <SignIn auth={auth} {...props} />;
          }}
        />
        <Route
          exact
          path="/register"
          render={props => {
            return <SignUp auth={auth} profile={profile} {...props} />;
          }}
        />
        <Route
          exact
          path="/playground"
          render={() => {
            return <Playground />;
          }}
        />
        <Route component={ErrorPage} />
      </Switch>
    );
  }
}

export default Routes;
