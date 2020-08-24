import React from "react";

import { Component } from "../Component";
import { Content } from "./Content";
import { MenuSide } from "./navigation/MenuSide";

import { Box } from "../atomics/Box";

import { Layout } from "../atomics/Layout";

import { Colors } from "../../services/utils/Colors";
import { Responsive } from "../atomics/Responsive";

export class Root extends Component {
  onRender() {
    return (
      <Box background={Colors.Surfaces.Root}>
        <Layout direction="row" height="100%" width="100%">
          <Responsive
            visible={{ xs: false, sm: true }}
            height={{ default: "100%" }}
            width={{ sm: 100, md: 200, lg: 300 }}
          >
            <MenuSide />
          </Responsive>
          <Layout grow={1} shrink={1}>
            <Content />
          </Layout>
        </Layout>
      </Box>
    );
  }
}
