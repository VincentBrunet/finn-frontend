import * as React from "react";

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
                borderColor: "#3AA3BB",
                backgroundColor: "#3AA3BB",
                label: serie.name,
                pointRadius: 0,
                pointBorderWidth: 0,
                pointBorderColor: "transparent",
                data: serie.points.map((point) => {
                  return point.y;
                }),
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
                    fontColor: "white",
                    callback: function (value, index, values) {
                      return value + " " + serie.unit;
                    },
                  },
                },
              ],
              xAxes: [
                {
                  type: "time",
                  ticks: {
                    fontColor: "white",
                  },
                },
              ],
            },
            tooltips: {
              intersect: false,
              mode: "index",
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
