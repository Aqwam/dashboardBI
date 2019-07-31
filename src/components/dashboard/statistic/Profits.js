import React, { Component } from "react";
// import { Line } from "react-chartjs-2";
import { Button } from "antd";
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
class Profits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          name: "Page A",
          transactions: 4000,
          orders: 2400,
          amt: 2400
        },
        {
          name: "Page B",
          transactions: 3000,
          orders: 1398,
          amt: 2210
        },
        {
          name: "Page C",
          transactions: 2000,
          orders: 9800,
          amt: 2290
        },
        {
          name: "Page D",
          transactions: 2780,
          orders: 3908,
          amt: 2000
        },
        {
          name: "Page E",
          transactions: 1890,
          orders: 4800,
          amt: 2181
        },
        {
          name: "Page F",
          transactions: 2390,
          orders: 3800,
          amt: 2500
        },
        {
          name: "Page G",
          transactions: 3490,
          orders: 4300,
          amt: 2100
        }
      ]
      // data: {
      //     labels: [
      //         "Boston",
      //         "Worcester",
      //         "Springfield",
      //         "Lowell",
      //         "Cambridge",
      //         "New Bedford"
      //     ],
      //     datasets: [
      //         {
      //             label: "incomes",
      //             data: [617594, 181045, 153060, 106519, 105162, 95072],
      //             backgroundColor: "rgba(255, 99, 132, 0.3)",
      //             fill: true
      //         },
      //         {
      //             label: "transactions",
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
  //     legendPosition: "right",
  //     location: "City"
  // };

  async handleClick() {
    const a = [
      ...this.state.data,
      { name: "Page H", transactions: 4630, orders: 6943, amt: 3200 }
    ];
    // const p = [...this.state.data.datasets[0].data, 99999];
    // this.setState((this.state.data.labels = a));

    this.setState((this.state.data = a));
    // console.log(p, this.state.data.datasets[0].data);
    await console.log("new data added");
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
                  dataKey="orders"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="transactions" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          {/* <Line
                        data={this.state.data}
                        options={{
                            legend: {
                                display: true,
                                position: "right"
                            },
                            options: {
                                line: {}
                            }
                        }}
                    />{" "} */}
          <Button onClick={this.handleClick.bind(this)} type="primary">
            hehe
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

export default Profits;
