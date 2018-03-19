import { types, flow, getSnapshot, getParent } from 'mobx-state-tree';
import Shortid from 'shortid';
import dataFetch from '../../helpers/data_fetch';
import { getLocalDateTime } from '../../lib/datetime';
import store from '../../app/store';
import appStore from '../../app/home/store';

if (process.env.NODE_ENV === 'development') {
  require('../../_mock_/get_presto_status'); // eslint-disable-line global-require
}

const {
  model, number, optional, string, maybe, union, enumeration, array, map, boolean, reference
} = types;

export const QueryResultType = model({
  ok: optional(boolean, false),
  columns: optional(array(union(string, number)), []),
  records: array(array(maybe(union(string, number)))),
  queryId: union(string, number),
  querySql: string,
  lineNumber: optional(number, 0),
  executeTime: optional(number, 0)
});

export const QueryType = model({
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
    console.log(self.selectedQueries);
  },

  execQuery: flow(function* f(num) {
    console.log('start exec', self.selectedQueries);
    self.state = 'pending';
    const rowNum = typeof num === 'number' ? { rowNum: num } : null;
    const { data, error, message, ms, isOk } = yield dataFetch('POST /querySql', {
      sql: self.selectedQueries,
      ...rowNum
    });
    if (error === 401) {
      store.USER.logout();
      return;
    }
    if (isOk === 'no') {
      appStore.stateChange('warning');
      appStore.setMessage(message || ms || '未知错误');
      return;
    }
    if (num >= 35000) {
      self.dataFull.set(appStore.nowTab, data);
      self.isDFUpdate = Shortid();
    } else {
      self.dataPreview.set(appStore.nowTab, data);
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
    self.state = 'pending';
    const explainedSQL = yield dataFetch('POST /explianDistributedSql', {
      sql: self.selectedQueries
    });
    try {
      let stringExpSql = '';
      self.queryResults = [];
      explainedSQL.map(({ records }) => {
        records.map((sql) => {
          stringExpSql += sql;
        });
      });

      console.log(self.queryResults);
      self.queryResults.push(String(stringExpSql));
      console.log(self.queryResults);
    } catch (err) {
      self.state = 703;
      self.message = `field parse fail: ${err.message}`;
    }
    self.state = 'done';
  }),

  formatSQL: flow(function* f(id) {
    self.state = 'pending';
    const formattedSQL = yield dataFetch('POST /formatSql', {
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
    console.log(key)
    return getSnapshot(self[key]);
  },
  getQueries(id) {
    return self.queries.get(id);
  },
  getLastCacheTime() {
    return getLocalDateTime(self.lastCacheTime);
  }
}));

export default QueryType.create({});
