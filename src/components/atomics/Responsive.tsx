import React from "react";

import { Component } from "../Component";

let size = 0;
const listeners = new Map<string, Responsive>();
function onResize() {
  let width = typeof window !== "undefined" ? window.innerWidth : 0;
  if (width > 2100) {
    size = 5;
  } else if (width > 1700) {
    size = 4;
  } else if (width > 1300) {
    size = 3;
  } else if (width > 700) {
    size = 2;
  } else if (width > 400) {
    size = 1;
  } else {
    size = 0;
  }
  listeners.forEach((responsive: Responsive) => {
    responsive.setState({
      size: size,
    });
  });
}
onResize();
let timeout: NodeJS.Timeout | undefined;
window.addEventListener("resize", () => {
  if (timeout) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(() => {
    onResize();
  }, 100);
});

interface ResponsiveRange<T> {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  hd?: T;
}
function resolve<T>(range: ResponsiveRange<T> | undefined) {
  if (range === undefined) {
    return undefined;
  }
  const values = [range.xs, range.sm, range.md, range.lg, range.xl, range.hd];
  for (let i = size; i >= 0; i--) {
    const value = values[i];
    if (value !== undefined) {
      return value;
    }
  }
  return undefined;
}

interface ResponsiveProps {
  visible?: ResponsiveRange<boolean>;
  width?: ResponsiveRange<string | number>;
  height?: string;
}
interface ResponsiveState {
  size?: number;
}

export class Responsive extends Component<ResponsiveProps, ResponsiveState> {
  onCreate() {
    listeners.set(this.id, this);
  }
  onDestroy() {
    listeners.delete(this.id);
  }
  onRender() {
    const visible = resolve(this.props.visible);
    if (visible === false) {
      return [];
    }
    const width = resolve(this.props.width);
    return (
      <div
        style={{
          width: width,
          height: this.props.height,
        }}
      >
        {this.props.children}
      </div>
    );
  }
}
