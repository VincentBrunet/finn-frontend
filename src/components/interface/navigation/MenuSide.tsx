import React from "react";

import { Link } from "react-router-dom";

import { Component } from "../../Component";

import { Box } from "../../atomics/Box";

import { Colors } from "../../../services/utils/Colors";

import { MenuSideItem } from "./MenuSideItem";

export class MenuSide extends Component {
  onRender() {
    return (
      <Box
        background={Colors.Surfaces.Menu}
        shadow={`0 0 8px 0 ${Colors.Effects.Shadow}`}
      >
        <MenuSideItem current route="/screener/table" text="Screener table" />
        <MenuSideItem route="/" text="Root" />
        <MenuSideItem route="/ticker/summary/AAPL.US" text="AAPL.US" />
        <MenuSideItem route="/ticker/summary/SNAP.US" text="SNAP.US" />
      </Box>
    );
  }
}
