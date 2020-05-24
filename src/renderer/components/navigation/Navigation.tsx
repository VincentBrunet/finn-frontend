import * as React from 'react';

import { Link } from 'react-router-dom';

import { Component } from '../Component';

export class Navigation extends Component {
  onRender() {
    return (
      <ul>
        <li>
          <Link to="/hello">Hello</Link>
        </li>
        <li>
          <Link to="/">Root</Link>
        </li>
        <li>
          <Link to="/screener/42">Screener</Link>
        </li>
      </ul>
    );
  }
}
