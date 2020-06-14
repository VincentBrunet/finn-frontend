import React from "react";

import { Component } from "../Component";

interface LayoutProps {
  direction?: "row" | "column" | "column-reverse" | "row-reverse";
  grow?: number;
  shrink?: number;
  wrap?: boolean;
  width?: string;
  height?: string;
  padding?: number;
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
          minHeight: 0,
          minWidth: 0,
          padding: this.props.padding,
        }}
      >
        {this.props.children}
      </div>
    );
  }
}
