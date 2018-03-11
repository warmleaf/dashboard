import { types, flow, getSnapshot } from 'mobx-state-tree';
import dataFetch from '../../helpers/data_fetch';
import store from '../../app/store';

if (process.env.NODE_ENV === 'development') {
  require('../../_mock_/get_presto_status'); // eslint-disable-line global-require
}

const {
  model, number, optional, string, maybe, union, enumeration, boolean
} = types;

export const UserType = model({
  userName: maybe(string),
  password: maybe(string),
  userStatus: optional(boolean, false),
  state: optional(union(enumeration('state', ['pending', 'loading', 'done']), number), 'pending'),
  message: maybe(string)
}).actions(self => ({

  doLogin: flow(function* f() {
    self.state = 'pending';
    const { error, message, msg, isOk } = yield dataFetch('POST /userLogin', {
      userName: self.userName,
      passWord: self.password
    }, { credentials: 'include' });
    if (error || isOk === 'no') {
      self.state = error || 900;
      self.message = message || msg || 'Unknown interface error';
      return;
    }
    if (window !== 'undefined') {
      window.localStorage.setItem('isLoggedIn', 'yes');
      self.userStatus = true;
    }
    self.state = 'done';
  }),

  logout() {
    if (window !== 'undefined') {
      window.localStorage.removeItem('isLoggedIn');
      self.userStatus = false;
      console.log('do it');
    }
  },

  set(key, value) {
    self[key] = value;
  }
})).views(self => ({
  getSnapshot(key) {
    return getSnapshot(self[key]);
  },
  isLoggedIn() {
    if (window !== 'undefined') {
      const ls = window.localStorage.getItem('isLoggedIn');
      return ls === 'yes' || self.userStatus;
    }
    return false;
  }
}));

export default UserType.create({});
