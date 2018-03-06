import React, { Component } from 'react';
import Flex from '../../components/flex';
import Base from '../../components/base';
import Button from '../../components/button';
import Table from '../../components/table';

const timingtasks = [{
  id: 'id123',
  name: 'name',
  status: 0,
  lastDispatchResult: 1,
  lastUpdateTime: '2018-2-12 12:43:45',
  responsible: 'admin',
  description: 'ok...',
  createTime: '2018-2-12 12:43:45',
  execTime: '2018-2-12 12:43:45'
}, {
  id: 'id123',
  name: 'name',
  status: 0,
  lastDispatchResult: 1,
  lastUpdateTime: '2018-2-12 12:43:45',
  responsible: 'admin',
  description: 'ok...',
  createTime: '2018-2-12 12:43:45',
  execTime: '2018-2-12 12:43:45'
}, {
  id: 'id123',
  name: 'name',
  status: 0,
  lastDispatchResult: 1,
  lastUpdateTime: '2018-2-12 12:43:45',
  responsible: 'admin',
  description: 'ok...',
  createTime: '2018-2-12 12:43:45',
  execTime: '2018-2-12 12:43:45'
}, {
  id: 'id123',
  name: 'name',
  status: 0,
  lastDispatchResult: 1,
  lastUpdateTime: '2018-2-12 12:43:45',
  responsible: 'admin',
  description: 'ok...',
  createTime: '2018-2-12 12:43:45',
  execTime: '2018-2-12 12:43:45'
}, {
  id: 'id123',
  name: 'name',
  status: 0,
  lastDispatchResult: 1,
  lastUpdateTime: '2018-2-12 12:43:45',
  responsible: 'admin',
  description: 'ok...',
  createTime: '2018-2-12 12:43:45',
  execTime: '2018-2-12 12:43:45'
}, {
  id: 'id123',
  name: 'name',
  status: 0,
  lastDispatchResult: 1,
  lastUpdateTime: '2018-2-12 12:43:45',
  responsible: 'admin',
  description: 'ok...',
  createTime: '2018-2-12 12:43:45',
  execTime: '2018-2-12 12:43:45'
}, {
  id: 'id123',
  name: 'name',
  status: 0,
  lastDispatchResult: 1,
  lastUpdateTime: '2018-2-12 12:43:45',
  responsible: 'admin',
  description: 'ok...',
  createTime: '2018-2-12 12:43:45',
  execTime: '2018-2-12 12:43:45'
}, {
  id: 'id123',
  name: 'name',
  status: 0,
  lastDispatchResult: 1,
  lastUpdateTime: '2018-2-12 12:43:45',
  responsible: 'admin',
  description: 'ok...',
  createTime: '2018-2-12 12:43:45',
  execTime: '2018-2-12 12:43:45'
}, {
  id: 'id123',
  name: 'name',
  status: 0,
  lastDispatchResult: 1,
  lastUpdateTime: '2018-2-12 12:43:45',
  responsible: 'admin',
  description: 'ok...',
  createTime: '2018-2-12 12:43:45',
  execTime: '2018-2-12 12:43:45'
}, {
  id: 'id123',
  name: 'name',
  status: 0,
  lastDispatchResult: 1,
  lastUpdateTime: '2018-2-12 12:43:45',
  responsible: 'admin',
  description: 'ok...',
  createTime: '2018-2-12 12:43:45',
  execTime: '2018-2-12 12:43:45'
}, {
  id: 'id123',
  name: 'name',
  status: 0,
  lastDispatchResult: 1,
  lastUpdateTime: '2018-2-12 12:43:45',
  responsible: 'admin',
  description: 'ok...',
  createTime: '2018-2-12 12:43:45',
  execTime: '2018-2-12 12:43:45'
}, {
  id: 'id123',
  name: 'name',
  status: 0,
  lastDispatchResult: 1,
  lastUpdateTime: '2018-2-12 12:43:45',
  responsible: 'admin',
  description: 'ok...',
  createTime: '2018-2-12 12:43:45',
  execTime: '2018-2-12 12:43:45'
}, {
  id: 'id123',
  name: 'name',
  status: 0,
  lastDispatchResult: 1,
  lastUpdateTime: '2018-2-12 12:43:45',
  responsible: 'admin',
  description: 'ok...',
  createTime: '2018-2-12 12:43:45',
  execTime: '2018-2-12 12:43:45'
}, {
  id: 'id123',
  name: 'name',
  status: 0,
  lastDispatchResult: 1,
  lastUpdateTime: '2018-2-12 12:43:45',
  responsible: 'admin',
  description: 'ok...',
  createTime: '2018-2-12 12:43:45',
  execTime: '2018-2-12 12:43:45'
}, {
  id: 'id123',
  name: 'name',
  status: 0,
  lastDispatchResult: 1,
  lastUpdateTime: '2018-2-12 12:43:45',
  responsible: 'admin',
  description: 'ok...',
  createTime: '2018-2-12 12:43:45',
  execTime: '2018-2-12 12:43:45'
}, {
  id: 'id123',
  name: 'name',
  status: 0,
  lastDispatchResult: 1,
  lastUpdateTime: '2018-2-12 12:43:45',
  responsible: 'admin',
  description: 'ok...',
  createTime: '2018-2-12 12:43:45',
  execTime: '2018-2-12 12:43:45'
}, {
  id: 'id123',
  name: 'name',
  status: 0,
  lastDispatchResult: 1,
  lastUpdateTime: '2018-2-12 12:43:45',
  responsible: 'admin',
  description: 'ok...',
  createTime: '2018-2-12 12:43:45',
  execTime: '2018-2-12 12:43:45'
}, {
  id: 'id123',
  name: 'name',
  status: 0,
  lastDispatchResult: 1,
  lastUpdateTime: '2018-2-12 12:43:45',
  responsible: 'admin',
  description: 'ok...',
  createTime: '2018-2-12 12:43:45',
  execTime: '2018-2-12 12:43:45'
}, {
  id: 'id123',
  name: 'name',
  status: 0,
  lastDispatchResult: 1,
  lastUpdateTime: '2018-2-12 12:43:45',
  responsible: 'admin',
  description: 'ok...',
  createTime: '2018-2-12 12:43:45',
  execTime: '2018-2-12 12:43:45'
}, {
  id: 'id123',
  name: 'name',
  status: 0,
  lastDispatchResult: 1,
  lastUpdateTime: '2018-2-12 12:43:45',
  responsible: 'admin',
  description: 'ok...',
  createTime: '2018-2-12 12:43:45',
  execTime: '2018-2-12 12:43:45'
}, {
  id: 'id123',
  name: 'name',
  status: 0,
  lastDispatchResult: 1,
  lastUpdateTime: '2018-2-12 12:43:45',
  responsible: 'admin',
  description: 'ok...',
  createTime: '2018-2-12 12:43:45',
  execTime: '2018-2-12 12:43:45'
}, {
  id: 'id123',
  name: 'name',
  status: 0,
  lastDispatchResult: 1,
  lastUpdateTime: '2018-2-12 12:43:45',
  responsible: 'admin',
  description: 'ok...',
  createTime: '2018-2-12 12:43:45',
  execTime: '2018-2-12 12:43:45'
}, {
  id: 'id123',
  name: 'name',
  status: 0,
  lastDispatchResult: 1,
  lastUpdateTime: '2018-2-12 12:43:45',
  responsible: 'admin',
  description: 'ok...',
  createTime: '2018-2-12 12:43:45',
  execTime: '2018-2-12 12:43:45'
}, {
  id: 'id123',
  name: 'name',
  status: 0,
  lastDispatchResult: 1,
  lastUpdateTime: '2018-2-12 12:43:45',
  responsible: 'admin',
  description: 'ok...',
  createTime: '2018-2-12 12:43:45',
  execTime: '2018-2-12 12:43:45'
}, {
  id: 'id123',
  name: 'name',
  status: 0,
  lastDispatchResult: 1,
  lastUpdateTime: '2018-2-12 12:43:45',
  responsible: 'admin',
  description: 'ok...',
  createTime: '2018-2-12 12:43:45',
  execTime: '2018-2-12 12:43:45'
}, {
  id: 'id123',
  name: 'name',
  status: 0,
  lastDispatchResult: 1,
  lastUpdateTime: '2018-2-12 12:43:45',
  responsible: 'admin',
  description: 'ok...',
  createTime: '2018-2-12 12:43:45',
  execTime: '2018-2-12 12:43:45'
}, {
  id: 'id123',
  name: 'name',
  status: 0,
  lastDispatchResult: 1,
  lastUpdateTime: '2018-2-12 12:43:45',
  responsible: 'admin',
  description: 'ok...',
  createTime: '2018-2-12 12:43:45',
  execTime: '2018-2-12 12:43:45'
}, {
  id: 'id123',
  name: 'name',
  status: 0,
  lastDispatchResult: 1,
  lastUpdateTime: '2018-2-12 12:43:45',
  responsible: 'admin',
  description: 'ok...',
  createTime: '2018-2-12 12:43:45',
  execTime: '2018-2-12 12:43:45'
}];
class TaskList extends Component {
  renderBodyCell = ({
    columnIndex, key, rowIndex, style
  }) => {
    console.log(columnIndex, key, rowIndex, style)
  }
  renderHeaderCell = ({
    columnIndex, key, rowIndex, style
  }) => {
    ['任务名', '任务名', '任务名', '任务名', '任务名', '任务名', '任务名', '任务名', '任务名', '任务名', '任务名'].map((name, i) => <div key={i}>{name}</div>)
  }
  render() {
    return (
      <Flex column h="100%">
        <Flex shadow="0 2px 4px 0 rgba(0,0,0,.08)" h="60px" bgc="#fff">head</Flex>
        <Table
          columns={['任务名', '任务名', '任务名', '任务名', '任务名', '任务名', '任务名', '任务名', '任务名', '任务名', '任务名']}
          data={timingtasks}
          renderBodyCell={this.renderBodyCell}
          renderHeaderCell={this.renderHeaderCell}
        />
      </Flex>
    );
  }
}
export default TaskList;
