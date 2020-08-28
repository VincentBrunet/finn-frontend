import React from "react";

import { Component } from "../../Component";
import { Label } from "../../atomics/Label";
import { Layout } from "../../atomics/Layout";

export interface PageHeadProps {
  title?: string;
}

export class PageHead extends Component<PageHeadProps> {
  onRender() {
    return (
      <Layout padding="24px 24px 6px 24px" width="100%" height="auto">
        <Label text={this.props.title} />
      </Layout>
    );
  }
}
