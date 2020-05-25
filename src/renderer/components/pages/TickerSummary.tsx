import axios from 'axios';

import * as React from 'react';

import { Component } from '../Component';

import { Lazy } from '../util/Lazy';

import { ChartLine, ChartLineSerie } from '../data/ChartLine';

import { Container, Row, Col, Card } from 'react-bootstrap';

import * as moment from 'moment';

import { Numbers } from '../../services/utils/Numbers';

interface TickerSummaryProps {}
interface TickerSummaryState {
  charts?: ChartLineSerie[];
}

export class TickerSummary extends Component<TickerSummaryProps, TickerSummaryState> {
  async onUpdateProps() {
    const result = await axios.get('http://127.0.0.1:3000/ticker/summary/AAPL');
    const data = result.data.data;

    const charts: ChartLineSerie[] = [];
    for (const chart of data.charts) {
      const ys = chart.values.map((value: any) => {
        return value.value;
      });

      const divisor = Numbers.chooseDivisor(ys);

      const name = chart.metric.name;
      const category = chart.metric.category;
      let note = '';
      if (divisor === Numbers.trillion) {
        note = 'Trillions';
      } else if (divisor === Numbers.billion) {
        note = 'Billions';
      } else if (divisor === Numbers.million) {
        note = 'Millions';
      } else if (divisor === Numbers.thousand) {
        note = 'Thousands';
      }
      if (note) {
        note = `(${note})`;
      }

      const serie: ChartLineSerie = {
        name: `[${category}] ${name} ${note}`,
        points: chart.values.map((value: any) => {
          return {
            x: new Date(value.stamp).getTime(),
            y: value.value / divisor
          };
        })
      };

      serie.points.sort((a, b) => {
        const av = a.x;
        const bv = b.x;
        let diff = 0;
        if (typeof av === 'string' && typeof bv === 'string') {
          diff = av.localeCompare(bv);
        } else if (typeof av === 'number' && typeof bv === 'number') {
          diff = av - bv;
        } else {
          diff = +av - +bv;
        }
        return diff;
      });

      charts.push(serie);
    }

    this.setState({
      charts: charts
    });
  }

  onRender() {
    return (
      <Container fluid>
        <Row style={{ margin: '10px 0' }}>
          {this.state?.charts?.map((chart, index) => {
            return (
              <Col xs={12} md={6} xl={4} key={index}>
                <Card
                  body
                  style={{
                    boxShadow: '0 8px 11px rgba(0,0,0,0.1)',
                    margin: '10px 0'
                  }}
                >
                  <Card.Text>{chart.name}</Card.Text>
                  <Lazy width="100%" height="150px">
                    <ChartLine
                      series={[chart]}
                      formatter={unixTime => moment(unixTime).calendar()}
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
