import React from "react";

import { Link } from "react-router-dom";

import { Component } from "../Component";

import { Box } from "../atomics/Box";
import { Colors } from "../../services/utils/Colors";

export class Menu extends Component {
  onRender() {
    return (
      <Box
        background={Colors.Surfaces.Menu}
        shadow={`0 0 8px 0 ${Colors.Effects.Shadow}`}
      >
        <ul>
          <li>
            <Link to="/">Root</Link>
          </li>
          <li>
            <Link to="/screener/table">Screener table</Link>
          </li>
          <li>
            <Link to="/ticker/summary/AAPL">AAPL</Link>
          </li>
          <li>
            <Link to="/ticker/summary/SNAP">SNAP</Link>
          </li>
        </ul>
      </Box>
    );
  }
}
