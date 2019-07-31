import React, { Component, Fragment } from "react";
import { Row, Col } from "antd";
import {
  //XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  LineMarkSeries,
  DiscreteColorLegend,
  Hint,
  FlexibleXYPlot
} from "react-vis";
class LineSeriesCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: false,
      counterSales: [],
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
    const {
      contoh
      // hovered
    } = this.state;
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
      counterSales: unique
    });
  }
  handleClickLegend = item => {
    const { counterSales } = this.state;
    item.disabled = !item.disabled;
    this.setState({
      counterSales
    });
  };
  render() {
    const { counterSales, hovered } = this.state;
    return (
      <Fragment>
        <div>
          <Row>
            <Col style={{ height: "300px" }}>
              {" "}
              <FlexibleXYPlot className="content-center">
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
                {counterSales.map(item => {
                  return item.disabled ? null : (
                    <LineMarkSeries
                      strokeWidth={2}
                      curve={this.props.curve}
                      onValueMouseOver={d => {
                        this.setState({
                          hovered: d
                        });
                      }}
                      onValueMouseOut={d => {
                        this.setState({
                          hovered: false
                        });
                      }}
                      markStyle={{ fill: item.color }}
                      key={item.title}
                      color={item.color}
                      style={{ fill: "none" }}
                      data={item.data}
                    />
                  );
                })}
                {hovered && <Hint value={hovered} />}
                {/* <LineMarkSeries
                                style={{ fill: "none" }}
                                markStyle={{ fill: "blue" }}
                                color={"red"}
                                stroke={"red"}
                                curve={"curveMonotoneX"}
                                data={[
                                    { x: 1, y: 11 },
                                    { x: 1.5, y: 29 },
                                    { x: 3, y: 7 }
                                ]}
                            /> */}
              </FlexibleXYPlot>
            </Col>
            <Col>
              <DiscreteColorLegend
                orientation="horizontal"
                width={300}
                items={counterSales}
                className="content-center"
                onItemClick={this.handleClickLegend}
              />
            </Col>
          </Row>
        </div>
      </Fragment>
    );
  }
}

export default LineSeriesCard;
