import React from 'react';
import { observer, inject } from 'mobx-react';
import Portal from '../../app/portal';
import Table from '../../components/table';
import Flex from '../../components/flex';
import Base from '../../components/base';
import Button from '../../components/button';

const TaskPost = ({ popupClose, query }) => {
  query.execQuery(35000);
  console.log(query)
  query.queryResultsAll
  // const result = getSnapshot('queryResultsAll');
  // console.log('------>', result);
  const data = window.__result_data || {
    columns: [],
    records: []
  };
  return (
    <Portal width="800px" height="80%" column size="14px">
      <Flex column h="100%">
        <Base.Span height="48px" lihe="48px" pale="20px">
          查询结果
        </Base.Span>
        <Flex pl="20px" pr="20px" vc="space-between">
          <Base.Span>查询结果，共35,000条<Base.Span>（最多可预览35,000条）</Base.Span></Base.Span>
          <Button primary>复制全部</Button>
        </Flex>
        <Flex h="100%" nonOverflow>
          <Table
            style={{ width: '100%', height: '100%' }}
            columnLine
            columns={data.columns}
            data={data.records}
          />
        </Flex>
        <Flex vc="flex-end" h="48px" pl="20px" pr="20px">
          <Button onClick={popupClose}>关闭</Button>
        </Flex>
      </Flex>
    </Portal>
  );
};

export default inject(s => ({
  popupClose: s.APP.popupClose,
  query: s.QUERY
}))(observer(TaskPost));
