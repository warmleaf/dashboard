import React, { Component } from 'react';
import { withTheme } from 'styled-components';
import Flex from '../../components/flex';
import Base from '../../components/base';
import Button from '../../components/button';
import Sheet from './sheet';

export default class Upload extends Component {
  render() {
    const { rest } = this.props;
    return (
      <Flex column {...rest} p="15px 20px">
        <Steps />
        <Sheet />
        <Flex pt="20px">
          <Button>取消并关闭页面</Button>
        </Flex>
      </Flex>
    );
  }
}

const Steps = withTheme(({ theme }) => (
  <Flex pt="25px" mb="30px" hc vc>
    <Flex hc>
      <Base.Div
        width="28px"
        height="28px"
        bora="30px"
        lihe="28px"
        teal="center"
        color="#fff"
        mari="10px"
        baco={theme.primaryColor}
      >
        1
      </Base.Div>
      <Base.Span>上传文件</Base.Span>
    </Flex>
    <Base.Div height="2px" width="180px" male="20px" mari="20px" baco="rgba(0,0,0,.2)" />
    <Flex hc>
      <Base.Div
        width="28px"
        height="28px"
        bora="30px"
        lihe="28px"
        teal="center"
        color="#fff"
        mari="10px"
        baco={theme.primaryColor}
      >
        2
      </Base.Div>
      <Base.Span>导入数据</Base.Span>
    </Flex>
  </Flex>
));
