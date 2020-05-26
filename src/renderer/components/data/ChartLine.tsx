import * as React from 'react';

import { Component } from '../Component';

import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer
} from 'recharts';

export interface ChartLinePoint {
  x: number;
  y: number;
}
export interface ChartLineSerie {
  name: string;
  unit?: string;
  points: ChartLinePoint[];
}
export interface ChartLineProps {
  series?: ChartLineSerie[];
  formatter?: (value: string | number) => string;
}

interface ChartLineState {}

export class ChartLine extends Component<ChartLineProps, ChartLineState> {
  onRender() {
    const count = this.props.series?.length ?? 0;
    if (count <= 0) {
      return undefined;
    }
    return (
      <ResponsiveContainer debounce={100}>
        <LineChart>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="x" hide={true} />
          <YAxis dataKey="y" />
          <Tooltip
            isAnimationActive={false}
            labelFormatter={this.props.formatter}
            wrapperStyle={{ zIndex: 1000 }}
            allowEscapeViewBox={{
              x: false,
              y: true
            }}
          />
          {count > 1 ? <Legend /> : undefined}
          {this.props.series?.map(s => (
            <Line
              isAnimationActive={false}
              dataKey="y"
              unit={' ' + s.unit ?? ''}
              data={s.points}
              name={s.name}
              key={s.name}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
