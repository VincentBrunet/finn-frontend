import React from "react";

import { BrowserRouter } from "react-router-dom";

import { Component } from "./Component";

import { Navigation } from "./navigation/Navigation";

import { Root } from "./interface/Root";

export class Application extends Component {
  onRender() {
    return (
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    );
  }
}
