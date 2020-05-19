import * as React from 'react';

import { BrowserRouter } from 'react-router-dom';

import { Navigation } from './Navigation';
import { Navigated } from './Navigated';

export class Application extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Navigation />
        <Navigated />
      </BrowserRouter>
    );
  }
}
