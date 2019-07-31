import React, { Component } from "react";
// import { Select, DatePicker } from "antd";
// const { Option } = Select;
// const { RangePicker, WeekPicker, MonthPicker } = DatePicker;

class ValueCard extends Component {
  constructor(props) {
    super(props);
    this.state = { counterPassed: "alltime" };
  }

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

  handleOption(value) {
    this.setState({
      counterPassed: value
    });
  }

  render() {
    const { passedValue } = this.props;
    // const { counterPassed } = this.state;
    // const valuePeriod =
    //     counterPassed === "alltime" ? (
    //         ""
    //     ) : counterPassed === "yearly" ? (
    //         <Select
    //             defaultValue="-"
    //             style={{ width: 120 }}
    //             onChange={this.handleChange.bind(this, counterPassed)}
    //         >
    //             {/* ini diisi sama mapping seluruh tahun */}

    //             <Option value="2019">2019</Option>
    //         </Select>
    //     ) : counterPassed === "monthly" ? (
    //         <MonthPicker
    //             onChange={this.handleChange.bind(this, counterPassed)}
    //         />
    //     ) : counterPassed === "weekly" ? (
    //         <WeekPicker
    //             onChange={this.handleChange.bind(this, counterPassed)}
    //         />
    //     ) : counterPassed === "byRange" ? (
    //         <RangePicker
    //             onChange={this.handleChange.bind(this, counterPassed)}
    //         />
    //     ) : (
    //         ""
    //     );
    return (
      <React.Fragment>
        {" "}
        <div>
          {/* <Select
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
                     */}
        </div>
        <div>
          <h1 style={{ marginTop: "8%" }}>{passedValue}</h1>
        </div>
      </React.Fragment>
    );
  }
}

export default ValueCard;
