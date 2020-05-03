import { hot } from 'react-hot-loader/root';
import * as React from 'react';

interface WelcomeProps {
  name: string;
}

class Welcome extends React.Component<WelcomeProps> {
  render() {
    return <h1>Bonjour, {this.props.name}</h1>;
  }
}

class Application extends React.Component {
  render() {
    return (
      <div>
        <Welcome name={'vincent'} />
      </div>
    );
  }
}

export default hot(Application);
