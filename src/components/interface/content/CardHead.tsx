import React from "react";

import { Colors } from "../../../services/utils/Colors";
import { Component } from "../../Component";
import { Box } from "../../atomics/Box";
import { Label } from "../../atomics/Label";
import { Layout } from "../../atomics/Layout";

export interface CardHeadProps {
  title?: string;
}

export class CardHead extends Component<CardHeadProps> {
  onRender() {
    return (
      <Layout>
        <Box borderTop={"5px solid " + Colors.Specs.Delimiter}>
          <Layout padding={"8px"}>
            <Label text={this.props.title} lines={1} />
          </Layout>
        </Box>
      </Layout>
    );
  }
}
