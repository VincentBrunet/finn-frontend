import React from "react";

import { Component } from "../Component";

interface BoxProps {
  background?: string;
  shadow?: string;
  border?: string;
  borderTop?: string;
  borderRight?: string;
  borderBottom?: string;
  borderLeft?: string;
  borderRadius?: string | number;
}

export class Box extends Component<BoxProps> {
  onRender() {
    return (
      <div
        className="box"
        style={{
          background: this.props.background,
          boxShadow: this.props.shadow,
          border: this.props.border,
          borderTop: this.props.borderTop,
          borderRight: this.props.borderRight,
          borderBottom: this.props.borderBottom,
          borderLeft: this.props.borderLeft,
          borderRadius: this.props.borderRadius,
        }}
      >
        {this.props.children}
      </div>
    );
  }
}
