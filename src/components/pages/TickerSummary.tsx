import React from "react";

import moment from "moment";

import { RouteComponentProps } from "react-router-dom";

import { Component } from "../Component";

import { Lazy } from "../util/Lazy";

import { ChartLine, ChartLineSerie } from "../data/ChartLine";

import { Box } from "../atomics/Box";
import { Layout } from "../atomics/Layout";
import { Responsive } from "../atomics/Responsive";

import { Card } from "../interface/Card";

import { Api } from "../../services/utils/Api";
import { Numbers } from "../../services/utils/Numbers";

import { Metric } from "../../services/types/Metric";
import { Ticker } from "../../services/types/Ticker";
import { Unit } from "../../services/types/Unit";

import { Colors } from "../../services/utils/Colors";

interface TickerSummaryProps extends RouteComponentProps<{ code: string }> {}
interface TickerSummaryState {
  charts?: ChartLineSerie[];
}

export class TickerSummary extends Component<
  TickerSummaryProps,
  TickerSummaryState
> {
  async onUpdateProps() {
    const metricById = await Metric.byId();

    const data = await Api.getTickerSummary(this.props.match.params.code);

    const charts: ChartLineSerie[] = [];
    for (const chart of data.charts) {
      const metric = metricById.get(chart.metric_id);

      const ys = chart.values.map((value: any) => {
        return value.value;
      });

      const name = metric?.name ?? "";
      const category = metric?.category ?? "";

      let units = new Set<string>();
      for (let i = 0; i < chart.values.length; i++) {
        const value = chart.values[i];
        units.add(value.unit);
      }
      const unit = units.size === 1 ? [...units][0] ?? "" : "";

      let divisor = Numbers.chooseArrayDivisor(ys);
      let note = "";
      if (divisor === Numbers.trillion) {
        note = "T ";
      } else if (divisor === Numbers.billion) {
        note = "B ";
      } else if (divisor === Numbers.million) {
        note = "M ";
      } else if (divisor === Numbers.thousand) {
        divisor = 1;
      }

      const serie: ChartLineSerie = {
        name: `[${category}] ${name}`,
        unit: `${note}${unit}`,
        points: chart.values.map((value: any) => {
          return {
            x: new Date(value.stamp).getTime(),
            y: value.value / divisor,
          };
        }),
      };

      serie.points.sort((a, b) => {
        return a.x - b.x;
      });

      charts.push(serie);
    }

    this.setState({
      charts: charts,
    });
  }

  onRender() {
    return (
      <Layout direction="row" wrap={true} padding={4}>
        {this.state?.charts?.map((chart, index) => {
          return (
            <Responsive key={index} xs={100} sm={50} md={33.3} lg={25} xl={20}>
              <Card>
                <div>{chart.name}</div>
                <Lazy width="100%" height="150px">
                  <ChartLine
                    serie={chart}
                    formatter={(unixTime) => moment(unixTime).calendar()}
                  />
                </Lazy>
              </Card>
            </Responsive>
          );
        })}
      </Layout>
    );
  }
}
