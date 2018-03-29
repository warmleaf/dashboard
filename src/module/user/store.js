import { types, flow, getSnapshot } from 'mobx-state-tree';
import dataFetch from '../../helpers/data_fetch';
import appStore from '../../app/home/store';

const {
  model, number, optional, string, maybe, union, enumeration, boolean, array
} = types;

const userListFieldType = model({
  label: maybe(union(string, number)),
  value: maybe(union(string, number))
});

const userType = model({
  userName: maybe(string),
  password: maybe(string),
  userStatus: optional(boolean, false),
  state: optional(union(enumeration('state', ['pending', 'loading', 'done']), number), 'pending')
}).actions(self => ({

  doLogin: flow(function* f() {
    self.state = 'pending';
    yield dataFetch('POST /prestoHome/userLogin', {
      userName: self.userName,
      passWord: self.password
    }, { credentials: 'include' });

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

export const userListType = model({
  data: optional(array(userListFieldType), []),
  state: optional(union(enumeration('state', ['pending', 'loading', 'done']), number), 'pending')
}).actions(self => ({
  doFetch: flow(function* f() {
    self.state = 'pending';
    const data = yield dataFetch('POST /userSysHome/userList', {
      pageNum: 0,
      pageSize: 10000
    }, { credentials: 'include' });

    console.log(data)
    if (data) {
      data.map((d) => {
        self.data.push({
          label: `${d.jobnonew} ${d.username}`,
          value: d.id
        });
      });
    }
    console.log(self.data)
    self.state = 'done';
  }),

  afterCreate() {
    self.doFetch();
  }
})).views(self => ({
  getUserList() {
    return getSnapshot(self.data);
  }
}));

export default userType;
