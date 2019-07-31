import React, {
  Component
  // Fragment
} from "react";
import {
  // Col,
  Card,
  // Row,
  Icon,
  //   Button,
  Tabs
} from "antd";
// import _ from "lodash";
// import { connect } from "react-redux";
import Purchasing from "./tabs/Purchasing";
import Sales from "./tabs/Sales";
const { TabPane } = Tabs;

class Managerboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardLoading: true
    };
  }
  handleClick = () => {};
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        cardLoading: false
      });
    }, 1000);
  }
  render() {
    // const { factPurchase, factRestock, factTransaction } = this.props;
    const { cardLoading } = this.state;
    if (!cardLoading) {
      return (
        <React.Fragment>
          <div>
            <Card>
              <Tabs defaultActiveKey="1" style={{ zIndex: 0 }}>
                <TabPane tab="Purchasing" key="1">
                  <Purchasing />
                </TabPane>
                <TabPane tab="Sales" key="2">
                  <Sales />
                </TabPane>
              </Tabs>
            </Card>
            ,
          </div>
        </React.Fragment>
      );
    }

    return (
      <div>
        <Icon type="loading" className="splash-loading" />
      </div>
    );
  }
}

export default Managerboard;
