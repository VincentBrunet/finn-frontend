import React from "react";

import { Component } from "../../Component";
import { Layout } from "../../atomics/Layout";

export interface CardBodyProps {}

export class CardBody extends Component<CardBodyProps> {
  onRender() {
    return <Layout padding="8px">{this.props.children}</Layout>;
  }
}
