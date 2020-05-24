import * as React from 'react';

export abstract class Component<
  Props = any | undefined,
  State = any | undefined
> extends React.Component<Props, State> {
  onRender(): React.ReactNode {
    return undefined;
  }

  onCreate() {}
  onDestroy() {}

  onUpdate() {}
  onUpdateProps() {}
  onUpdateState() {}

  componentDidMount() {
    this.onCreate();
    this.onUpdateProps();
    this.onUpdateState();
    this.onUpdate();
  }
  componentWillUnmount() {
    this.onDestroy();
  }
  shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<State>) {
    for (const key in nextProps) {
      const value = nextProps[key];
      if (value !== this.props[key]) {
        return true;
      }
    }
    if ((nextState === null) != (this.state === null)) {
      return true;
    } else {
      for (const key in nextState) {
        const value = nextState[key];
        if (value !== this.state[key]) {
          return true;
        }
      }
    }
    return false;
  }
  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>) {
    for (const key in prevProps) {
      const value = prevProps[key];
      if (value !== this.props[key]) {
        this.onUpdateProps();
        break;
      }
    }
    if ((prevState === null) != (this.state === null)) {
      this.onUpdateState();
    } else {
      for (const key in prevState) {
        const value = prevState[key];
        if (value !== this.state[key]) {
          this.onUpdateState();
          break;
        }
      }
    }
    this.onUpdate();
  }
  render() {
    return this.onRender();
  }
}
