import React from "react";

import { Link } from "react-router-dom";

import { Component } from "../../Component";

import { Box } from "../../atomics/Box";
import { Label } from "../../atomics/Label";

import { Colors } from "../../../services/utils/Colors";
import { Layout } from "../../atomics/Layout";

export interface MenuSideItemProps {
  route: string;
  text: string;
  current?: boolean;
}

export class MenuSideItem extends Component<MenuSideItemProps> {
  onRender() {
    return (
      <Layout width="80%" margin="0 10%" padding={10}>
        <Link to={this.props.route} style={{ width: "100%" }}>
          <Box
            background={this.props.current ? Colors.Surfaces.Root : undefined}
          >
            <Label text={this.props.text} />
          </Box>
        </Link>
      </Layout>
    );
  }
}
