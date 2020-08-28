import React from "react";

import { Subscription } from "../../services/rx/Subscription";
import { Display } from "../../services/utils/Display";
import { Component } from "../Component";

interface ResponsiveRange<T> {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  hd?: T;
  default?: T;
}
interface ResponsiveProps {
  visible?: ResponsiveRange<boolean>;
  width?: ResponsiveRange<string | number>;
  height?: ResponsiveRange<string | number>;
}
interface ResponsiveState {
  size: number;
}

export class Responsive extends Component<ResponsiveProps, ResponsiveState> {
  sub?: Subscription;
  state = {
    size: Display.size.get(),
  };
  onCreate() {
    this.sub = Display.size.subscribe((size) => {
      this.setState({
        size: size,
      });
    });
  }
  onDestroy() {
    if (this.sub) {
      this.sub.dispose();
      this.sub = undefined;
    }
  }
  onRender() {
    const visible = this.resolve(this.props.visible);
    if (visible === false) {
      return [];
    }
    const width = this.resolve(this.props.width);
    const height = this.resolve(this.props.height);
    return (
      <div
        className="responsive"
        style={{
          width: width,
          height: height,
        }}
      >
        {this.props.children}
      </div>
    );
  }
  resolve<T>(range: ResponsiveRange<T> | undefined) {
    if (range === undefined) {
      return undefined;
    }
    const values = [range.xs, range.sm, range.md, range.lg, range.xl, range.hd];
    for (let i = this.state.size; i >= 0; i--) {
      const value = values[i];
      if (value !== undefined) {
        return value;
      }
    }
    return range.default;
  }
}
