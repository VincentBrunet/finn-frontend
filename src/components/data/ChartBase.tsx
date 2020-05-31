import React from "react";

import Chart from "chart.js";

import { Component } from "../Component";

export interface ChartBaseProps {
  config: Chart.ChartConfiguration;
}

export class ChartBase extends Component<ChartBaseProps> {
  private static _id = 0;

  private id = "chartbase-" + (ChartBase._id++).toString(16);

  private chart?: Chart;

  onUpdate() {
    if (!this.chart) {
      this.chart = new Chart(this.id, this.props.config);
    } else {
      this.chart.config = this.props.config;
      this.chart.update();
    }
  }
  onRender() {
    return <canvas id={this.id} />;
  }
}
