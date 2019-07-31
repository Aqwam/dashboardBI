import React, { Component } from "react";
// import { Line } from "react-chartjs-2";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

import { Button } from "antd";

class Incomes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          name: "Page A",
          orders: 4000,
          transactions: 2400,
          amt: 2400
        },
        {
          name: "Page B",
          orders: 3000,
          transactions: 1398,
          amt: 2210
        },
        {
          name: "Page C",
          orders: 2000,
          transactions: 9800,
          amt: 2290
        },
        {
          name: "Page D",
          orders: 2780,
          transactions: 3908,
          amt: 2000
        },
        {
          name: "Page E",
          orders: 1890,
          transactions: 4800,
          amt: 2181
        },
        {
          name: "Page F",
          orders: 2390,
          transactions: 3800,
          amt: 2500
        },
        {
          name: "Page G",
          orders: 3490,
          transactions: 4300,
          amt: 2100
        }
      ]

      // data: {
      //     datasets: [
      //         {
      //             data: [423233, 564353, 231134, 123456, 90100, 124903],
      //             backgroundColor: "rgba(100, 99, 132, 0.3)",
      //             fill: true
      //         }
      //     ]
      // }
    };
  }
  // static defaultProps = {
  //     displayTitle: true,
  //     displayLegend: true,
  //     legendPosition: "right"
  // };

  handleClick() {
    // const p = [...this.state.data.datasets[0].data, 99999];
    // this.setState((this.state.data.datasets[0].data = p));
    // console.log(p, this.state.data.datasets[0].data);
  }
  render() {
    return (
      <React.Fragment>
        <div>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={this.state.data}>
                {" "}
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" style={{ display: "none" }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="transactions"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* <Line
                        data={this.state.data}
                        options={{
                            options: {
                                line: {}
                            },
                            legend: {
                                display: false
                            }
                        }}
                    />{" "} */}
          <Button onClick={this.handleClick.bind(this)} type="primary">
            Click Me
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

export default Incomes;
