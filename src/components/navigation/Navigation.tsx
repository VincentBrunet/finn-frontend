import * as React from 'react';

import { Link } from 'react-router-dom';

import { Component } from '../Component';

export class Navigation extends Component {
  onRender() {
    return (
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
    );
  }
}
