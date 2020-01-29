import React, { Component } from "react";
import CanvasJSReact from "../canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ChartPercentageSampleStatus extends Component {
  render() {
    const options = {
      theme: "light2",
      animationEnabled: true,
      title: {
        text: "Average Interval Date (Day)",
        fontSize: 20
      },
      data: [
        {
          type: "pie",
          startAngle: 75,
          toolTipContent: "<b>{label}</b>: 426",
          showInLegend: "true",
          legendText: "{label}",
          indexLabelFontSize: 16,
          indexLabel: "{label} - {y}%",
          dataPoints: [
            { y: 100, label: "Approved" },
            { y: 0, label: "Rejected" }
          ]
        }
      ]
    };

    return (
      <div>
        <CanvasJSChart
          options={options}
          /* onRef={ref => this.chart = ref} */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}

export default ChartPercentageSampleStatus;
