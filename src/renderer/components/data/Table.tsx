import * as React from 'react';

import { Component } from '../Component';

import * as ReactBoostrap from 'react-bootstrap';

export interface TableCell {
  value?: number | string;
  unit?: string;
}
export interface TableProps {
  head?: TableCell[];
  body?: TableCell[][];
}

interface TableState {
  sortIndex?: number;
  sortReverse?: boolean;
}

export class Table extends Component<TableProps, TableState> {
  onClickCell = (column: number) => {
    this.setState({
      sortIndex: column,
      sortReverse: this.state?.sortIndex === column && this.state?.sortReverse === false
    });
  };

  onRender() {
    let body = this.props.body || [];
    // Sorting optionally
    const sortIndex = this.state?.sortIndex;
    const sortReverse = this.state?.sortReverse;
    if (sortIndex != undefined) {
      body = [...body];
      body.sort((a, b) => {
        const av = a[sortIndex].value;
        const bv = b[sortIndex].value;
        let diff = 0;
        if (typeof av === 'string' && typeof bv === 'string') {
          diff = av.localeCompare(bv);
        } else if (typeof av === 'number' && typeof bv === 'number') {
          diff = av - bv;
        } else {
          diff = +(av ?? 0) - +(bv ?? 0);
        }
        if (sortReverse) {
          diff = -diff;
        }
        return diff;
      });
    }
    // Render
    return (
      <ReactBoostrap.Table striped bordered hover size="sm" variant="dark">
        <thead>{this.onRenderHead(this.props.head)}</thead>
        <tbody>{body.map(this.onRenderBody)}</tbody>
      </ReactBoostrap.Table>
    );
  }
  onRenderHead = (cells?: TableCell[]) => {
    if (cells) {
      return <tr>{this.onRenderCells(cells, true)}</tr>;
    }
  };
  onRenderBody = (cells: TableCell[], index: number) => {
    return <tr key={index}>{this.onRenderCells(cells, false)}</tr>;
  };
  onRenderCells(cells: TableCell[], clickable: boolean) {
    return cells.map((cell, index) => {
      return this.onRenderCell(cell, index, clickable);
    });
  }
  onRenderCell(cell: TableCell, index: number, clickable: boolean) {
    if (!clickable) {
      return (
        <td key={index}>
          {cell?.value?.toString()}
          {cell?.unit}
        </td>
      );
    }
    return (
      <th
        key={index}
        onClick={() => {
          this.onClickCell(index);
        }}
      >
        {cell?.value?.toString()}
        {cell?.unit}
      </th>
    );
  }
}
