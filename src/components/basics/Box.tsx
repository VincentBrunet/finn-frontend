import React from "react";

import { Component } from "../Component";

export interface BoxProps {
  background?: string;
  shadow?: string;
  width?: string;
  height?: string;
}

export class Box extends Component<BoxProps> {
  onRender() {
    return (
      <div
        style={{
          background: this.props.background,
          boxShadow: this.props.shadow,
          width: this.props.width,
          height: this.props.height,
        }}
      >
        {this.props.children}
      </div>
    );
  }
}
