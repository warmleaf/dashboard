import { types, flow, getSnapshot, getParent } from 'mobx-state-tree';
import Shortid from 'shortid';
import values from 'lodash/values';
import dataFetch from '../../helpers/data_fetch';
import { getLocalDateTime } from '../../lib/datetime';
import store from '../../app/store';

if (process.env.NODE_ENV === 'development') {
  require('../../_mock_/get_presto_status'); // eslint-disable-line global-require
}

const {
  model, number, optional, string, maybe, union, enumeration, array, map, boolean, reference
} = types;

export const queryResultType = model({
  ok: optional(boolean, false),
  columns: optional(array(union(string, number)), []),
  records: maybe(array(array(maybe(union(string, number))))),
  queryId: maybe(union(string, number)),
  querySql: maybe(string),
  lineNumber: optional(number, 0),
  executeTime: optional(number, 0)
});

export const queryType = model({
  queries: optional(map(string), {}),
  selectedQueries: optional(string, ''),
  queryResults: optional(map(string), {}),
  queryResultsAll: optional(map(string), {}),
  state: optional(union(enumeration('state', ['pending', 'loading', 'done']), number), 'done'),
  isDPUpdate: optional(string, 'initial'),
  isDFUpdate: optional(string, 'initial')
}).volatile(() => ({
  dataPreview: new Map(),
  dataFull: new Map()
})).actions(self => ({

  initQuery(id, query) {
    self.queries.set(id, query);
  },

  updateQuery(id, query) {
    self.queries.set(id, query);
    self.selectQuery(id, query);
  },

  selectQuery(id, query) {
    if (query !== '') {
      self.selectedQueries = query;
    } else {
      self.selectedQueries = self.queries.get(id);
    }
  },

  execQuery: flow(function* f(num) {
    self.state = 'pending';
    self.isDFUpdate = 'loading';
    const rowNum = typeof num === 'number' ? { rowNum: num } : null;
    const data = yield dataFetch('POST /prestoHome/querySql', {
      sql: self.selectedQueries,
      queryToken: store.tabs.activeTabId,
      ...rowNum
    });

    if (num >= 35000) {
      self.dataFull.set(store.tabs.activeTabId, data);
      self.isDFUpdate = Shortid();
    } else {
      self.dataPreview.set(store.tabs.activeTabId, data);
      self.isDPUpdate = Shortid();
    }
    self.state = 'done';
  }),

  stopQuery: flow(function* f(num) {
    self.state = 'pending';
    const rowNum = num ? { rowNum: num } : null;
    const { data, error, message } = yield dataFetch('POST /killQuery', {
      sql: self.selectedQueries,
      ...rowNum
    });
    if (error) {
      self.state = error;
      self.message = message || 'Unknown interface error';
    }
    try {
      console.log(data);
      self.runningQueries = data.runningQueries;
      self.blockedQueries = data.blockedQueries;
      self.lastCacheTime = data.lastCacheTime;
      self.percentage = data.percentage;
    } catch (err) {
      self.state = 703;
      self.message = `field parse fail: ${err.message}`;
    }
    self.state = 'done';
  }),

  explainDistributedSql: flow(function* f() {
    self.state = 'loading';
    const data = yield dataFetch('POST /prestoHome/explianDistributedSql', {
      sql: self.selectedQueries
    });

    self.dataPreview.set(store.tabs.activeTabId, data);
    self.isDPUpdate = Shortid();
    self.state = 'done';
  }),

  formatSQL: flow(function* f(id) {
    self.state = 'pending';
    const data = yield dataFetch('POST /prestoHome/formatSql', {
      sql: self.selectedQueries
    }, { parseType: 'text' });

    self.updateQuery(id, data);
    self.state = 'done';
  }),

  postTask: flow(function* f(id) {
    self.state = 'pending';
    const formattedSQL = yield dataFetch('POST /prestoHome/formatSql', {
      sql: self.selectedQueries
    }, { parseType: 'text' });
    self.updateQuery(id, formattedSQL);
    self.state = 'done';
  }),

  download(queryId) {
    dataFetch('POST /dowloadData', { queryId, rowNum: 50 }, { parseType: 'download' });
  }
})).views(self => ({
  getSnapshot(key) {
    return getSnapshot(self[key]);
  },
  getQueries(id) {
    return self.queries.get(id);
  },
  getLastCacheTime() {
    return getLocalDateTime(self.lastCacheTime);
  }
}));

export const taskPostType = model({
  id: optional((string), ''),
  taskName: optional((string), ''),
  taskRemark: optional((string), ''),
  userId: optional((string), ''),
  taskSql: optional((string), ''),
  isValid: optional((number), 1),
  retry: optional((number), 1),
  tasktimeStart: optional((string), ''),
  tasktimeEnd: optional((string), ''),
  state: optional(union(enumeration('state', ['pending', 'loading', 'done']), number), 'done'),
}).volatile(() => ({
  dataPreview: new Map(),
  dataFull: new Map()
})).actions(self => ({
  update(key, value) {
    self[key] = value;
  }
})).views(self => ({
  getSnapshot(key) {
    return self[key];
  }
}));

export const frequencyType = model({
  id: optional((string), ''),
  taskName: optional((string), ''),
  taskRemark: optional((string), ''),
  userId: optional((string), ''),
  taskSql: optional((string), ''),
  isValid: optional((number), 1),
  retry: optional((number), 1),
  tasktimeStart: optional((string), ''),
  tasktimeEnd: optional((string), ''),
  state: optional(union(enumeration('state', ['pending', 'loading', 'done']), number), 'done'),
}).volatile(() => ({
  dataPreview: new Map(),
  dataFull: new Map()
})).actions(self => ({
  update(key, value) {
    self[key] = value;
  },

  doFetch: flow(function* f() {
    self.state = 'loading';
    const data = yield dataFetch('POST /taskHome/getFrequencyTypeAndWeek', {});

    if (data) {
      console.log(data);
    }
    self.state = 'done';
  }),

  afterCreate() {
    self.doFetch();
  }
})).views(self => ({
  getSnapshot(key) {
    return self[key];
  }
}));

export const timingTaskType = model({
  isUpdate: optional(string, 'initial'),
  state: optional(union(enumeration('state', ['pending', 'loading', 'done']), number), 'done')
}).volatile(() => ({
  data: []
})).actions(self => ({

  doFetch: flow(function* f() {
    self.state = 'loading';
    const data = yield dataFetch('POST /taskHome/taskList', {});

    if (data) {
      data.map((d, index) => {
        self.data[index] = values(d);
      });
      self.isUpdate = Shortid();
    }
    self.state = 'done';
  }),

  afterCreate() {
    self.doFetch();
  }
})).views(self => ({
  getSnapshot(key) {
    return self[key];
  }
}));
