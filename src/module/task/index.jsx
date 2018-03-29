import React, { Component } from 'react';
import { observer, inject, Observer } from 'mobx-react';
import TwoSidePane from '../../app/two-side-pane';
import Result from './result';
import SqlEditor from './sqleditor';
import Flex from '../../components/flex';
import Base from '../../components/base';
import Button from '../../components/button';
import IconPlay from '../../components/icon/play';
import IconPause from '../../components/icon/pause';
import Separator from '../../components/separator';

class Task extends Component {
  componentDidMount() {
    this.props.tabs.data.forEach((tab) => {
      this.props.query.initQuery(tab.sqlindex, tab.nowsql);
    });
  }
  render() {
    const {
      query,
      tabId,
      popup,
      popupOpen,
      popupClose,
      ...rest
    } = this.props;
    return (
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
              onClick={() => { popupOpen('taskPost'); }}
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
              onClick={() => { query.formatSQL(this.props.tabs.activeTabId); }}
              hover-shadow="0 2px 4px 0 rgba(0,0,0,.2)"
            >
              <Base.Span>格式化</Base.Span>
            </Button>
          </Flex>
        </Flex>
        <Flex rela full>
          <Observer>
            {() => (
              <TwoSidePane
                split="horizontal"
                maxSize={400}
                minSize={0}
                defaultSize={query.isDPUpdate !== 'initial' ? 248 : 0}
                primary="second"
              >
                <SqlEditor />
                <Flex full bt="1px solid rgba(0,0,0,.08)" w="100%">
                  <Result />
                </Flex>
              </TwoSidePane>
            )}
          </Observer>
        </Flex>
      </Flex>
    );
  }
}

export default inject(s => ({
  tabs: s.tabs,
  query: s.query,
  tabId: s.tabs.activeTabId,
  popup: s.app.popup,
  popupOpen: s.app.popupOpen,
  popupClose: s.app.popupClose
}))(observer(Task));
