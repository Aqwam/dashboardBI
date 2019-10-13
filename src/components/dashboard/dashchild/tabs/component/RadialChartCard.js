import React, { Component } from "react";
import { Row, Col } from "antd";
import { DiscreteColorLegend, RadialChart } from "react-vis";

class RadialChartCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: false,
      counterChart: []
    };
  }
  componentDidMount() {
    const { type, data } = this.props;
    if (type === "trendParticle") {
      let unique = [...new Set(data.map(item => item.jk))].sort(); //ini buat ngeklasifikasiin jenis
      for (let i = 0; i < unique.length; i++) {
        let counter = 0;
        data.map(item => {
          if (item.jk === unique[i]) {
            counter = counter + 1;
          }
        });
        let wadah = {
          title: unique[i],
          angle: counter,
          color:
            "#" +
            (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6),
          disabled: false
        };
        unique[i] = { ...wadah };
      }
      this.setState({ counterChart: unique });
    }
    if (type === "demografiPendidikan") {
      let unique = [...new Set(data.map(item => item.pendidikan))].sort();
      console.log(unique);
      for (let i = 0; i < unique.length; i++) {
        let counter = 0;
        data.map(item => {
          if (item.pendidikan === unique[i]) {
            counter = counter + 1;
          }
        });
        let wadah = {
          title: unique[i],
          angle: counter,
          color:
            "#" +
            (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6),
          disabled: false
        };
        unique[i] = { ...wadah };
      }
      this.setState({ counterChart: unique });
    }
  }
  handleClickLegend = item => {
    const { counterChart } = this.state;
    item.disabled = !item.disabled;
    this.setState({
      counterChart
    });
  };

  render() {
    const { counterChart } = this.state;
    const data = [];
    counterChart.map(item => {
      if (!item.disabled) {
        data.push({
          angle: item.angle,
          color: item.color,
          label: item.title
        });
      }
      return 0;
    });

    return (
      <React.Fragment>
        <Row>
          <Col>
            {" "}
            <RadialChart
              data={data}
              width={300}
              height={300}
              className="content-center"
            />
          </Col>
          <Col>
            <DiscreteColorLegend
              orientation="horizontal"
              width={300}
              items={counterChart}
              className="content-center"
              onItemClick={this.handleClickLegend}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default RadialChartCard;
