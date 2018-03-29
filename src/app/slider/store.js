import { types, flow, getSnapshot, getParent, applySnapshot } from 'mobx-state-tree';
import forIn from 'lodash/forIn';
import Shortid from 'shortid';
import renderUidPidTypeTree from '../../lib/render_pid_type_tree';
import dataFetch from '../../helpers/data_fetch';
import store from '../store';
import userStore from '../../module/user/store';
import appStore from '../home/store';

import { QueryResultType } from '../../module/task/store';

if (process.env.NODE_ENV === 'development') {
  require('../../_mock_/task_tree'); // eslint-disable-line global-require
  require('../../_mock_/table_tree'); // eslint-disable-line global-require
}

const {
  model, number, maybe, string, array, union, late, boolean, map, optional, enumeration
} = types;

export const dataBaseType = model({
  state: optional(enumeration('state', ['pending', 'loading', 'done', 'error', 'initial']), 'initial'),
  error: maybe(string),
  search: maybe(string),
  isUpdate: optional(string, 'initial')
}).volatile(() => ({
  data: []
})).actions(self => ({
  doFetch: flow(function* f() {
    self.state = 'loading';
    const cacheData = [];
    const data = yield dataFetch('POST /prestoHome/getDBTable', {});

    forIn(data, (v, k) => {
      const children = [];
      v.map(m => children.push({
        name: m.hiveTableId,
        title: m.hiveTableName,
        type: 'systable'
      }));
      cacheData.push({
        name: k,
        title: k,
        type: 'database',
        children
      });
    });
    self.data = cacheData;
    self.isUpdate = Shortid();
    self.state = 'done';
  }),

  setSearch(text) {
    console.log(text)
    self.search = text;
  }
})).views(self => ({
  getSnapshot(key) {
    return getSnapshot(self[key]);
  }
}));

export const tableFieldType = model({
  state: optional(enumeration('state', ['pending', 'loading', 'done', 'error', 'initial']), 'initial'),
  error: maybe(string),
  search: maybe(string),
  isUpdate: optional(string, 'initial')
}).volatile(() => ({
  data: {}
})).actions(self => ({
  doFetch: flow(function* f(hiveTableId) {
    self.state = 'pending';
    const { columns, records } = yield dataFetch('POST /prestoHome/getTableColumns', { hiveTableId });

    self.data = { columns, records };
    self.isUpdate = Shortid();
    self.state = 'done';
  }),

  setSearch(text) {
    self.search = text;
  }

})).views(self => ({
  getSnapshot(key) {
    return getSnapshot(self[key]);
  },

  ifFieldExist() {
    return self.isUpdate !== 'initial';
  }
}));


export const taskTreeType = model({
  state: optional(enumeration('state', ['pending', 'loading', 'done', 'error', 'initial']), 'initial'),
  error: maybe(string),
  search: maybe(string),
  isUpdate: optional(string, 'initial')
}).volatile(() => ({
  data: []
})).actions(self => ({
  doFetch: flow(function* f() {
    self.state = 'pending';
    const data = yield dataFetch('POST /taskHome/getTaskGroup', {});

    if (data) {
      const tree = renderUidPidTypeTree(data, 0, (node) => {
        node.title = node.name;
        node.type = node.type === 1 ? 'folder' : node.type === 2 ? 'timingTask' : 'tempTask';
      });
      self.data = tree.children;
      self.isUpdate = Shortid();
      self.state = 'done';
    }
  }),

  setSearch(text) {
    self.search = text;
  },

  afterCreate() {
    self.doFetch();
  }
})).views(self => ({
  getSnapshot(key) {
    return getSnapshot(self[key]);
  }
}));
