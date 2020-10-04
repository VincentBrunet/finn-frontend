import React from "react";

import { Component } from "../Component";
import { Layout } from "../atomics/Layout";

export interface TableProps<T> {
  head?: JSX.Element[];

  body: T[][];

  score?: (v: T, row: number, column: number) => number;
  render: (v: T, row: number, column: number) => JSX.Element;

  pageItems?: number;
  pageCurrent?: number;
}

interface TableState {
  body?: TableCell[][];

  sortIndex?: number;
  sortReverse?: boolean;
}

interface TableCell {
  score: number;
  render: JSX.Element;
}

export class Table<T> extends Component<TableProps<T>, TableState> {
  state: TableState = {};

  onUpdateProps() {
    // Render
    const data = this.props.body ?? [];
    const score = this.props.score;
    const render = this.props.render;
    const body = [];
    for (let i = 0; i < data.length; i++) {
      const cellRow = [];
      const row = data[i];
      for (let j = 0; j < row.length; j++) {
        const col = row[j];
        cellRow.push({
          score: score ? score(col, i, j) : 0,
          render: render(col, i, j),
        });
      }
      body.push(cellRow);
    }
    this.setState({
      body: body,
    });
  }

  onRender() {
    let body = this.state.body ?? [];
    // Sort
    const sortIndex = this.state.sortIndex;
    const sortReverse = this.state.sortReverse;
    if (sortIndex !== undefined) {
      body = [...body];
      body.sort((a, b) => {
        const av = a[sortIndex];
        const bv = b[sortIndex];
        let diff = 0;
        diff = av.score - bv.score;
        if (sortReverse) {
          diff = -diff;
        }
        return diff;
      });
    }
    // Paginate
    const pageCurrent = this.props.pageCurrent ?? 0;
    const pageItems = this.props.pageItems;
    if (pageItems) {
      const rowStart = pageCurrent * pageItems;
      const rowEnd = rowStart + pageItems;
      body = body.slice(rowStart, rowEnd) ?? [];
    }

    const head = this.props.head ?? [];

    const columns: JSX.Element[][] = [];

    for (let i = 0; i < head.length; i++) {
      const column: JSX.Element[] = [];
      column.push(this.onRenderHead(head[i], i));
      for (let j = 0; j < body.length; j++) {
        column.push(this.onRenderBody(body[j][i].render, j));
      }
      columns.push(column);
    }

    return (
      <Layout direction="row" grow={1}>
        {columns.map((column, index) => {
          return (
            <Layout key={index} direction="column" grow={1}>
              {column}
            </Layout>
          );
        })}
      </Layout>
    );
  }

  onRenderHead = (head: JSX.Element, index: number) => {
    const onClick = () => {
      this.onClickHead(index);
    };
    return (
      <Layout key={-1} onClick={onClick}>
        {head}
      </Layout>
    );
  };

  onRenderBody = (body: JSX.Element, index: number) => {
    return <Layout key={index}>{body}</Layout>;
  };

  onClickHead = (column: number) => {
    this.setState({
      sortIndex: column,
      sortReverse:
        this.state?.sortIndex === column && this.state?.sortReverse === false,
    });
  };

  /*
  onRenderCells(cells: TableCell[], clickable: boolean) {
    return cells.map((cell, index) => {
      return this.onRenderCell(cell, index, clickable);
    });
  }
  onRenderCell(cell: TableCell, index: number, clickable: boolean) {
    let onClick: (() => void) | undefined = undefined;
    if (clickable) {
      onClick = () => {
        this.onClickHead(index);
      };
    }
    const Tag = clickable ? "th" : "td";
    return (
      <Tag
        style={{
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          paddingLeft: "5px",
          paddingRight: "5px",
          borderTop: "1px solid #eee",
          textAlign: cell.number !== undefined ? "right" : "left",
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
  */
}
