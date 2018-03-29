import { types, flow, getSnapshot } from 'mobx-state-tree';
import dataFetch from '../../helpers/data_fetch';
import { getLocalDateTime } from '../../lib/datetime';

const {
  model, number, optional, string, maybe
} = types;

const PrestoType = model({
  runningQueries: optional(number, 0),
  blockedQueries: optional(number, 0),
  lastCacheTime: optional(number, 0),
  percentage: optional(number, 0),
  state: maybe(string),
  message: maybe(string)
}).actions(self => ({

  fetchAndUpdate: flow(function* fetchData() {
    self.state = 'pending';
    const data = yield dataFetch('GET /prestoHome/getPrestoStatus');

    self.runningQueries = data.runningQueries;
    self.blockedQueries = data.blockedQueries;
    self.lastCacheTime = data.lastCacheTime;
    self.percentage = data.percentage;
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

export default PrestoType;
