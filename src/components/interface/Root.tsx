import React from "react";

import { Colors } from "../../services/utils/Colors";
import { Component } from "../Component";
import { Box } from "../atomics/Box";
import { Layout } from "../atomics/Layout";
import { Responsive } from "../atomics/Responsive";
import { Switcher } from "./content/Switcher";
import { MenuSide } from "./navigation/MenuSide";

export class Root extends Component {
  onRender() {
    return (
      <Box background={Colors.Surfaces.Root}>
        <Layout direction="row" width="100%" height="100%">
          <Responsive
            visible={{ xs: false, sm: true }}
            width={{ sm: 150, md: 250, lg: 300 }}
          >
            <MenuSide />
          </Responsive>
          <Layout grow={1} shrink={1}>
            <Switcher />
          </Layout>
        </Layout>
      </Box>
    );
  }
}
