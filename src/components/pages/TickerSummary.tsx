import moment from "moment";
import React from "react";
import { RouteComponentProps } from "react-router-dom";

import { Metric } from "../../services/types/Metric";
import { Api } from "../../services/utils/Api";
import { Colors } from "../../services/utils/Colors";
import { Numbers } from "../../services/utils/Numbers";
import { Component } from "../Component";
import { Responsive } from "../atomics/Responsive";
import { ChartLine, ChartLineSerie } from "../data/ChartLine";
import { Card } from "../interface/content/Card";
import { CardBody } from "../interface/content/CardBody";
import { CardHead } from "../interface/content/CardHead";
import { Page } from "../interface/content/Page";
import { PageBody } from "../interface/content/PageBody";
import { PageHead } from "../interface/content/PageHead";
import { Lazy } from "../util/Lazy";

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
            x: moment.utc(value.stamp),
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
      <Page>
        <PageHead title="Hello" />
        <PageBody>
          {this.state?.charts?.map((chart, index) => {
            return (
              <Responsive
                key={index}
                width={{
                  xs: "100%",
                  sm: "100%",
                  md: "50%",
                  lg: "33.3%",
                  xl: "25%",
                  hd: "20%",
                }}
              >
                <Card>
                  <CardHead title={chart.name} />
                  <CardBody>
                    <Lazy width="100%" height="150px">
                      <ChartLine
                        lineColor={Colors.Specs.Delimiter}
                        serie={chart}
                        formatter={(unixTime) => moment(unixTime).calendar()}
                      />
                    </Lazy>
                  </CardBody>
                </Card>
              </Responsive>
            );
          })}
        </PageBody>
      </Page>
    );
  }
}
