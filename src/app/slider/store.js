import { types, flow, getSnapshot, getParent, applySnapshot } from 'mobx-state-tree';
import forIn from 'lodash/forIn';
import Shortid from 'shortid';
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
    self.state = 'pending';
    const cacheData = [];
    const { data, error, isOk, ms, message } = yield dataFetch('POST /getDBTable', {});
    if (error || isOk === 'no') {
      if (error === 401) userStore.logout();
      self.state = 'error';
      self.message = message || ms || 'Unknown interface error';
      return;
    }

    if (error === 401) {
      appStore.stateChange('warning');
      appStore.setMessage(message || ms);
      store.USER.logout();
      return;
    }

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
    const { columns, error, message, ok, ms, records } = yield dataFetch('POST /getTableColumns', { hiveTableId });
    if (!ok || ok === 'no') {
      self.state = 'error';
      self.message = ms || 'Unknown interface error';
      return;
    }

    if (error === 401) {
      appStore.stateChange('warning');
      appStore.setMessage(message || ms);
      store.USER.logout();
      return;
    }

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
  isUpdate: optional(string, 'initial')
}).volatile(() => ({
  data: []
})).actions(self => ({
  doFetch: flow(function* f() {
    self.state = 'pending';
    const { data, error, isOk, ms, message } = yield dataFetch('POST /getDBTable', {});
    if (error || isOk === 'no') {
      self.state = 'error';
      self.message = message || ms || 'Unknown interface error';
      return;
    }

    if (error === 401) {
      appStore.stateChange('warning');
      appStore.setMessage(message || ms);
      store.USER.logout();
      return;
    }

    forIn(data, (v, k) => {
      const children = [];
      v.map(m => children.push({
        name: m.hiveTableId,
        title: m.hiveTableName,
        type: 'systable'
      }));
      self.data.push({
        name: k,
        title: k,
        type: 'database',
        children
      });
    });
    self.isUpdate = Shortid();
    self.state = 'done';
  }),
  afterCreate() {
    self.doFetch();
  }
})).views(self => ({
  getSnapshot(key) {
    return getSnapshot(self[key]);
  }
}));
