import React, { Component } from 'react';
import Portal from '../../app/portal';
import Flex from '../../components/flex';
import Base from '../../components/base';
import Button from '../../components/button';

const TaskList = ({}) => (
  <Portal width="800px" column size="14px">
    <Base.Span height="48px" lihe="48px" pale="20px">
      提交定时任务
    </Base.Span>
    <Flex column bt="1px solid rgba(0,0,0,.08)" bb="1px solid rgba(0,0,0,.08)" p="20px">
      <Base.Span fowe="700" pabo="10px">
        基本属性
      </Base.Span>
      <Flex bgc="rgba(0,0,0,.03)" w="100%" p="20px 40px" />
      <Base.Span fowe="700" pabo="10px" pato="20px">
        调度属性
      </Base.Span>
      <Flex bgc="rgba(0,0,0,.03)" w="100%" p="20px 40px" />
    </Flex>
    <Flex vc="flex-end" h="48px" pl="20px" pr="20px">
      <Button primary>关闭</Button>
    </Flex>
  </Portal>
);
export default TaskList;
