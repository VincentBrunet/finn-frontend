import * as React from 'react';

import { BrowserRouter } from 'react-router-dom';

import { Navigation } from './navigation/Navigation';
import { Navigated } from './navigation/Navigated';

import { Component } from './Component';
import { ScreenerTable } from './pages/ScreenerTable';

export class Application extends Component {
  onRender() {
    return (
      <BrowserRouter>
        <Navigation />
        <Navigated />
        <ScreenerTable />
      </BrowserRouter>
    );
  }
}
