import * as React from 'react';

import { ScreenerTable } from './ScreenerTable';

import 'bootstrap/dist/css/bootstrap.min.css';

interface WelcomeProps {
  name: string;
}

class Welcome extends React.Component<WelcomeProps> {
  render() {
    return <div>Bonjour, {this.props.name}</div>;
  }
}

export class Application extends React.Component {
  render() {
    return (
      <div>
        <Welcome name="vincent" />
        <ScreenerTable />
      </div>
    );
  }
}
