import React from "react";

import { Component } from "../Component";

import { Box } from "../atomics/Box";
import { Layout } from "../atomics/Layout";

import { Colors } from "../../services/utils/Colors";
import { Scroll } from "../atomics/Scroll";

export interface CardProps {}

export class Card extends Component {
  onRender() {
    return (
      <Layout padding={4} height="100%" width="100%">
        <Box background={Colors.Surfaces.Card}>{this.props.children}</Box>
      </Layout>
    );
  }
}
