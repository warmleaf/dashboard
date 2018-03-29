import { types, flow, getSnapshot } from 'mobx-state-tree';
import ShortId from 'shortid';
import dataFetch from '../../helpers/data_fetch';
import userStore from '../../module/user/store';
import appStore from '../home/store';

const {
  model, maybe, string, enumeration, optional, union, number
} = types;

const tabsType = model({
  state: optional(enumeration('state', ['pending', 'loading', 'done', 'error', 'initial']), 'initial'),
  error: maybe(string),
  activeTabId: maybe(string),
  isUpdate: optional(string, 'initial')
}).volatile(() => ({
  data: new Map()
})).actions(self => ({
  doFetch: flow(function* f() {
    self.state = 'loading';

    const data = yield dataFetch('POST /userSysHome/getSqlTabs', {});
    console.log(data);
    if (data) {
      data.map((tab) => { // eslint-disable-line
        self.data.set(tab.sqlindex, tab);
      });

      const first = self.data.entries().next().value[0];
      console.log(first, self.data.entries().next().value[0])
      self.selectTab(first);
      self.isUpdate = ShortId();
    }
    self.state = 'done';
  }),

  selectTab(id) {
    self.activeTabId = typeof id !== 'string' ? String(id) : id;
  },

  closeTab() {

  },

  saveTab() {

  },

  afterCreate() {
    if (self.isUpdate === 'initial') {
      self.doFetch();
    }
  }
})).views(self => ({
  getSnapshot(key) {
    return getSnapshot(self[key]);
  }
}));

export default tabsType;
