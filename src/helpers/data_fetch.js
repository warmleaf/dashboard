import request from '../lib/request';
import store from '../app/store';

export default (url, params, options) =>
  request(process.env.REACT_APP_API, url, params, options)
    .then((res) => {
      let d = res.data;
      let e = res.error || res.isOk;
      let m = res.message || res.ms;

      if (typeof res === 'string') {
        try {
          const parseData = JSON.parse(res);
          d = parseData.data;
          e = parseData.error || parseData.isOk;
          m = parseData.message || parseData.ms;
        } catch (err) {
          store.app.stateChange('error');
          store.app.setMessage('返回数据为非JSON格式，且格式化失败！');
        }
      }

      if (e && e !== 'yes') {
        if (e === 401) {
          store.user.logout();
          return;
        }
        store.app.stateChange('error');
        store.app.setMessage(m || '未知错误');
        return;
      }

      return d;
    });
