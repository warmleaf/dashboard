import { types, flow, getSnapshot, getParent, applySnapshot } from 'mobx-state-tree';
import { sliderPaneWidth, outPutPaneHeight } from '../../config';
import dataFetch from '../../helpers/data_fetch';

const {
  model, number, maybe, string, array, enumeration, union, late, boolean, optional
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
  tabs: array(string),
  popup: optional(boolean, false),
  sliderPaneWidth: maybe(number),
  outPutPaneHeight: maybe(number),
  state: union(enumeration('state', ['pending', 'loading', 'done']), number),
  message: maybe(string)
}).actions(self => ({
  newTab() {
    const lastIndex = self.tabs[self.tabs.length - 1].split('$')[1];
    self.tabs.push(`tmp$${Number(lastIndex) + 1}`);
  },

  popupOpen() {
    if (!self.popup) { self.popup = true; }
  },

  popupClose() {
    if (self.popup) { self.popup = false; }
  },

  fetchAndUpdate: flow(function* fetchData(key, fetchUrl, defaultValue) {
    console.log('000000=>', getParent(self))
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
  }
})).views(self => ({
  getSnapshot(key) {
    return getSnapshot(self[key]);
  }
}));

export const UserType = model({
  userName: maybe(string),
  password: maybe(string),
  isLoggedIn: optional(boolean, false),
  state: optional(union(enumeration('state', ['pending', 'loading', 'done']), number), 'pending'),
  message: maybe(string)
}).actions(self => ({

  doLogin: flow(function* f() {
    self.state = 'pending';
    const { data, error, message } = yield dataFetch('POST /userLogin', {
      userName: self.userName,
      passWord: self.password
    });
    if (error) {
      self.state = error;
      self.message = message || 'Unknown interface error';
    }
    self.isLoggedIn = true;
    self.state = 'done';
  }),

  set(key, value) {
    self[key] = value;
  }
})).views(self => ({
  getSnapshot(key) {
    return getSnapshot(self[key]);
  }
}));

export const UserStore = UserType.create({});

export default AppType.create({
  tabs: ['tmp$1'],
  sliderPaneWidth: localStore.getItem('sliderPaneWidth') || sliderPaneWidth,
  outPutPaneHeight: localStore.getItem('outPutPaneHeight') || outPutPaneHeight,
  state: 'pending'
});

