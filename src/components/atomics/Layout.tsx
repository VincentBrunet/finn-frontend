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
  onClick?: () => void;
}

export class Layout extends Component<LayoutProps> {
  onRender() {
    const props = this.props;
    const style: CSSProperties = {
      flexDirection: props.direction,
      flexGrow: props.grow,
      flexShrink: props.shrink,
      flexWrap: props.wrap ? "wrap" : undefined,
      width: props.width,
      height: props.height,
      padding: props.padding,
      margin: props.margin,
    };
    return (
      <div className="layout" style={style} onClick={props.onClick}>
        {this.props.children}
      </div>
    );
  }
}
