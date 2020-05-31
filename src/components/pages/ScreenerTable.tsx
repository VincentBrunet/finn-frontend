import React from "react";

import { Table, TableCell } from "../data/Table";

import { Component } from "../Component";

import { Strings } from "../../services/utils/Strings";
import { Api } from "../../services/utils/Api";

import { Card } from "../interface/Card";

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
    const apiData = await Api.getScreenerTable();
    const apiColumns = apiData.columns;
    const apiRows = apiData.rows;

    const head: TableCell[] = [{ text: "Ticker" }, { text: "Name" }];
    for (const apiColumn of apiColumns) {
      head.push({ text: apiColumn?.metric?.name });
    }

    const body: TableCell[][] = [];
    for (const apiRow of apiRows) {
      const cells: TableCell[] = [];
      for (let i = 0; i < apiRow.length; i++) {
        const apiCell = apiRow[i];
        if (i === 0) {
          cells.push({ text: apiCell.code + "." + apiCell.country });
          cells.push({ text: Strings.ellipsis(apiCell.name, 32) });
        } else {
          if (apiCell) {
            cells.push({
              number: apiCell.value,
              unit: apiCell.unit.symbol ?? apiCell.unit.code,
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
      <Card>
        <Table head={this.state?.head} body={this.state?.body} />
      </Card>
    );
  }
}
