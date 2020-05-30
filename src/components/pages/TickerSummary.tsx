import axios from "axios";

import * as React from "react";

import { Component } from "../Component";

import { Lazy } from "../util/Lazy";

import { ChartLine, ChartLineSerie } from "../data/ChartLine";

import { Container, Row, Col, Card } from "react-bootstrap";

import moment from "moment";

import { Numbers } from "../../services/utils/Numbers";

import { RouteComponentProps } from "react-router-dom";

interface TickerSummaryProps extends RouteComponentProps<{ code: string }> {}
interface TickerSummaryState {
  charts?: ChartLineSerie[];
}

export class TickerSummary extends Component<
  TickerSummaryProps,
  TickerSummaryState
> {
  async onUpdateProps() {
    const result = await axios.get(
      "http://127.0.0.1:3000/ticker/summary/" + this.props.match.params.code
    );
    const data = result.data.data;

    const charts: ChartLineSerie[] = [];
    for (const chart of data.charts) {
      const ys = chart.values.map((value: any) => {
        return value.value;
      });

      const divisor = Numbers.chooseArrayDivisor(ys);

      const name = chart.metric.name;
      const category = chart.metric.category;
      let note = "";
      if (divisor === Numbers.trillion) {
        note = "Trillions";
      } else if (divisor === Numbers.billion) {
        note = "Billions";
      } else if (divisor === Numbers.million) {
        note = "Millions";
      } else if (divisor === Numbers.thousand) {
        note = "Thousands";
      }
      if (note) {
        note = `(${note})`;
      }

      let units = new Set<string>();
      for (let i = 0; i < chart.values.length; i++) {
        const value = chart.values[i];
        units.add(value.unit);
      }

      const serie: ChartLineSerie = {
        unit: [...units].join(","),
        name: `[${category}] ${name} ${note}`,
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
      <Container
        style={{
          backgroundColor: "#1E264F",
        }}
      >
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
