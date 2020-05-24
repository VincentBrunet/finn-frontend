import axios from 'axios';

import * as React from 'react';

import { Table, TableCell } from '../data/Table';

import { Component } from '../Component';

interface ScreenerTableProps {}
interface ScreenerTableState {
  rows?: TableCell[][];
}

export class ScreenerTable extends Component<ScreenerTableProps, ScreenerTableState> {
  async onUpdateProps() {
    console.log('OnUpdateProps', this.props);
    const result = await axios.get('http://127.0.0.1:3000/screener/table');
    console.log(result.data);
    const data = result.data.data;
    const cells: TableCell[][] = [];
    const header = ['Ticker', 'Name'];
    for (const column of data.columns) {
      header.push(column.metric.identifier);
    }
    cells.push(header);
    for (const row of data.rows) {
      const localCell = [];
      for (let i = 0; i < row.length; i++) {
        const column = row[i];
        if (i === 0) {
          localCell.push(column.symbol);
          localCell.push(column.name);
        } else {
          localCell.push(column);
        }
      }
      cells.push(localCell);
    }
    this.setState({
      rows: cells
    });
  }

  onRender() {
    return <Table rows={this.state?.rows} />;
  }
}
