import React, { Component } from "react";
import CanvasJSReact from "../canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ChartTrendParticle extends Component {
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
          'Trend EM Particle Count Class B P-318 I-10, P-318, PC 0.5 µm "Bagian Produksi Vaksin Rotavirus"',
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
            { x: new Date(2017, 10, 4), y: 121000 },
            { x: new Date(2017, 10, 6), y: 121000 },
            { x: new Date(2017, 10, 8), y: 121000 },
            { x: new Date(2017, 10, 10), y: 121000 },
            { x: new Date(2017, 10, 12), y: 121000 },
            { x: new Date(2017, 10, 14), y: 121000 },
            { x: new Date(2017, 10, 16), y: 121000 },
            { x: new Date(2017, 10, 18), y: 121000 },
            { x: new Date(2017, 10, 20), y: 121000 }
          ]
        },
        {
          type: "spline",
          name: "Limit Specification",
          showInLegend: true,
          xValueFormatString: "MMM YYYY",
          yValueFormatString: "#,##0",
          dataPoints: [
            { x: new Date(2017, 10, 4), y: 177450 },
            { x: new Date(2017, 10, 6), y: 177450 },
            { x: new Date(2017, 10, 8), y: 177450 },
            { x: new Date(2017, 10, 10), y: 177450 },
            { x: new Date(2017, 10, 12), y: 177450 },
            { x: new Date(2017, 10, 14), y: 177450 },
            { x: new Date(2017, 10, 16), y: 177450 },
            { x: new Date(2017, 10, 18), y: 177450 },
            { x: new Date(2017, 10, 20), y: 177450 }
          ]
        },

        {
          type: "spline",
          name: "Test Results",
          showInLegend: true,
          xValueFormatString: "MMM YYYY",
          yValueFormatString: "#,##0",
          dataPoints: [
            { x: new Date(2017, 10, 4), y: 0 },
            { x: new Date(2017, 10, 6), y: 0 },
            { x: new Date(2017, 10, 8), y: 0 },
            { x: new Date(2017, 10, 10), y: 0 },
            { x: new Date(2017, 10, 12), y: 0 },
            { x: new Date(2017, 10, 14), y: 0 },
            { x: new Date(2017, 10, 16), y: 0 },
            { x: new Date(2017, 10, 18), y: 0 },
            { x: new Date(2017, 10, 20), y: 0 }
          ]
        }
      ]
    };

    return (
      <div className="ChartTrendParticle">
        <CanvasJSChart options={options} onRef={ref => (this.chart = ref)} />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}

export default ChartTrendParticle;
