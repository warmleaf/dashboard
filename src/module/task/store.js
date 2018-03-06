import { types, flow, getSnapshot } from 'mobx-state-tree';
import dataFetch from '../../helpers/data_fetch';
import { getLocalDateTime } from '../../lib/datetime';

if (process.env.NODE_ENV === 'development') {
  require('../../_mock_/get_presto_status'); // eslint-disable-line global-require
}

const {
  model, number, optional, string, maybe, union, enumeration
} = types;

export const QueryType = model({
  queries: optional(string, 'select * from data_import.jiguang_Data limit 100'),
  selectedQueries: optional(string, 'select * from data_import.jiguang_Data limit 100'),
  state: optional(union(enumeration('state', ['pending', 'loading', 'done']), number), 'pending'),
  message: maybe(string)
}).actions(self => ({

  execQuery: flow(function* f(num) {
    console.log('start exec');
    self.state = 'pending';
    const rowNum = typeof num === 'number' ? { rowNum: num } : null;
    const { data, error, message } = yield dataFetch('POST /querySql', {
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
      console.log(err)
      self.state = 703;
      self.message = `field parse fail: ${err.message}`;
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
  getLastCacheTime() {
    return getLocalDateTime(self.lastCacheTime);
  }
}));

export default QueryType.create({});
