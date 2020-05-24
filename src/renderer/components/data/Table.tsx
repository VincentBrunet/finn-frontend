import * as React from 'react';

import { Component } from '../Component';

import BoostrapTable from 'react-bootstrap/Table';

export type TableCell = number | string;
export interface TableProps {
  rows?: TableCell[][];
}

interface TableState {
  sortIndex?: number;
  sortReverse?: boolean;
}

export class Table extends Component<TableProps, TableState> {
  onClickCell = (column: number) => {
    this.setState({
      sortIndex: column,
      sortReverse: this.state.sortIndex === column && !this.state.sortReverse
    });
  };

  onRender() {
    let rows = this.props.rows || [];
    // Sorting optionally
    const sortIndex = this.state?.sortIndex;
    const sortReverse = this.state?.sortReverse;
    if (sortIndex != undefined) {
      rows = [...rows];
      rows.sort((a, b) => {
        const av = a[sortIndex];
        const bv = b[sortIndex];
        let index = 0;
        if (typeof av === 'string' && typeof bv === 'string') {
          index = av.localeCompare(bv);
        } else if (typeof av === 'number' && typeof bv === 'number') {
          index = av - bv;
        } else {
          index = +av - +bv;
        }
        if (sortReverse) {
          index = -index;
        }
        return index;
      });
    }
    // Render
    return (
      <BoostrapTable striped bordered hover size="sm" variant="dark">
        <thead>{rows.slice(0, 1).map(this.onRenderHead)}</thead>
        <tbody>{rows.slice(1).map(this.onRenderBody)}</tbody>
      </BoostrapTable>
    );
  }
  onRenderHead = (row: TableCell[], index: number) => {
    return <tr key={index}>{this.onRenderCells(row, true)}</tr>;
  };
  onRenderBody = (row: TableCell[], index: number) => {
    return <tr key={index}>{this.onRenderCells(row, false)}</tr>;
  };
  onRenderCells(cells: TableCell[], clickable: boolean) {
    return cells.map((cell, index) => {
      return this.onRenderCell(cell, index, clickable);
    });
  }
  onRenderCell(cell: TableCell, index: number, clickable: boolean) {
    if (!clickable) {
      return <td key={index}>{cell?.toString()}</td>;
    }
    return (
      <th
        key={index}
        onClick={() => {
          this.onClickCell(index);
        }}
      >
        {cell?.toString()}
      </th>
    );
  }
}
