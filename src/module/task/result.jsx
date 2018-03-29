import React, { Component } from 'react';
import { injectGlobal } from 'styled-components';
import { observer, inject, Observer } from 'mobx-react';
import isTypeOf from '../../lib/is_type_of';
import Flex from '../../components/flex';
import Base from '../../components/base';
import Button from '../../components/button';
import TabList from '../../components/tabs/tab_list';
import TabContainer from '../../components/tabs/tab_container';
import Table from '../../components/table';
import ResultAll from './result_all';
import IconSpinner from '../../components/icon/spinner';

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
  const results = query.getSnapshot('queryResults').length ? query.getSnapshot('queryResults') : [];
  if (query.isDPUpdate) {
    results.filter(({ executeTime }) => {
      totalTime += executeTime;
      return true;
    });
  }
  const tabRender = {
    tab: null,
    container: null
  };

  if (!query.dataPreview.get(tabId)) return null;
  if (typeof query.dataPreview.get(tabId)[0] === 'string') {
    tabRender.tab = (
      <Flex key="taskPlan" hover-bco="#6991FF" p="0 20px">
        <Base.Span className="hbco" pato="6px" pabo="6px" bobo="2px solid rgba(0,0,0,0)">执行计划</Base.Span>
      </Flex>);
    tabRender.container = (
      <Flex key="taskPlan" auto full column w="100%" bgc="#000" pl="15px" pr="15px">
        <Base.Pre color="#f2f2f2">{query.dataPreview.get(tabId)[0]}</Base.Pre>
      </Flex>
    );
  } else {
    tabRender.tab = query.dataPreview.get(tabId).map((data, i) => (
      <Flex hover-bco="#6991FF" key={data.queryId} p="0 20px">
        <Base.Span className="hbco" pato="6px" pabo="6px" bobo="2px solid rgba(0,0,0,0)">结果{i}</Base.Span>
      </Flex>
    ));
    tabRender.container = query.dataPreview.get(tabId).map((data) => {
      if (data.ok) {
        return (
          <Flex full column key={data.queryId} w="100%">
            <Flex h="50px" vc="space-between" hc pl="20px" pr="20px">
              <Observer>
                {() => (
                  <Base.Span>查询结果预览，共{data.lineNumber}条，耗时：{data.executeTime}</Base.Span>
                )}
              </Observer>
              <Flex>
                <Button
                  bc="rgba(0,0,0,.3)"
                  bgc="#fff"
                  round="2px"
                  mr="10px"
                  onClick={() => {
                    query.execQuery(35000);
                    popupOpen('resultAll');
                  }}
                  hover-shadow="0 2px 4px 0 rgba(0,0,0,.2)"
                >
                  查看更多
                </Button>
                <Button
                  bc="rgba(0,0,0,.3)"
                  bgc="#fff"
                  round="2px"
                  onClick={() => { query.download(data.queryId); }}
                  hover-shadow="0 2px 4px 0 rgba(0,0,0,.2)"
                >
                  下载全部
                </Button>
              </Flex>
            </Flex>
            <Flex full bt="1px solid rgba(0,0,0,.08)" bb="1px solid rgba(0,0,0,.08)">
              <Table
                fixedRowCount={1}
                columnWidth={75}
                rowHeight={40}
                columns={data.columns}
                data={data.records}
                styleHeadGrid={{
                  lineHeight: '40px',
                  boxSizing: 'border-box',
                  backgroundColor: 'rgba(0,0,0,.03)',
                  borderRight: '1px solid rgba(0,0,0,.08)',
                  borderBottom: '1px solid rgba(0,0,0,.08)'
                }}
                styleBodyGrid={{
                  lineHeight: '40px',
                  boxSizing: 'border-box',
                  borderRight: '1px solid rgba(0,0,0,.08)',
                  borderBottom: '1px solid rgba(0,0,0,.08)'
                }}
              />
            </Flex>
          </Flex>
        );
      }
      return (
        <Flex key={data.queryId} auto full bgc="rgb(253,241,240)">
          <div style={{ padding: '15px' }}>
            <Flex full pb="15px">
              <Base.Span teal="right" width="48px" fosi="12px" mari="15px" wobr="keep-all" color="rgb(163,163,163)">查询语句</Base.Span>
              <Base.Pre width="100%" bora="4px" padding="15px" baco="#000" mato="0" mabo="0" color="#fff">{data.querySql}</Base.Pre>
            </Flex>
            <Flex full pb="15px">
              <Base.Span teal="right" width="48px" fosi="12px" mari="15px" wobr="keep-all" color="rgb(163,163,163)">查 询ID</Base.Span>
              <Base.Pre mato="0" mabo="0" color="rgb(60,66,73)">{data.queryId}</Base.Pre>
            </Flex>
            <Flex full pb="15px">
              <Base.Span teal="right" width="48px" fosi="12px" mari="15px" wobr="keep-all" color="rgb(163,163,163)">错误信息</Base.Span>
              <Base.Pre mato="0" mabo="0" whsp="pre-wrap" wowr="break-word" color="rgb(235,56,42)">{data.warningMessage}</Base.Pre>
            </Flex>
          </div>
        </Flex>
      );
    });
  }

  return (
    <Flex full column w="100%" >
      <Flex vc="space-between" hc bgc="#fff">
        <TabList origin="result" defaultItem={query.dataPreview.get(tabId)[0] && query.dataPreview.get(tabId)[0].queryId}>
          {tabRender.tab}
        </TabList>
        <Flex pr="20px">
          {totalTime ? (
            <Flex vc hc>
              <Base.Span pari="4px">耗时:</Base.Span>
              <Base.Span>{totalTime}</Base.Span>
            </Flex>
          ) : query.state === 'pending' && (<IconSpinner size="22px" />)}
        </Flex>
      </Flex>
      <TabContainer full origin="result" defaultItem={query.dataPreview.get(tabId)[0] && query.dataPreview.get(tabId)[0].queryId}>
        {tabRender.container}
      </TabContainer>
    </Flex>
  );
};

export default inject(s => ({
  query: s.query,
  tabId: s.tabs.activeTabId,
  popup: s.app.popup,
  popupOpen: s.app.popupOpen,
  popupClose: s.app.popupClose
}))(observer(Result));
