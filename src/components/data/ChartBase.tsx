import React from "react";

import Chart from "chart.js";

import { Component } from "../Component";

export interface ChartBaseProps {
  config: Chart.ChartConfiguration;
}

export class ChartBase extends Component<ChartBaseProps> {
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
