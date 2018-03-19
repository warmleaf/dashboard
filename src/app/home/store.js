import { types, flow, getSnapshot, getParent, applySnapshot } from 'mobx-state-tree';
import ShortId from 'shortid';
import { sliderPaneWidth, outPutPaneHeight } from '../../config';
import dataFetch from '../../helpers/data_fetch';

const {
  model, number, maybe, string, array, enumeration, union, late, boolean, optional, map
} = types;

export const localStore = window.localStorage;

export const UIParameter = model({
  sliderPaneWidth: maybe(number),
  outPaneHeight: maybe(number)
});

export const KeyValueType = model({
  key: string,
  value: string
});

export const PopupStateType = model({
  id: maybe(union(string, number)),
  name: maybe(union(string, number))
});

export const TabType = model({
  title: string
});

export const TableFieldsType = model({
  id: union(string, number),
  name: string,
  type: string,
  comment: string,
  isMainKey: boolean
});

// task tree model
export const TaskTreeType = model({
  name: string,
  title: string,
  type: string,
  children: maybe(array(late(() => TaskTreeType)))
});

// table tree model
export const TableTreeType = model({
  name: string,
  title: string,
  type: string,
  spec: maybe(array(string)),
  fields: maybe(array(TableFieldsType)),
  children: maybe(array(late(() => TableTreeType)))
});


/* eslint-disable */
/**
 * fetch, then update state
 *
 * @param {string} state
 * @param {string} fetchUrl
 * @param {any} defaultValue
 */
function* fetchAndUpdate(state, fetchUrl, defaultValue) {
  self.state = 'pending';
  const { data, error, message } = yield dataFetch(fetchUrl);
  if (error) {
    self.state = error;
    self.message = message || 'Unknown interface error';
  }
  self[state] = data || defaultValue;
  self.state = 'done';
}
/* eslint-enable */

export const AppType = model({
  tabs: optional(map(TabType), {}),
  nowTab: maybe(string),
  popup: optional(string, 'close'),
  popupState: optional(PopupStateType, {}),
  sliderPaneWidth: maybe(number),
  outPutPaneHeight: maybe(number),
  state: optional(enumeration('state', [
    'pending',
    'loading',
    'done',
    'error',
    'success',
    'warning',
    'info',
    'initial'
  ]), 'initial'),
  message: maybe(string)
}).actions(self => ({
  newTab() {
    const Id = ShortId();
    self.tabs.set(Id, { title: '新建任务[临时]' });
    self.activeTab(Id);
  },

  activeTab(id) {
    self.nowTab = id;
    console.log(self.nowTab)
  },

  stateChange(state) {
    self.state = state;
  },

  setMessage(message) {
    self.message = message;
  },

  closeTab(id) {
    self.tabs.delete(id);
    const lastTabId = self.tabs.keys()[self.tabs.size - 1];
    console.log(self.nowTab, id)
    if (self.nowTab === id) {
      console.log('active')
      self.activeTab(lastTabId);
    }
  },

  popupOpen(id, state) {
    if (self.popup !== id) { self.popup = id; }
    self.popupState = state;
  },

  popupClose(id) {
    if (self.popup === id) { self.popup = 'close'; }
  },

  fetchAndUpdate: flow(function* fetchData(key, fetchUrl, defaultValue) {
    self.state = 'pending';
    const { data, error, message } = yield dataFetch(fetchUrl);
    if (error) {
      self.state = error;
      self.message = message || 'Unknown interface error';
    }
    self[key] = data || defaultValue;
    self.state = 'done';
  }),

  updateBySnapshot(key, snapshot) {
    applySnapshot(self[key], snapshot);
  },

  afterCreate() {
    self.newTab();
  }
})).views(self => ({
  getSnapshot(key) {
    return getSnapshot(self[key]);
  }
}));

export default AppType.create({
  sliderPaneWidth: localStore.getItem('sliderPaneWidth') || sliderPaneWidth,
  outPutPaneHeight: localStore.getItem('outPutPaneHeight') || outPutPaneHeight,
  state: 'pending'
});

