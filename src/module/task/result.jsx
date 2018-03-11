import React, { Component } from 'react';
import { injectGlobal } from 'styled-components';
import { observer, inject, Observer } from 'mobx-react';
import Flex from '../../components/flex';
import Base from '../../components/base';
import Button from '../../components/button';
import TabList from '../../app/tabs/tab_list';
import TabContainer from '../../app/tabs/tab_container';
import Table from '../../components/table';
import ResultAll from './result_all';

/* eslint-disable */
injectGlobal`
  .result-tab span {
    padding: 6px 0;
    border-bottom: 1px solid rgba(0,0,0,0): 
  }
  .result-tab.on span {
    border-bottom-color: #6991FF;
  }
`;
/* eslint-enable */

const Result = ({
  query,
  tabId,
  popup,
  popupOpen,
  popupClose
}) => {
  let totalTime = 0;
  if (query.getSnapshot('queryResults').length) {
    query.getSnapshot('queryResults').filter(({ executeTime }) => {
      totalTime += executeTime;
      return true;
    });
  }
  return (
    <Flex full column>
      <Observer>{() => !popup ? null : <ResultAll />}</Observer>
      <Flex vc="space-between" hc bgc="#fff">
        <TabList origin="result">
          {query.getSnapshot('queryResults').length ? query.getSnapshot('queryResults').map((result, i) => (
            <Flex hover-bco="#6991FF" key={result.queryId} p="0 20px">
              <Base.Span className="hbco" pato="6px" pabo="6px" bobo="2px solid rgba(0,0,0,0)">结果{i}</Base.Span>
            </Flex>
          )) : null}
        </TabList>
        {totalTime ? (
          <Flex vc hc>
            <Base.Span pari="4px">耗时:</Base.Span>
            <Base.Span pari="20px">{totalTime}</Base.Span>
          </Flex>
        ) : (
            <Flex vc hc>
              <Base.Span pari="4px">进度:</Base.Span>
              <Base.Span pari="20px">loading...</Base.Span>
            </Flex>
          )}
      </Flex>
      <TabContainer full origin="result">
        {query.queryResults.length ? query.queryResults.map((result, i) => (
          <Flex full column key={result.queryId}>
            <Flex h="50px" vc="space-between" hc pl="20px" pr="20px">
              <Observer>
                {() => (
                  <Base.Span>查询结果预览，共{result.lineNumber}条，耗时：{result.executeTime}</Base.Span>
                )}
              </Observer>
              <Flex>
                <Button
                  bc="rgba(0,0,0,.02)"
                  co="#fff"
                  round="2px"
                  mr="10px"
                  onClick={popupOpen}
                >
                  查看更多
                </Button>
                <Button bc="rgba(0,0,0,.02)" co="#fff" round="2px" onClick={popupOpen}>下载全部</Button>
              </Flex>
            </Flex>
            <Table style={{ width: '100%', height: '100%' }} columnLine columns={result.columns} data={result.records} />
          </Flex>
        )) : null}
      </TabContainer>
    </Flex>
  );
};

export default inject(s => ({
  query: s.QUERY,
  tabId: s.APP.nowTab,
  popup: s.APP.popup,
  popupOpen: s.APP.popupOpen,
  popupClose: s.APP.popupClose
}))(observer(Result));
