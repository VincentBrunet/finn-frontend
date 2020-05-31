import React from "react";

import { Component } from "../Component";

export interface FlexContainerProps {
  direction?: "row" | "column" | "column-reverse" | "row-reverse" | undefined;
  width?: string;
  height?: string;
}

export class FlexContainer extends Component<FlexContainerProps> {
  onRender() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: this.props.direction,
          height: this.props.height,
          width: this.props.width,
        }}
      >
        {this.props.children}
      </div>
    );
  }
}
