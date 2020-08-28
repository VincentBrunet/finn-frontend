import React from "react";

import { Component } from "../Component";

interface ScrollProps {
  x?: boolean;
  y?: boolean;
}

export class Scroll extends Component<ScrollProps> {
  onRender() {
    return (
      <div
        className="scroll"
        style={{
          overflowX: this.props.x ? "auto" : "hidden",
          overflowY: this.props.y ? "auto" : "hidden",
        }}
      >
        {this.props.children}
      </div>
    );
  }
}
