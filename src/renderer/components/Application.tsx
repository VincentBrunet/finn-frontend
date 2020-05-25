import * as React from 'react';

import { BrowserRouter } from 'react-router-dom';

import { Component } from './Component';
import { ScreenerTable } from './pages/ScreenerTable';
import { TickerSummary } from './pages/TickerSummary';

export class Application extends Component {
  onRender() {
    return (
      <BrowserRouter>
        <TickerSummary />
        <ScreenerTable />
      </BrowserRouter>
    );
  }
}
