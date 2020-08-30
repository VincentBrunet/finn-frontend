import React from "react";

import { Metric } from "../../services/types/Metric";
import { Ticker } from "../../services/types/Ticker";
import { Unit } from "../../services/types/Unit";
import { Api } from "../../services/utils/Api";
import { Strings } from "../../services/utils/Strings";
import { Component } from "../Component";
import { Layout } from "../atomics/Layout";
import { Scroll } from "../atomics/Scroll";
import { Table, TableCell } from "../data/Table";
import { Card } from "../interface/content/Card";
import { CardBody } from "../interface/content/CardBody";
import { CardHead } from "../interface/content/CardHead";
import { Page } from "../interface/content/Page";
import { PageBody } from "../interface/content/PageBody";
import { PageHead } from "../interface/content/PageHead";

interface ScreenerTableProps {}
interface ScreenerTableState {
  head?: TableCell[];
  body?: TableCell[][];
}

export class ScreenerTable extends Component<
  ScreenerTableProps,
  ScreenerTableState
> {
  async onUpdateProps() {
    const metricById = await Metric.byId();
    const tickerById = await Ticker.byId();
    const unitById = await Unit.byId();

    console.log("Metric", metricById);
    console.log("Unit", unitById);

    const apiData = await Api.getScreenerTable();

    const apiMetrics = apiData.metrics;
    const apiRows = apiData.rows;

    const head: TableCell[] = [{ text: "Ticker" }, { text: "Name" }];
    for (const apiMetric of apiMetrics) {
      const metric = metricById.get(apiMetric);
      console.log("metric", metric);
      head.push({ text: metric?.name + " (" + metric?.category + ")" });
    }

    const body: TableCell[][] = [];
    for (const apiRow of apiRows) {
      const cells: TableCell[] = [];
      for (let i = 0; i < apiRow.length; i++) {
        const apiCell = apiRow[i];
        if (i === 0) {
          const ticker = tickerById.get(apiCell);
          cells.push({ text: ticker?.code });
          cells.push({ text: Strings.ellipsis(ticker?.name ?? "", 32) });
        } else {
          if (apiCell) {
            const unit = unitById.get(apiCell[1]);
            cells.push({
              number: apiCell[0],
              unit: unit?.symbol ?? unit?.code,
            });
          } else {
            cells.push({});
          }
        }
      }
      body.push(cells);
    }

    this.setState({
      head: head,
      body: body,
    });
  }

  onRender() {
    return (
      <Page>
        <PageHead title="Screener" />
        <PageBody>
          <Layout width="100%">
            <Card>
              <CardHead title="Tickers" />
              <CardBody>
                <Scroll x={true}>
                  <Table
                    head={this.state?.head}
                    body={this.state?.body}
                    pageCount={100}
                  />
                </Scroll>
              </CardBody>
            </Card>
          </Layout>
        </PageBody>
      </Page>
    );
  }
}
