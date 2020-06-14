import React from "react";

import { Component } from "../Component";
import { Content } from "./Content";
import { Menu } from "./Menu";

import { Box } from "../atomics/Box";

import { Layout } from "../atomics/Layout";

import { Colors } from "../../services/utils/Colors";

export class Root extends Component {
  onRender() {
    return (
      <Box background={Colors.Surfaces.Root}>
        <Layout direction="row" height="100%" width="100%">
          <Layout width="200px" shrink={0} grow={0}>
            <Menu />
          </Layout>
          <Layout grow={1} shrink={1}>
            <Content />
          </Layout>
        </Layout>
      </Box>
    );
  }
}
