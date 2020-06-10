import React from "react";

import { Component } from "../Component";

import { Box } from "../basics/Box";
import { FlexItem } from "../basics/FlexItem";

export interface CardProps {
  size?: "full" | "semi" | "quarter";
}

export class Card extends Component {
  onRender() {
    return (
      <FlexItem width="100%">
        <Box background="#686877" shadow="0 0 8px 0 rgba(0, 0, 0, 0.5)">
          {this.props.children}
        </Box>
      </FlexItem>
    );
  }
}
