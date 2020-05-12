import axios from 'axios';

import * as React from 'react';

import Table from 'react-bootstrap/Table';

interface ScreenerTableProps {}
interface ScreenerTableState {
  columns: any[];
  rows: any[][];
}

export class ScreenerTable extends React.Component<ScreenerTableProps, ScreenerTableState> {
  constructor(props: ScreenerTableProps) {
    super(props);
    this.state = {
      columns: [],
      rows: []
    };
  }

  async componentDidUpdate(prevProps: ScreenerTableProps, prevState: ScreenerTableState) {
    /*
    if (prevProps.text !== this.props.text) {
      this.updateAndNotify();
    }
    */
  }

  async componentDidMount() {
    const result = await axios.get('http://127.0.0.1:3000/screener/table');
    this.setState({
      columns: result.data.columns,
      rows: result.data.rows
    });
  }

  onClickColumn = (idx: number) => {
    console.log('Clicked', this);

    const rows = this.state.rows;
    rows.sort((a, b) => {
      return b[idx + 1] - a[idx + 1];
    });
    this.setState({
      rows: rows
    });
  };

  render() {
    return (
      <div
        style={{
          padding: '5px'
        }}
      >
        <Table striped bordered hover size="sm" variant="dark">
          <thead>
            <tr>
              <th>TICKER</th>
              <th>NAME</th>
              {this.state.columns.map((column, idx) => {
                return (
                  <th
                    key={idx}
                    onClick={() => {
                      this.onClickColumn(idx);
                    }}
                  >
                    {column.metric.identifier}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {this.state.rows.map((row, rowIdx) => {
              return (
                <tr key={rowIdx}>
                  {row.map((column, columnIdx) => {
                    if (columnIdx === 0) {
                      return [
                        <td key="symbol">{column.symbol}</td>,
                        <td key="name">{column.name}</td>
                      ];
                    } else {
                      return <td key={rowIdx + ':' + columnIdx}>{JSON.stringify(column)}</td>;
                    }
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}
