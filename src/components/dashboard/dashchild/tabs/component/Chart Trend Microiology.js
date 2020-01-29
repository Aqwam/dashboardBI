import React, { Component } from "react";
import CanvasJSReact from "../canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ChartTrendMicrobiology extends Component {
  constructor() {
    super();
    this.toggleDataSeries = this.toggleDataSeries.bind(this);
  }

  toggleDataSeries(e) {
    if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    this.chart.render();
  }

  render() {
    const options = {
      theme: "light2",
      animationEnabled: true,
      title: {
        text:
          'Trend EM Microbiology AS Class LAF/D, CA Class LAF/D A-103 \n"Bagian Hewan Produksi"\n',
        fontSize: 20
      },
      axisX: {
        title: "Date"
      },
      axisY: {
        title: "Number of Particles",
        titleFontColor: "#6D78AD",
        lineColor: "#6D78AD",
        labelFontColor: "#6D78AD",
        tickColor: "#6D78AD",
        includeZero: false
      },
      toolTip: {
        shared: true
      },
      legend: {
        cursor: "pointer",
        itemclick: this.toggleDataSeries
      },
      data: [
        {
          type: "spline",
          name: "Limit Alert",
          showInLegend: true,
          xValueFormatString: "MMM YYYY",
          yValueFormatString: "#,##0 ",
          dataPoints: [
            { x: new Date(2017, 9, 30), y: 30 },
            { x: new Date(2017, 10, 7), y: 30 },
            { x: new Date(2017, 10, 14), y: 30 },
            { x: new Date(2017, 10, 21), y: 30 },
            { x: new Date(2017, 10, 28), y: 30 },
            { x: new Date(2017, 11, 4), y: 30 },
            { x: new Date(2017, 11, 11), y: 30 }
          ]
        },
        {
          type: "spline",
          name: "Limit Specification",
          showInLegend: true,
          xValueFormatString: "MMM YYYY",
          yValueFormatString: "#,##0",
          dataPoints: [
            { x: new Date(2017, 9, 30), y: 50 },
            { x: new Date(2017, 10, 7), y: 50 },
            { x: new Date(2017, 10, 14), y: 50 },
            { x: new Date(2017, 10, 21), y: 50 },
            { x: new Date(2017, 10, 28), y: 50 },
            { x: new Date(2017, 11, 4), y: 50 },
            { x: new Date(2017, 11, 11), y: 50 }
          ]
        },

        {
          type: "spline",
          name: "Test Results",
          showInLegend: true,
          xValueFormatString: "MMM YYYY",
          yValueFormatString: "#,##0",
          dataPoints: [
            { x: new Date(2017, 9, 30), y: 0 },
            { x: new Date(2017, 10, 7), y: 0 },
            { x: new Date(2017, 10, 14), y: 0 },
            { x: new Date(2017, 10, 21), y: 0 },
            { x: new Date(2017, 10, 28), y: 0 },
            { x: new Date(2017, 11, 4), y: 0 },
            { x: new Date(2017, 11, 11), y: 0 }
          ]
        }
      ]
    };

    return (
      <div className="ChartTrendMicrobiology">
        <CanvasJSChart options={options} onRef={ref => (this.chart = ref)} />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}

export default ChartTrendMicrobiology;
