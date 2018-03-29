import React from 'react';
import { observer, inject } from 'mobx-react';
import Portal from '../../app/portal';
import Table from '../../components/table';
import Flex from '../../components/flex';
import Base from '../../components/base';
import Button from '../../components/button';
import IconSpinner from '../../components/icon/spinner';

const ResultAll = ({ popupClose, query, tabId }) => (
  <Portal width="800px" height="80%" column size="14px">
    <Flex column h="100%">
      <Base.Span height="48px" lihe="48px" pale="20px">
        查询结果
      </Base.Span>
      <Flex full column bt="1px solid rgba(0,0,0,.08)" bb="1px solid rgba(0,0,0,.08)" p="20px">
        <Flex p="15px 20px" vc="space-between">
          <Base.Span>查询结果，共35,000条<Base.Span color="rgba(0,0,0,.3)">（最多可预览35,000条）</Base.Span></Base.Span>
          <Button primary h="28px" round="2px">复制全部</Button>
        </Flex>
        <Flex vc h="100%">
          {console.log(query.dataFull.get(tabId), tabId)}
          {query.isDFUpdate === 'loading' ?
            <IconSpinner style={{ fontSize: '40px', marginTop: '100px' }} /> :
            <Table
              fixedRowCount={1}
              columnWidth={75}
              rowHeight={40}
              columns={(query.isDFUpdate && query.dataFull.get(tabId)) ? query.dataFull.get(tabId)[0].columns : []}
              data={(query.isDFUpdate && query.dataFull.get(tabId)) ? query.dataFull.get(tabId)[0].records : []}
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
          }
        </Flex>
      </Flex>
      <Flex hc vc="flex-end" h="48px" pl="20px" pr="20px">
        <Button round="2px" h="32px" size="14px" primary ml="20px" onClick={() => { popupClose('resultAll'); }}>关闭</Button>
      </Flex>
    </Flex>
  </Portal>
);

export default inject(s => ({
  popupClose: s.app.popupClose,
  tabId: s.tabs.activeTabId,
  query: s.query
}))(observer(ResultAll));
