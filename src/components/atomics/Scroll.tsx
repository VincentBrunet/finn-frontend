import React from "react";

import { Component } from "../Component";

interface ScrollProps {}

export class Scroll extends Component<ScrollProps> {
  onRender() {
    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          overflow: "auto",
        }}
      >
        {this.props.children}
      </div>
    );
  }
}
