import React from "react";

import { Component } from "../../Component";
import { Layout } from "../../atomics/Layout";

export interface PageBodyProps {}

export class PageBody extends Component<PageBodyProps> {
  onRender() {
    return (
      <Layout wrap={true} direction="row" padding="12px">
        {this.props.children}
      </Layout>
    );
  }
}
