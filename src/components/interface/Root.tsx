import React from "react";

import { Component } from "../Component";
import { Content } from "./Content";
import { Menu } from "./Menu";

import { FlexContainer } from "../basics/FlexContainer";
import { FlexItem } from "../basics/FlexItem";
import { Box } from "../basics/Box";

/*
background: rgb(52,125,173);
background: linear-gradient(135deg, rgba(52,125,173,1) 0%, rgba(46,167,166,1) 100%);
*/

const gradient =
  "linear-gradient(135deg, rgba(52,125,173,1) 0%, rgba(46,167,166,1) 100%)";

export class Root extends Component {
  onRender() {
    return (
      <Box background={gradient} width="100%" height="100%">
        <FlexContainer direction="row" width="100%" height="100%">
          <FlexItem width="200px" grow={0} shrink={0}>
            <Menu />
          </FlexItem>
          <FlexItem grow={1} shrink={1}>
            <Content />
          </FlexItem>
        </FlexContainer>
      </Box>
    );
  }
}
