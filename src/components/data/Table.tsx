import React from "react";

import { Component } from "../Component";

export interface TableCell {
  text?: string;
  number?: number;
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
      sortReverse:
        this.state?.sortIndex === column && this.state?.sortReverse === false,
    });
  };

  onRender() {
    let body = this.props.body || [];
    // Sorting optionally
    const sortIndex = this.state?.sortIndex;
    const sortReverse = this.state?.sortReverse;
    if (sortIndex !== undefined) {
      body = [...body];
      body.sort((a, b) => {
        const av = a[sortIndex];
        const bv = b[sortIndex];
        let diff = 0;
        if (av.text !== undefined && bv.text !== undefined) {
          diff = av.text.localeCompare(bv.text);
        } else if (av.number !== undefined && bv.number !== undefined) {
          diff = av.number - bv.number;
        } else {
          diff = +(av.number ?? 0) - +(bv.number ?? 0);
        }
        if (sortReverse) {
          diff = -diff;
        }
        return diff;
      });
    }
    // Render
    return (
      <table>
        <thead>{this.onRenderHead(this.props.head)}</thead>
        <tbody>{body.map(this.onRenderBody)}</tbody>
      </table>
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
    let onClick: (() => void) | undefined = undefined;
    if (clickable) {
      onClick = () => {
        this.onClickCell(index);
      };
    }
    const Tag = clickable ? "th" : "td";
    return (
      <Tag
        style={{
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          textAlign: cell.number !== undefined ? "right" : undefined,
        }}
        key={index}
        onClick={onClick}
      >
        {this.onRenderText(cell)}
      </Tag>
    );
  }
  onRenderText(cell: TableCell) {
    const text = cell.text ?? "";
    const unit = cell.unit ?? "";
    let number = "";
    if (cell.number !== undefined) {
      number = cell.number.toLocaleString();
    }
    return text + number + " " + unit;
  }
}
