import React from "react";

import { Component } from "../Component";

import { Lazy } from "../util/Lazy";

import { ChartLine, ChartLineSerie } from "../data/ChartLine";

import { Container, Row, Col, Card } from "react-bootstrap";

import moment from "moment";

import { Api } from "../../services/utils/Api";
import { Numbers } from "../../services/utils/Numbers";

import { RouteComponentProps } from "react-router-dom";

import { Metric } from "../../services/types/Metric";
import { Ticker } from "../../services/types/Ticker";
import { Unit } from "../../services/types/Unit";

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
      <Container>
        <Row style={{ margin: "10px 0" }}>
          {this.state?.charts?.map((chart, index) => {
            return (
              <Col xs={12} md={6} xl={4} key={index}>
                <Card
                  body
                  style={{
                    boxShadow: "0 8px 11px rgba(0,0,0,0.1)",
                    backgroundColor: "#133D9C",
                    color: "white",
                    margin: "10px 0",
                  }}
                >
                  <Card.Text>{chart.name}</Card.Text>
                  <Lazy width="100%" height="150px">
                    <ChartLine
                      serie={chart}
                      formatter={(unixTime) => moment(unixTime).calendar()}
                    />
                  </Lazy>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    );
  }
}
