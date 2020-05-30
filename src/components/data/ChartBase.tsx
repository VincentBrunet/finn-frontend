import * as React from "react";

import Chart from "chart.js";

import { Component } from "../Component";

export interface ChartBaseProps {
  config: Chart.ChartConfiguration;
}

interface ChartBaseState {
  id: string;
}

export class ChartBase extends Component<ChartBaseProps, ChartBaseState> {
  private static _id = 0;

  private unique?: string;
  private chart?: Chart;

  onAlloc() {
    this.state = {
      id: "chartbase-" + (ChartBase._id++).toString(16),
    };
  }
  onCreate() {
    this.chart = new Chart(this.state.id, this.props.config);
  }
  onUpdate() {
    if (this.chart) {
      this.chart.config = this.props.config;
      this.chart.update();
    }
  }
  onRender() {
    return <canvas id={this.state.id} />;
  }
  onDestroy() {}
}
