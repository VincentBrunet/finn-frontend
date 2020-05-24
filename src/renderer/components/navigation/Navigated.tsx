import * as React from 'react';

import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';

import { ScreenerTable } from '../pages/ScreenerTable';

import { Component } from '../Component';

export class Navigated extends Component {
  onRender() {
    return (
      <Switch>
        <Route path="/hello">Hello</Route>
        <Route path="/screener/:value" component={ScreenerTable} />
        <Route path="/">Root</Route>
      </Switch>
    );
  }
}
