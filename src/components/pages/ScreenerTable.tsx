import React from "react";

import { Metric } from "../../services/types/Metric";
import { Ticker } from "../../services/types/Ticker";
import { Unit } from "../../services/types/Unit";
import { Api } from "../../services/utils/Api";
import { Strings } from "../../services/utils/Strings";
import { Component } from "../Component";
import { Box } from "../atomics/Box";
import { Label } from "../atomics/Label";
import { Layout } from "../atomics/Layout";
import { Scroll } from "../atomics/Scroll";
import { Table } from "../data/Table";
import { Card } from "../interface/content/Card";
import { CardBody } from "../interface/content/CardBody";
import { CardHead } from "../interface/content/CardHead";
import { Page } from "../interface/content/Page";
import { PageBody } from "../interface/content/PageBody";
import { PageHead } from "../interface/content/PageHead";

export interface ScreenerTableProps {}

interface State {
  tickers?: string[];
  head?: string[];
  body?: Value[][];
}

interface Value {
  score: number;
  text: string;
}

export class ScreenerTable extends Component<ScreenerTableProps, State> {
  state: State = {};

  async onUpdateProps() {
    const metricById = await Metric.byId();
    const tickerById = await Ticker.byId();
    const unitById = await Unit.byId();

    console.log("Metric", metricById);
    console.log("Unit", unitById);

    const apiData = await Api.getScreenerTable();

    const apiMetrics = apiData.metrics;

    const apiRows = apiData.rows;

    const tickers = [];
    for (const apiRow of apiRows) {
      const apiCell = apiRow[0];
      const ticker = tickerById.get(apiCell);
      tickers.push(ticker?.code ?? "");
    }

    const head = ["Name"];
    for (const apiMetric of apiMetrics) {
      const metric = metricById.get(apiMetric);
      console.log("metric", metric);
      head.push(metric?.name + " (" + metric?.category + ")");
    }

    const body = [];
    for (const apiRow of apiRows) {
      const cells: Value[] = [];
      for (let i = 0; i < apiRow.length; i++) {
        const apiCell = apiRow[i];
        if (i === 0) {
          const ticker = tickerById.get(apiCell);
          cells.push({
            score: 0,
            text: Strings.ellipsis(ticker?.name ?? "", 32),
          });
        } else {
          if (apiCell) {
            const unit = unitById.get(apiCell[1]);
            cells.push({
              score: apiCell[0],
              text: apiCell[0] + " " + (unit?.symbol ?? unit?.code),
            });
          } else {
            cells.push({
              score: 0,
              text: "--",
            });
          }
        }
      }
      body.push(cells);
    }

    this.setState({
      tickers: tickers,
      head: head,
      body: body,
    });
  }

  onRender() {
    const tickers = (this.state.tickers ?? []).slice(0, 100);
    const head = this.state.head ?? [];
    const body = this.state.body ?? [];
    return (
      <Page>
        <PageHead title="Screener" />
        <PageBody>
          <Layout width="100%">
            <Card>
              <CardHead title="Tickers" />
              <CardBody>
                <Layout direction="row">
                  <Layout>
                    {this.onRenderHead("Code")}
                    {tickers.map(this.onRenderTicker)}
                  </Layout>
                  <Layout shrink={1} grow={1}>
                    <Scroll x={true}>
                      <Table<Value>
                        head={head.map(this.onRenderHead)}
                        body={body}
                        render={this.onTableRender}
                        score={this.onTableScore}
                        pageCurrent={0}
                        pageItems={100}
                      />
                    </Scroll>
                  </Layout>
                </Layout>
              </CardBody>
            </Card>
          </Layout>
        </PageBody>
      </Page>
    );
  }

  onRenderTicker = (text: string, index: number) => {
    return <Layout key={index}>{this.onRenderCell(text)}</Layout>;
  };

  onRenderHead = (text: string) => {
    return <Label text={text} />;
  };

  onTableRender = (value: Value, row: number, col: number) => {
    return this.onRenderCell(value.text);
  };

  onTableScore = (value: Value) => {
    return value.score;
  };

  onRenderCell = (text: string) => {
    return (
      <Box borderTop="1px solid #eee">
        <Label text={text} />
      </Box>
    );
  };
}
