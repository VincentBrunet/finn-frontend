import * as React from 'react';

import { Link } from 'react-router-dom';

export class Navigation extends React.Component {
  render() {
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
