import * as React from 'react';

import { BrowserRouter } from 'react-router-dom';

import { Component } from './Component';

import { Navigation } from './navigation/Navigation';
import { Navigated } from './navigation/Navigated';

export class Application extends Component {
  onRender() {
    return (
      <BrowserRouter>
        <Navigation />
        <Navigated />
      </BrowserRouter>
    );
  }
}
