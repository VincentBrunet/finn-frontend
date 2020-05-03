import * as React from 'react';

interface WelcomeProps {
  name: string;
}

class Welcome extends React.Component<WelcomeProps> {
  render() {
    return <div>Bonjour2, {this.props.name}</div>;
  }
}

export class Application extends React.Component {
  render() {
    return (
      <div>
        <Welcome name={'vincent4'} />
      </div>
    );
  }
}
