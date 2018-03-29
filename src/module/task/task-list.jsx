import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Logo from '../../app/logo';
import Flex from '../../components/flex';
import Base from '../../components/base';
import Button from '../../components/button';
import Table from '../../components/table';
import IconSpinner from '../../components/icon/spinner';

class TaskList extends Component {
  componentDidMount() {

  }
  render() {
    if (this.props.timingTask.state === 'loading') return <Flex><IconSpinner /></Flex>;
    console.log('------->', this.props.timingTask)
    return (
      <Flex column h="100%">
        <Flex shadow="0 2px 4px 0 rgba(0,0,0,.08)" h="60px" bgc="#fff">
          <Flex hc ml="20px" pr="20px" br="1px solid rgba(0,0,0,.08)">
            <Logo />
            <Base.Span fosi="16px" male="10px">大数据查询平台</Base.Span>
          </Flex>
          <Flex hc full vc="space-between" mr="20px">
            <Flex>
              <Base.Span fosi="16px" male="10px">定时任务</Base.Span>
            </Flex>
            <Button primary round="2px" size="14px">新 建</Button>
          </Flex>
        </Flex>
        <Flex vc full>
          <Flex w="1000px" b="1px solid rgba(0,0,0,.08)" mt="20px">
            <Table
              fixedRowCount={1}
              // fixedColumnCount={1}
              columnWidth={75}
              rowHeight={40}
              columns={[]}
              data={this.props.timingTask.data}
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
      </Flex>
    );
  }
}
export default inject('timingTask')(observer(TaskList));
