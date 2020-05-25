import axios from 'axios';

import * as React from 'react';

import { Table, TableCell } from '../data/Table';

import { Component } from '../Component';

interface ScreenerTableProps {}
interface ScreenerTableState {
  head?: TableCell[];
  body?: TableCell[][];
}

export class ScreenerTable extends Component<ScreenerTableProps, ScreenerTableState> {
  async onUpdateProps() {
    const apiResult = await axios.get('http://127.0.0.1:3000/screener/table');
    const apiData = apiResult.data.data;
    const apiColumns = apiData.columns;
    const apiRows = apiData.rows;

    const head: TableCell[] = [{ value: 'id' }, { value: 'Ticker' }, { value: 'Name' }];
    for (const apiColumn of apiColumns) {
      head.push({ value: apiColumn?.metric?.name });
    }

    const body: TableCell[][] = [];
    for (const apiRow of apiRows) {
      const cells: TableCell[] = [];
      for (let i = 0; i < apiRow.length; i++) {
        const apiCell = apiRow[i];
        if (i === 0) {
          cells.push({ value: apiCell.id });
          cells.push({ value: apiCell.code });
          cells.push({ value: apiCell.name });
        } else {
          if (apiCell) {
            cells.push({
              value: apiCell.value,
              unit: apiCell.unit.symbol ?? apiCell.unit.code
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
      body: body
    });
  }

  onRender() {
    return <Table head={this.state?.head} body={this.state?.body} />;
  }
}
