import React, { CSSProperties } from "react";

import { Component } from "../Component";

interface LayoutProps {
  direction?: "row" | "column" | "column-reverse" | "row-reverse";
  grow?: number;
  shrink?: number;
  wrap?: boolean;
  width?: string;
  height?: string;
  padding?: string;
  margin?: string;
}

export class Layout extends Component<LayoutProps> {
  onRender() {
    const style: CSSProperties = {
      flexDirection: this.props.direction,
      flexGrow: this.props.grow,
      flexShrink: this.props.shrink,
      flexWrap: this.props.wrap ? "wrap" : undefined,
      width: this.props.width,
      height: this.props.height,
      padding: this.props.padding,
      margin: this.props.margin,
    };
    return (
      <div className="layout" style={style}>
        {this.props.children}
      </div>
    );
  }
}
