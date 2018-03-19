import { types, flow, getSnapshot } from 'mobx-state-tree';
import dataFetch from '../../helpers/data_fetch';
import store from '../../app/store';
import appStore from '../../app/home/store';

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
  state: optional(union(enumeration('state', ['pending', 'loading', 'done']), number), 'pending')
}).actions(self => ({

  doLogin: flow(function* f() {
    self.state = 'pending';
    const { error, message, ms, isOk } = yield dataFetch('POST /userLogin', {
      userName: self.userName,
      passWord: self.password
    }, { credentials: 'include' });
    console.log(error, message, ms, isOk)
    if (error || isOk === 'no') {
      appStore.stateChange('error');
      appStore.setMessage(message || ms);
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
