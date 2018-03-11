import { types, flow, getSnapshot, getParent } from 'mobx-state-tree';
import Shortid from 'shortid';
import dataFetch from '../../helpers/data_fetch';
import { getLocalDateTime } from '../../lib/datetime';
import store from '../../app/store';

if (process.env.NODE_ENV === 'development') {
  require('../../_mock_/get_presto_status'); // eslint-disable-line global-require
}

const {
  model, number, optional, string, maybe, union, enumeration, array, map, boolean
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
  logs: maybe(string),
  queryResults: optional(array(QueryResultType), []),
  queryResultsAll: optional(string, 'empty'),
  state: optional(union(enumeration('state', ['pending', 'loading', 'done']), number), 'pending'),
  message: maybe(string)
}).actions(self => ({

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
    console.log('start exec');
    self.state = 'pending';
    const rowNum = typeof num === 'number' ? { rowNum: num } : null;
    const { data, error, message, ms, isOk } = yield dataFetch('POST /querySql', {
      sql: self.selectedQueries,
      ...rowNum
    });
    if (error || isOk === 'no') {
      console.log(ms, ms === '未检测到当前用户信息,请确保先登陆');
      if (ms === '未检测到当前用户信息,请确保先登陆') {
        store.USER.logout();
      }
      self.state = error || 900;
      self.message = message || ms || 'Unknown interface error';
      return;
    }
    try {
      if (num === 35000) {
        window.__result_data = data[0];
        self.queryResultsAll = Shortid();
      } else {
        self.queryResults = [];
        data.map((d) => {
          self.queryResults.push(d);
        });
      }
      console.log(self.queryResultsAll, window.__result_data);
    } catch (err) {
      self.state = 703;
      self.message = `field parse fail: ${err.message}`;
      return;
    }
    self.state = 'done';
    console.log(self.queryResults);
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
    const { data, error, message } = yield dataFetch('POST /explainDistributedSql', {
      sql: self.selectedQueries
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
  })
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

export default QueryType.create({});
