import React from "react";

import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";

import { Component } from "../Component";

import { ScreenerTable } from "../pages/ScreenerTable";
import { TickerSummary } from "../pages/TickerSummary";
import { Scroll } from "../atomics/Scroll";

export class Content extends Component {
  onRender() {
    return (
      <Scroll>
        <Switch>
          <Route path="/screener/table" component={ScreenerTable} />
          <Route path="/ticker/summary/:code" component={TickerSummary} />
          <Route path="/">Root</Route>
        </Switch>
      </Scroll>
    );
  }
}
