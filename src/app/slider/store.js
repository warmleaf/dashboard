import { types, flow, getSnapshot, getParent, applySnapshot } from 'mobx-state-tree';
import dataFetch from '../../helpers/data_fetch';
import store from '../store';

if (process.env.NODE_ENV === 'development') {
  require('../../_mock_/task_tree'); // eslint-disable-line global-require
  require('../../_mock_/table_tree'); // eslint-disable-line global-require
}

const {
  model, number, maybe, string, array, union, late, boolean, map, optional, enumeration
} = types;

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

export const DynamicFieldType = model({
  [string]: string
});

export const SliderType = model({
  state: optional(union(enumeration('state', ['pending', 'loading', 'done']), number), 'pending'),
  search: optional(map(string), {}),
  now: optional(number, 0),
  taskTree: array(TaskTreeType),
  tableTree: array(TableTreeType)
}).actions(self => ({

  updateSearch(value) {
    self.search.set(self.now, value);
  },

  updateData() {
    switch (self.now) {
      case 0:
        self.fetchAndUpdate('taskTree', 'GET /api/task_tree', []);
        break;
      case 1:
        self.fetchAndUpdate('tableTree', 'GET /api/table_tree', []);
        break;
      default:
        break;
    }
  },

  activeNow(id) {
    self.now = id;
  },

  fetchAndUpdate: flow(function* fetchData(key, fetchUrl, defaultValue) {
    console.log('000000=>', store.USER.isLoggedIn)
    self.state = 'pending';
    const { data, error, message } = yield dataFetch(fetchUrl);
    if (error) {
      self.state = error;
      self.message = message || 'Unknown interface error';
    }
    self[key] = data || defaultValue;
    self.state = 'done';
    console.log('fetch done');
  }),

  updateBySnapshot(key, snapshot) {
    applySnapshot(self[key], snapshot);
  },

  afterCreate() {
    self.fetchAndUpdate('taskTree', 'GET /api/task_tree', []);
    self.fetchAndUpdate('tableTree', 'GET /api/table_tree', []);
  }
})).views(self => ({
  getSnapshot(key) {
    return getSnapshot(self[key]);
  },
  getSearchNow() {
    console.log(self.search.get(self.now))
    return self.search.get(self.now);
  }
}));

export default SliderType.create({
  taskTree: [],
  tableTree: []
});
