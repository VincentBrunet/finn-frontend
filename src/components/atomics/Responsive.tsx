import React from "react";

import { Component } from "../Component";

const sizes = new Map<string, number>();
sizes.set("xs", 0);
sizes.set("sm", 1);
sizes.set("md", 2);
sizes.set("lg", 3);
sizes.set("xl", 4);

let size = 0;
const listeners = new Map<string, Responsive>();
function onResize() {
  let width = typeof window !== "undefined" ? window.innerWidth : 0;
  if (width > 1500) {
    size = 4;
  } else if (width > 1024) {
    size = 3;
  } else if (width > 800) {
    size = 2;
  } else if (width > 320) {
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
window.addEventListener("resize", onResize);

interface ResponsiveProps {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
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
    const values = [
      this.props.xs,
      this.props.sm,
      this.props.md,
      this.props.lg,
      this.props.xl,
    ];
    let width: string | undefined = undefined;
    for (let i = size; i > 0; i--) {
      const value = values[i];
      if (value) {
        width = `${value}%`;
        break;
      }
    }
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
