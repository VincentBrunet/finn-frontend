import React from "react";

import { Component } from "../Component";

interface LabelProps {
  style?: "h1" | "body";
  text?: string;
  lines?: number;
}

export class Label extends Component<LabelProps> {
  onRender() {
    return (
      <div
        className="label"
        style={{
          maxLines: this.props.lines,
        }}
      >
        {this.props.text}
      </div>
    );
  }
}
