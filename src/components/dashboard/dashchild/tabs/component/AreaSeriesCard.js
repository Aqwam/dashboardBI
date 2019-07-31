import React, { Component } from "react";
import { Select, DatePicker, Row, Col } from "antd";
import {
  //   XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  AreaSeries,
  DiscreteColorLegend,
  Hint,
  FlexibleXYPlot
} from "react-vis";

const { Option } = Select;
const { RangePicker, WeekPicker, MonthPicker } = DatePicker;

class AreaSeriesCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: false,
      counterPurchased: [],
      counterPassed: "alltime",
      contoh: [
        { name: "Nabati", qty: 51, week: 1 },
        { name: "Beng beng", qty: 42, week: 1 },
        { name: "Nabati", qty: 32, week: 1 },
        { name: "Richoco", qty: 44, week: 1 },
        { name: "Richoco", qty: 44, week: 1 },
        { name: "Richoco", qty: 44, week: 1 },
        { name: "Nabati", qty: 13, week: 2 },
        { name: "Nabati", qty: 15, week: 2 },
        { name: "Nabati", qty: 11, week: 2 },
        { name: "Beng beng", qty: 22, week: 2 },
        { name: "Richoco", qty: 43, week: 2 },
        { name: "Beng beng", qty: 21, week: 3 },
        { name: "Richoco", qty: 36, week: 3 },
        { name: "Beng beng", qty: 45, week: 3 },
        { name: "Richoco", qty: 32, week: 3 },
        { name: "Nabati", qty: 10, week: 3 }
      ],
      legendItems: [
        { title: "Nabati", color: "yellow" },
        { title: "Beng - Beng", color: "red" },
        { title: "Richoco", color: "brown" }
      ]
    };
  }
  componentDidMount() {
    const { contoh } = this.state;
    let unique = [...new Set(contoh.map(item => item.name))].sort();
    for (let i = 0; i < unique.length; i++) {
      let counter = {};
      let counterInside = contoh
        .filter(item => item.name === unique[i])
        .map(item => {
          return { y: item.qty, x: item.week };
        });
      let wadah = [...counterInside];
      for (let j = 0; j < wadah.length - 1; j++) {
        let k = j + 1;
        let notDupe = false;
        while (k < wadah.length && !notDupe) {
          if (wadah[j].x === wadah[k].x) {
            wadah[j].y = wadah[j].y + wadah[k].y;
            wadah.splice(k, 1);
          } else {
            notDupe = true;
          }
        }
      }

      counter = {
        title: unique[i],
        data: wadah,
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
  handleClickLegend = item => {
    const { counterPurchased } = this.state;
    item.disabled = !item.disabled;
    this.setState({
      counterPurchased
    });
  };

  handleChange(type, value) {
    //value udah berupa moment , tinggal lanjut fungsi , cek aja value di proto
    if (type === "monthly") {
      let counterYear = value.year();
      let counterMonth = value.month();
      console.log(counterYear, counterMonth);
      //disini udah dapet year sama month, tinggal diurus
    }
    if (type === "weekly") {
      let counterYear = value.year();
      let counterWeek = value.week();
      console.log(counterYear, counterWeek);
      //disini udah dapet year sama week, tinggal diurus
    }
    if (type === "byRange") {
      let counterStart = value[0].toObject();
      let counterFinish = value[1].toObject();
      console.log(counterStart, counterFinish);
    }
    console.log(type, value);
  }

  handleOption(value) {
    this.setState({
      counterPassed: value
    });
  }

  render() {
    const { counterPassed, counterPurchased, hovered } = this.state;
    const valuePeriod =
      counterPassed === "alltime" ? (
        ""
      ) : counterPassed === "yearly" ? (
        <Select
          defaultValue="-"
          style={{ width: 120 }}
          onChange={this.handleChange.bind(this, counterPassed)}
        >
          {/* ini diisi sama mapping seluruh tahun */}

          <Option value="2019">2019</Option>
        </Select>
      ) : counterPassed === "monthly" ? (
        <MonthPicker onChange={this.handleChange.bind(this, counterPassed)} />
      ) : counterPassed === "weekly" ? (
        <WeekPicker onChange={this.handleChange.bind(this, counterPassed)} />
      ) : counterPassed === "byRange" ? (
        <RangePicker onChange={this.handleChange.bind(this, counterPassed)} />
      ) : (
        ""
      );
    return (
      <React.Fragment>
        {" "}
        <Row style={{ marginBottom: "10%" }}>
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
        </Row>
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
                  <AreaSeries
                    curve={"curveNatural"}
                    key={item.title}
                    color={item.color}
                    data={item.data}
                  />
                );
              })}
              {hovered && <Hint value={hovered} />}
            </FlexibleXYPlot>
          </Col>
          <Col>
            <DiscreteColorLegend
              orientation="horizontal"
              width={300}
              items={counterPurchased}
              className="content-center"
              onItemClick={this.handleClickLegend}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default AreaSeriesCard;
