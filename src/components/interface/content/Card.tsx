import React from "react";

import { Colors } from "../../../services/utils/Colors";
import { Component } from "../../Component";
import { Box } from "../../atomics/Box";
import { Layout } from "../../atomics/Layout";

export interface CardProps {}

export class Card extends Component<CardProps> {
  onRender() {
    return (
      <Layout padding="12px">
        <Box
          background={Colors.Surfaces.Card}
          shadow={`0 0 8px 0 ${Colors.Effects.Shadow}`}
        >
          {this.props.children}
        </Box>
      </Layout>
    );
  }
}
