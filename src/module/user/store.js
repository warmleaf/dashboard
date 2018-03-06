import { types, flow, getSnapshot } from 'mobx-state-tree';
import dataFetch from '../../helpers/data_fetch';

if (process.env.NODE_ENV === 'development') {
  require('../../_mock_/get_presto_status'); // eslint-disable-line global-require
}

const {
  model, number, optional, string, maybe, union, enumeration, boolean
} = types;

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

export default UserType.create({});
