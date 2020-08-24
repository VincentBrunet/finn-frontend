import React from "react";

import { Component } from "../Component";

interface BoxProps {
  background?: string;
  shadow?: string;
  border?: string;
  borderRadius?: string | number;
}

export class Box extends Component<BoxProps> {
  onRender() {
    return (
      <div
        style={{
          background: this.props.background,
          boxShadow: this.props.shadow,
          border: this.props.border,
          borderRadius: this.props.borderRadius,
          width: "100%",
          height: "100%",
        }}
      >
        {this.props.children}
      </div>
    );
  }
}
