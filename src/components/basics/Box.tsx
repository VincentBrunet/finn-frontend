import React from "react";

import { Component } from "../Component";

export interface BoxProps {
  background?: string;
  shadow?: string;
}

export class Box extends Component<BoxProps> {
  onRender() {
    return (
      <div
        style={{
          background: this.props.background,
          boxShadow: this.props.shadow,
        }}
      >
        {this.props.children}
      </div>
    );
  }
}
