import React from "react";

import { Component } from "../Component";

interface LabelProps {
  style?: "h1" | "body";
  text?: string;
  height?: string | number;
  width?: string | number;
}

export class Label extends Component<LabelProps> {
  onRender() {
    return <div style={{}}>{this.props.text}</div>;
  }
}
