import { types, flow, getSnapshot } from 'mobx-state-tree';
import dataFetch from '../../helpers/data_fetch';
import { getLocalDateTime } from '../../lib/datetime';

if (process.env.NODE_ENV === 'development') {
  require('../../_mock_/get_presto_status'); // eslint-disable-line global-require
}

const {
  model, number, optional, string, maybe
} = types;

export const PrestoStateType = model({
  runningQueries: optional(number, 0),
  blockedQueries: optional(number, 0),
  lastCacheTime: optional(number, 0),
  percentage: optional(number, 0),
  state: maybe(string),
  message: maybe(string)
}).actions(self => ({

  fetchAndUpdate: flow(function* fetchData() {
    self.state = 'pending';
    const { data, error, message } = yield dataFetch('GET /getPrestoStatus');
    if (error) {
      self.state = `${error}`;
      self.message = message || 'Unknown interface error';
    }
    try {
      console.log(data);
      self.runningQueries = data.runningQueries;
      self.blockedQueries = data.blockedQueries;
      self.lastCacheTime = data.lastCacheTime;
      self.percentage = data.percentage;
    } catch (err) {
      self.state = `${err}`;
      self.message = 'field parse fail';
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

export default PrestoStateType.create({});
