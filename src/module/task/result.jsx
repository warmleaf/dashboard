import React, { Component } from 'react';
import Flex from '../../components/flex';
import Base from '../../components/base';
import TabList from '../../app/tabs/tab_list';
import TabContainer from '../../app/tabs/tab_container';

export default class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Flex full column>
        <Flex vc="space-between">
          <TabList origin="result">
            <Flex p="6px 20px" bobo="2px solid #6991FF">result1</Flex>
            <Flex p="6px 20px" bobo="2px solid #6991FF">result2</Flex>
            <Flex p="6px 20px" bobo="2px solid #6991FF">result3</Flex>
          </TabList>
          <Flex vc hc>
            <Base.Span pari="4px">进度:</Base.Span>
            <Base.Span pari="20px">32%</Base.Span>
            <Base.Span pari="4px">耗时:</Base.Span>
            <Base.Span pari="20px">65s</Base.Span>
          </Flex>
        </Flex>
        <TabContainer full origin="result">
          <Flex full owner="log">
            <Base.Pre baco="#000" color="#fff" mato="0" mabo="0" width="100%">
              result
            </Base.Pre>
          </Flex>
          <Flex owner="r1">result 1</Flex>
          <Flex owner="r2">result 2</Flex>
        </TabContainer>
      </Flex>
    );
  }
}
