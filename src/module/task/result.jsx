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
        <Flex />
        <TabList origin="result">
          <Flex>result1</Flex>
          <Flex>result2</Flex>
          <Flex>result3</Flex>
        </TabList>
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
