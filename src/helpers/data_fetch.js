import request from '../lib/request';

export default (url, params, options) => request(process.env.REACT_APP_API, url, params, options);
