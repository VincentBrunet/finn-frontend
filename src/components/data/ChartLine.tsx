import React from "react";

import { Component } from "../Component";
import { ChartBase } from "./ChartBase";

export interface ChartLinePoint {
  x: number;
  y: number;
}
export interface ChartLineSerie {
  name: string;
  unit?: string;
  points: ChartLinePoint[];
}
export interface ChartLineProps {
  lineColor?: string;
  labelsColor?: string;
  serie?: ChartLineSerie;
  formatter?: (value: string | number) => string;
}

interface ChartLineState {}

export class ChartLine extends Component<ChartLineProps, ChartLineState> {
  onRender() {
    const serie = this.props.serie;
    const formatter = this.props.formatter;
    if (!serie) {
      return undefined;
    }
    return (
      <ChartBase
        config={{
          type: "line",
          data: {
            datasets: [
              {
                borderColor: this.props.lineColor,
                backgroundColor: this.props.lineColor,
                label: serie.name,
                pointRadius: 0,
                pointBorderWidth: 0,
                pointBorderColor: "transparent",
                data: serie.points.map((point) => {
                  return point.y;
                }),
                borderWidth: 2,
                fill: false,
                lineTension: 0,
              },
            ],
            labels: serie.points.map((point) => {
              return formatter ? formatter(point.x) : point.x;
            }),
          },
          options: {
            legend: {
              display: false,
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    fontColor: this.props.labelsColor,
                    callback: function (value, index, values) {
                      return (
                        parseFloat(value.toString()).toLocaleString() +
                        " " +
                        serie.unit
                      );
                    },
                    maxTicksLimit: 5,
                  },
                },
              ],
              xAxes: [
                {
                  type: "time",
                  ticks: {
                    fontColor: this.props.labelsColor,
                    minRotation: 45,
                    maxRotation: 45,
                    min: new Date("2000"),
                  },
                  time: {
                    unit: "year",
                  },
                },
              ],
            },
            tooltips: {
              intersect: false,
              mode: "index",
              callbacks: {
                title: (
                  item: Chart.ChartTooltipItem[],
                  data: Chart.ChartData
                ) => {
                  return item[0].xLabel?.toString() || "";
                },
                label: (
                  item: Chart.ChartTooltipItem,
                  data: Chart.ChartData
                ) => {
                  return item.yLabel + " " + serie.unit ?? "";
                },
              },
            },
            animation: {
              duration: 0,
            },
            responsive: true,
            maintainAspectRatio: false,
            hover: {
              intersect: false,
              animationDuration: 0,
            },
          },
        }}
      />
    );
  }
}
