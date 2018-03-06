import { mock, Random } from 'mockjs'; // eslint-disable-line

export default mock(/.*\/getPrestoStatus/g, 'get', {
  data: {
    runningQueries: Random.natural(0, 1000),
    blockedQueries: Random.natural(0, 1000),
    lastCacheTime: mock('@datetime()'),
    percentage: Random.natural(0, 100)
  },
  message: 'success'
});
