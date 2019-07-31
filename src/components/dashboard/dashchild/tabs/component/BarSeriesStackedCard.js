import React, { Component } from "react";
import {
  Icon,
  //  Select, DatePicker,
  Row,
  Col
} from "antd";
import {
  // XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  // DiscreteColorLegend,
  FlexibleXYPlot
} from "react-vis";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import _ from "lodash";

// const { Option } = Select;
// const { RangePicker, WeekPicker, MonthPicker } = DatePicker;

class BarSeriesStacked extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counterPurchased: []
    };
  }
  componentDidMount() {
    const { distributors, passedValue, products, type } = this.props;
    if (distributors) {
      if (type === "purchasing") {
        // console.log(passedValue)
        let counterData = passedValue.map(item => {
          let counterDist = distributors.filter(x => x.id === item.distId);
          // console.log(counterDist)
          let counterName = counterDist[0].distributorName;
          return {
            name: counterName,
            id: item.transactionId
          };
        });
        let unique = [...new Set(counterData.map(item => item.id))].sort();

        for (let i = 0; i < unique.length; i++) {
          let counter = {};
          let counterInside = counterData.filter(item => item.id === unique[i]);
          let wadah = counterInside[0].name;
          counter = {
            title: unique[i],
            data: [{ y: 1, x: wadah }],
            color:
              "#" +
              (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6),
            disabled: false
          };
          unique[i] = { ...counter };
        }
        this.setState({
          counterPurchased: unique
        });
      }
      if (type === "sales") {
        let counterData = passedValue.map(item => {
          console.log(passedValue);
          let counterProduct = products.filter(x => x.id === item.productId);
          let counterName = counterProduct[0].productName;
          return {
            name: counterName,
            subtotal: item.subtotal,
            week: item.timeId
          };
        });
        let unique = [...new Set(counterData.map(item => item.week))].sort();
        for (let i = 0; i < unique.length; i++) {
          let counter = {};
          let counterInside = counterData
            .filter(item => item.week === unique[i])
            .map(item => {
              return { y: item.subtotal, x: item.name };
            });
          counter = {
            title: unique[i],
            data: counterInside,
            color:
              "#" +
              (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6),
            disabled: false
          };
          unique[i] = { ...counter };
        }
        this.setState({
          counterPurchased: unique
        });
      }
    }
  }
  componentDidUpdate(prevProps) {
    const { distributors, passedValue, products, type } = this.props;
    if (type === "purchasing") {
      if (!_.isEqual(prevProps.distributors, distributors)) {
        // console.log(passedValue)
        let counterData = passedValue.map(item => {
          let counterDist = distributors.filter(x => x.id === item.distId);
          // console.log(counterDist)
          let counterName = counterDist[0].distributorName;
          return {
            name: counterName,
            id: item.transactionId
          };
        });
        let unique = [...new Set(counterData.map(item => item.id))].sort();

        for (let i = 0; i < unique.length; i++) {
          let counter = {};
          let counterInside = counterData.filter(item => item.id === unique[i]);
          let wadah = counterInside[0].name;
          counter = {
            title: unique[i],
            data: [{ y: 1, x: wadah }],
            color:
              "#" +
              (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6),
            disabled: false
          };
          unique[i] = { ...counter };
        }
        this.setState({
          counterPurchased: unique
        });
      }
    }
    if (type === "sales") {
      if (!_.isEqual(prevProps.products, products)) {
        let counterData = passedValue.map(item => {
          console.log(passedValue);
          let counterProduct = products.filter(x => x.id === item.productId);
          let counterName = counterProduct[0].productName;
          return {
            name: counterName,
            subtotal: item.subtotal,
            week: item.timeId
          };
        });
        let unique = [...new Set(counterData.map(item => item.week))].sort();
        for (let i = 0; i < unique.length; i++) {
          let counter = {};
          let counterInside = counterData
            .filter(item => item.week === unique[i])
            .map(item => {
              return { y: item.subtotal, x: item.name };
            });
          counter = {
            title: unique[i],
            data: counterInside,
            color:
              "#" +
              (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6),
            disabled: false
          };
          unique[i] = { ...counter };
        }
        this.setState({
          counterPurchased: unique
        });
      }
    }
  }
  handleClickLegend = item => {
    const { counterPurchased } = this.state;
    item.disabled = !item.disabled;
    this.setState({
      counterPurchased
    });
  };

  // handleChange(type, value) {
  //     //value udah berupa moment , tinggal lanjut fungsi , cek aja value di proto
  //     if (type === "monthly") {
  //         let counterYear = value.year();
  //         let counterMonth = value.month();
  //         console.log(counterYear, counterMonth);
  //         //disini udah dapet year sama month, tinggal diurus
  //     }
  //     if (type === "weekly") {
  //         let counterYear = value.year();
  //         let counterWeek = value.week();
  //         console.log(counterYear, counterWeek);
  //         //disini udah dapet year sama week, tinggal diurus
  //     }
  //     if (type === "byRange") {
  //         let counterStart = value[0].toObject();
  //         let counterFinish = value[1].toObject();
  //         console.log(counterStart, counterFinish);
  //     }
  //     console.log(type, value);
  // }

  // handleOption(value) {
  //     this.setState({
  //         counterPassed: value
  //     });
  // }

  render() {
    const { counterPurchased } = this.state;
    const {
      distributors,
      products
      // passedValue
    } = this.props;
    /*  const valuePeriod =
            counterPassed === "alltime" ? (
                ""
            ) : counterPassed === "yearly" ? (
                <Select
                    defaultValue="-"
                    style={{ width: 120 }}
                    onChange={this.handleChange.bind(this, counterPassed)}
                >
                    {/* ini diisi sama mapping seluruh tahun 

                    <Option value="2019">2019</Option>
                </Select>
            ) : counterPassed === "monthly" ? (
                <MonthPicker
                    onChange={this.handleChange.bind(this, counterPassed)}
                />
            ) : counterPassed === "weekly" ? (
                <WeekPicker
                    onChange={this.handleChange.bind(this, counterPassed)}
                />
            ) : counterPassed === "byRange" ? (
                <RangePicker
                    onChange={this.handleChange.bind(this, counterPassed)}
                />
            ) : (
                ""
             );
             */

    if (!counterPurchased && !distributors && !products) {
      return (
        <div>
          <Icon type="loading" className="splash-loading" />
        </div>
      );
    } else {
      return (
        <React.Fragment>
          {/*<Row style={{ marginBottom: "10%" }}>
                     <Select
                        onChange={this.handleOption.bind(this)}
                        defaultValue="All Periode"
                        style={{
                            width: 120,
                            marginBottom: "5%"
                        }}
                        className="content-right"
                    >
                        <Option value="alltime">All Periode</Option>
                        <Option value="yearly">Yearly</Option>
                        <Option value="monthly">Monthly</Option>
                        <Option value="weekly">Weekly</Option>
                        <Option value="byRange">By range</Option>
                    </Select>
                    <br />
                    <div className="content-right" style={{ marginTop: "3%" }}>
                        {" "}
                        {valuePeriod}
                    </div>
                    <br /> 
                </Row>*/}

          <Row>
            <Col style={{ height: "300px" }}>
              {" "}
              <FlexibleXYPlot
                className="clustered-stacked-bar-chart-example content-center"
                xType="ordinal"
                stackBy="y"
              >
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
                {counterPurchased.map(item => {
                  return item.disabled ? null : (
                    <VerticalBarSeries
                      key={item.title}
                      color={item.color}
                      data={item.data}
                    />
                  );
                })}
              </FlexibleXYPlot>
            </Col>
            {/* <Col>
                            <DiscreteColorLegend
                                orientation="horizontal"
                                width={300}
                                items={counterPurchased}
                                className="content-center"
                                onItemClick={this.handleClickLegend}
                            />
                        </Col> */}
          </Row>
        </React.Fragment>
      );
    }
  }
}
const mapStateToProps = state => {
  return {
    distributors: state.firestore.ordered.distributors,
    products: state.firestore.ordered.products
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
)(BarSeriesStacked);
