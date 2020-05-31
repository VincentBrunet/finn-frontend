import React from "react";

import { Component } from "../Component";

import { Box } from "../basics/Box";

export class Menu extends Component {
  onRender() {
    return (
      <Box background="#20253E" shadow="0 0 8px 0 rgba(0, 0, 0, 0.5)">
        Hello!
      </Box>
    );
  }
}
