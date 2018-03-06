import 'react-day-picker/lib/style.css';
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import Switch from 'react-switch';
import Portal from '../../../app/portal';
import Flex from '../../../components/flex';
import Base from '../../../components/base';
import Button from '../../../components/button';

const TaskPost = ({ popupClose }) => (
  <Portal width="800px" column size="14px">
    <Base.Span height="48px" lihe="48px" pale="20px">
      提交定时任务
    </Base.Span>
    <Base.Form>
      <Flex column bt="1px solid rgba(0,0,0,.08)" bb="1px solid rgba(0,0,0,.08)" p="20px">
        <Base.Span fowe="700" pabo="10px">
          基本属性
        </Base.Span>
        <Flex bgc="rgba(0,0,0,.03)" w="100%" p="20px 40px">
          <Flex column vc="flex-end" mr="10px">
            <Flex hc h="32px" mb="20px">任务名: </Flex>
            <Flex hc h="32px" mb="20px">描述: </Flex>
            <Flex hc h="32px">责任人: </Flex>
          </Flex>
          <Flex column full>
            <Base.Input width="100%" fosi="14px" pale="8px" pari="8px" border="1px solid rgba(0,0,0,.15)" bora="2px" height="32px" mabo="20px" />
            <Base.Input width="100%" fosi="14px" pale="8px" pari="8px" border="1px solid rgba(0,0,0,.15)" bora="2px" height="32px" mabo="20px" />
            <Base.Input width="100%" fosi="14px" pale="8px" pari="8px" border="1px solid rgba(0,0,0,.15)" bora="2px" height="32px" />
          </Flex>
        </Flex>
        <Base.Span fowe="700" pabo="10px" pato="20px">
          调度属性
        </Base.Span>
        <Flex bgc="rgba(0,0,0,.03)" w="100%" p="20px 40px">
          <Flex column vc="flex-end" mr="10px">
            <Flex hc h="32px" mb="20px">调度状态: </Flex>
            <Flex hc h="32px" mb="20px">出错重试: </Flex>
            <Flex hc h="32px" mb="20px">生效日期: </Flex>
            <Flex hc h="32px">调度时间: </Flex>
          </Flex>
          <Flex column full>
            <Flex hc w="100%" h="32px" mb="20px">
              <Switch
                checked={true}
                height={14}
                width={28}
                onColor="#3CBE7D"
                onChange={() => {}}
              />
              <Base.Span>启用</Base.Span>
            </Flex>
            <Flex hc w="100%" h="32px" mb="20px">
              <Switch
                checked={true}
                height={14}
                width={28}
                onColor="#3CBE7D"
                onChange={() => {}}
              />
              <Base.Span>启用</Base.Span>
              <Base.Span>（出错后自动重试，最多重试3次，时间间隔2分钟）</Base.Span>
            </Flex>
            <Flex pale="8px" pari="8px" height="32px" mabo="20px"><DayPickerInput /></Flex>
            <Base.Input fosi="14px" pale="8px" pari="8px" border="1px solid rgba(0,0,0,.15)" bora="2px" height="32px" />
          </Flex>
        </Flex>
      </Flex>
      <Flex vc="flex-end" h="48px" pl="20px" pr="20px">
        <Button onClick={popupClose}>取消</Button>
        <Button primary>保存</Button>
      </Flex>
    </Base.Form>
  </Portal>
);

export default inject(s => ({
  popupClose: s.APP.popupClose
}))(observer(TaskPost));
