import React, { Component } from "react";
import CanvasJSReact from "../canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ChartKPIIntervalDay extends Component {
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
          toolTipContent: "<b>{label}</b>: {y}",
          showInLegend: "true",
          legendText: "{label}",
          indexLabelFontSize: 16,
          indexLabel: "{label} - {y}",
          dataPoints: [
            { y: 15, label: "Produksi Vaksin Pertusis" },
            { y: 15, label: "Produksi Media Virus" },
            { y: 15, label: "none" },
            { y: 15, label: "Media Bakteri" },
            { y: 17, label: "Produksi Vaksin Difteri" },
            { y: 17, label: "PMM" },
            { y: 20, label: "Produksi Polio" },
            { y: 27, label: "Produksi Vaksin Campak" },
            { y: 27, label: "Produksi BCG" },
            { y: 57, label: "Produksi Vaksin Tetanus" },
            { y: 83, label: "Hewan Produksi" },
            { y: 93, label: "Produksi Vaksin Rotavirus" },
            { y: 96, label: "FPVS" },
            { y: 97, label: "Produksi sIPV" }
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

export default ChartKPIIntervalDay;
