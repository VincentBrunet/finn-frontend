import React from "react";

import { Link } from "react-router-dom";

import { Component } from "../Component";

import { Box } from "../basics/Box";

export class Menu extends Component {
  onRender() {
    return (
      <Box
        background="#20253E"
        shadow="0 0 8px 0 rgba(0, 0, 0, 0.5)"
        height="100%"
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
