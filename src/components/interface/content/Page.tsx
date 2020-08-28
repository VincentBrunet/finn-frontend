import React from "react";

import { Component } from "../../Component";
import { Scroll } from "../../atomics/Scroll";

export interface PageProps {}

export class Page extends Component<PageProps> {
  onRender() {
    return (
      <Scroll x={true} y={true}>
        {this.props.children}
      </Scroll>
    );
  }
}
