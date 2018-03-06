import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import SplitPane from 'react-split-pane';
import QueryEditor from './query-editor';
import Result from './result';
import CodeMirrorSizer from './utility/codeMirrorSizer';
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
class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: ''
    };
  }

  updateCode = (code) => {
    this.setState({ code });
  };
  render() {
    const { ...rest } = this.props;
    const options = {
      lineNumbers: true,
      mode: 'sql'
    };
    return (
      <Flex full column h="100%" {...rest}>
        {!this.props.popup ? null : <TaskPost />}
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
              onClick={this.props.query.execQuery}
            >
              <IconPlay />
              <Base.Span male="8px">运行</Base.Span>
            </Button>
            <Button disabled round="2px" size="14px" mr="10px">
              <IconPause />
              <Base.Span male="8px">暂停</Base.Span>
            </Button>
            <Separator h size="70%" ml="10px" mr="20px" />
            <Button round="2px" size="14px" mr="10px" onClick={() => { }}>
              <Base.Span>查看执行计划</Base.Span>
            </Button>
            <Button round="2px" size="14px" mr="10px" onClick={this.props.popupOpen}>
              <Base.Span>提交定时任务</Base.Span>
            </Button>
            <Separator h size="70%" ml="10px" mr="20px" />
            <Button round="2px" size="14px" mr="10px">
              <Base.Span>清空</Base.Span>
            </Button>
            <Button round="2px" size="14px" mr="10px">
              <Base.Span>格式化</Base.Span>
            </Button>
          </Flex>
        </Flex>
        <Flex rela full>
          <SplitPane split="horizontal" maxSize={400} defaultSize={248} primary="second">
            <QueryEditor
              ref={(n) => {
                this.queryEditorComponent = n;
              }}
            />
            <Flex full bt="1px solid rgba(0,0,0,.08)">
              <Result />
            </Flex>
          </SplitPane>
        </Flex>
      </Flex>
    );
  }
}

export default inject(s => ({
  query: s.QUERY,
  popup: s.APP.popup,
  popupOpen: s.APP.popupOpen,
  popupClose: s.APP.popupClose
}))(observer(Task));
