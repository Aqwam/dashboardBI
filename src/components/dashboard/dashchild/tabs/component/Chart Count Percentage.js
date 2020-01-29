import React, { Component } from "react";
import CanvasJSReact from "../canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ChartCountPercentage extends Component {
  render() {
    const options = {
      theme: "light2",
      animationEnabled: true,
      title: {
        text: "Count of Registered, Received, Prepared, Approved",
        fontSize: 20
      },
      toolTip: {
        shared: true
      },
      legend: {
        verticalAlign: "top"
      },
      axisY: {
        suffix: "%"
      },
      data: [
        {
          type: "stackedBar100",
          color: "#3571aa",
          name: "Yes",
          showInLegend: true,
          indexLabel: "{y}",
          indexLabelFontColor: "white",
          dataPoints: [
            { label: "Registered", y: 426 },
            { label: "Received", y: 426 },
            { label: "Prepared", y: 426 },
            { label: "Approved", y: 426 }
          ]
        },
        {
          type: "stackedBar100",
          color: "#7f7f7f",
          name: "No",
          showInLegend: true,
          indexLabel: "{y}",
          indexLabelFontColor: "white",
          yValueFormatString: "#,###",
          dataPoints: [
            { label: "Registered", y: 0 },
            { label: "Received", y: 0 },
            { label: "Prepared", y: 0 },
            { label: "Approved", y: 0 }
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

export default ChartCountPercentage;
