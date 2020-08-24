import React from "react";

import { Component } from "../Component";

interface LayoutProps {
  direction?: "row" | "column" | "column-reverse" | "row-reverse";
  grow?: number;
  shrink?: number;
  wrap?: boolean;
  width?: number | string;
  height?: number | string;
  padding?: number | string;
  margin?: number | string;
}

export class Layout extends Component<LayoutProps> {
  onRender() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: this.props.direction,
          flexGrow: this.props.grow,
          flexShrink: this.props.shrink,
          flexWrap: this.props.wrap ? "wrap" : undefined,
          width: this.props.width,
          height: this.props.height,
          padding: this.props.padding,
          margin: this.props.margin,
        }}
      >
        {this.props.children}
      </div>
    );
  }
}
