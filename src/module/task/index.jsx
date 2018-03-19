import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import SplitPane from 'react-split-pane';
import Result from './result';
import SqlEditor from './sqleditor';
import Flex from '../../components/flex';
import Base from '../../components/base';
import Button from '../../components/button';
import IconPlay from '../../components/icon/play';
import IconPause from '../../components/icon/pause';
import Separator from '../../components/separator';
import TaskPost from './post';

import store from '../../app/store';
import queryStore from './store';

store.registerModule('QUERY', queryStore);

const Task = ({
  query,
  tabId,
  popup,
  popupOpen,
  popupClose,
  ...rest
}) =>
  (
    <Flex full column h="100%" {...rest}>
      <Flex>
        <Flex full p="15px 20px">
          <Button
            inline
            primary
            round="2px"
            size="14px"
            mr="10px"
            pt="3px"
            pb="3px"
            hover-shadow="0 2px 4px 0 rgba(0,0,0,.2)"
            onClick={() => { query.execQuery(500); }}
          >
            <IconPlay />
            <Base.Span male="8px">运行</Base.Span>
          </Button>
          <Button
            disabled
            round="2px"
            size="14px"
            mr="10px"
            hover-shadow="0 2px 4px 0 rgba(0,0,0,.2)"
          >
            <IconPause />
            <Base.Span male="8px">暂停</Base.Span>
          </Button>
          <Separator h size="70%" ml="10px" mr="20px" />
          <Button
            round="2px"
            size="14px"
            mr="10px"
            bc="rgba(0,0,0,.3)"
            hover-shadow="0 2px 4px 0 rgba(0,0,0,.2)"
            onClick={query.explainDistributedSql}
          >
            <Base.Span>查看执行计划</Base.Span>
          </Button>
          <Button
            round="2px"
            size="14px"
            mr="10px"
            bc="rgba(0,0,0,.3)"
            hover-shadow="0 2px 4px 0 rgba(0,0,0,.2)"
            onClick={popupOpen}
          >
            <Base.Span>提交定时任务</Base.Span>
          </Button>
          <Separator h size="70%" ml="10px" mr="20px" />
          <Button
            round="2px"
            size="14px"
            mr="10px"
            bc="rgba(0,0,0,.3)"
            hover-shadow="0 2px 4px 0 rgba(0,0,0,.2)"
            onClick={() => { query.updateQuery(tabId, ''); }}
          >
            <Base.Span>清空</Base.Span>
          </Button>
          <Button
            round="2px"
            size="14px"
            mr="10px"
            bc="rgba(0,0,0,.3)"
            onClick={() => { query.formatSQL(tabId); }}
            hover-shadow="0 2px 4px 0 rgba(0,0,0,.2)"
          >
            <Base.Span>格式化</Base.Span>
          </Button>
        </Flex>
      </Flex>
      <Flex rela full>
        <SplitPane split="horizontal" maxSize={400} defaultSize={248} primary="second">
          <SqlEditor />
          <Flex full bt="1px solid rgba(0,0,0,.08)" w="100%">
            <Result />
          </Flex>
        </SplitPane>
      </Flex>
    </Flex>
  );

export default inject(s => ({
  query: s.QUERY,
  tabId: s.APP.nowTab,
  popup: s.APP.popup,
  popupOpen: s.APP.popupOpen,
  popupClose: s.APP.popupClose
}))(observer(Task));
