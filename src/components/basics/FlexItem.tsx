import React from "react";

import { Component } from "../Component";

export interface FlexItemProps {
  grow?: number;
  shrink?: number;
  width?: string;
  height?: string;
  padding?: string;
  margin?: string;
}

export class FlexItem extends Component<FlexItemProps> {
  onRender() {
    return (
      <div
        style={{
          flexGrow: this.props.grow,
          flexShrink: this.props.shrink,
          height: this.props.height,
          width: this.props.width,
          padding: this.props.padding,
          margin: this.props.margin,
        }}
      >
        {this.props.children}
      </div>
    );
  }
}
