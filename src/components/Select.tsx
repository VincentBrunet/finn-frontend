import * as React from 'react';

import Form from 'react-bootstrap/Form';

export interface SelectProps {
  options: [string, any][];
}
export interface SelectState {
  selected?: string;
}

export class Select extends React.Component<SelectProps, SelectState> {
  render() {
    return (
      <Form.Control as="select" size="lg">
        {[
          this.props.options.map(option => {
            return <option key={option[0]}>{option[0]}</option>;
          })
        ]}
      </Form.Control>
    );
  }
}
