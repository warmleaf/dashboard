import React from 'react';
import { observer, inject } from 'mobx-react';
import Portal from '../../app/portal';
import Flex from '../../components/flex';
import Base from '../../components/base';
import Button from '../../components/button';

const Recover = ({ popupClose, popupState, query }) => (
  <Portal width="800px" height="80%" column size="14px">
    <Flex column h="100%">{console.log('here?')}
      <Base.Span height="48px" lihe="48px" pale="20px">
        恢复日/月切表
      </Base.Span>
      <Flex p="15px 20px" vc="space-between">
        <Base.Span>月切表长期保存数据，日切表保存最近6个月的数据(切片日期在最近6个月内)</Base.Span>
      </Flex>
      <Flex p="15px 20px" vc="space-between">
        <Base.Span>类型：</Base.Span>{popupState}
      </Flex>
      <Flex p="15px 20px" vc="space-between">
        <Base.Span>日期：</Base.Span>
      </Flex>
      <Flex vc="flex-end" h="48px" pl="20px" pr="20px">
        <Button onClick={() => { popupClose('recover'); }}>关闭</Button>
      </Flex>
    </Flex>
  </Portal>
);

export default inject(s => ({
  popupClose: s.app.popupClose,
  popupState: s.app.popupState,
  query: s.query
}))(observer(Recover));
