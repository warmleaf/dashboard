import fetch from 'isomorphic-fetch';
import isTypeOf from './is_type_of';
import errorReport from './error_report';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  errorReport(response);
  return {
    message: response.statusText || response.message,
    error: response.status || response.error
  };
}

/**
 *
 * @return {ErrorType} error
 *
 * {
 *    message: 'error message',
 *    error: 'error code'
 * }
 *
 * error code:
 *
 *    701  json parse failed
 *    704  Failed to fetch
 *    705  Failed to execute 'fetch'
 *    700  Unknown Error
 */
function clearReport(error) {
  let err = {};
  switch (true) {
    case /Unexpected token < in JSON at position/.test(error.message):
      err = {
        message: 'The returned data parsing failed to Json',
        error: 701
      };
      break;
    case /Failed to execute 'fetch' on 'Window': Failed to parse URL from/.test(error.message):
      err = {
        message: error.message.replace(/Failed to execute 'fetch' on 'Window': /, ''),
        error: 705
      };
      break;
    case /Failed to fetch/.test(error.message):
      err = {
        message: `${error.message}, check if your API Url is accessible`,
        error: 704
      };
      break;
    default:
      err = {
        message: 'Unknown Error',
        error: 700
      };
  }

  errorReport(err);
  return err;
}

function objToQueryString(obj) {
  const keys = Object.keys(obj);
  return keys.length === 0
    ? null
    : `?${keys.map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).join('&')}`;
}

function isFirstHas(str, type) {
  if (isTypeOf(type) === 'string') {
    return str.indexOf(type) === 0;
  }

  if (isTypeOf(type) === 'array') {
    for (let i = 0; i < type.length; i += 1) {
      if (str.indexOf(type[i]) === 0) {
        return type[i];
      }
      if (i === type.length) {
        return false;
      }
    }
  }
  return false;
}

export const delay = duration => (...args) => new Promise((resolve) => {
  setTimeout(() => {
    resolve(...args);
  }, duration);
});

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url        请求URL
 * @param  {object} [params]   请求参数(提交数据)
 * @param  {object} [options]  请求头设置
 * @return {object}            An object containing either "data" or "err"
 *
 * important:
 *     1. url中method在最前面且后面的空格不能少
 *     2. url中如果已经有参数则锁定method为GET/DELETE,且params参数无效
 * example:
 *     GET / DataFetch('GET /api/query?arg=value')
 *     GET / DataFetch('GET /api/query', {arg: value})
 *     POST / DataFetch('/api/query', {arg: value})
 *     POST / DataFetch('/api/query', {arg: value}, {options})
 *     DELETE / DataFetch('DELETE /api/query', {arg: value})
 *     PUT / DataFetch('PUT /api/query?arg=value')
 *     PUT / DataFetch('PUT /api/query', {arg: value})
 */

function request(api, url, params, options) {
  const hasQueryOnRUL = url.indexOf('?') >= 0;

  let opt = {
    method: 'POST',
    ...options
  };
  let query = '';

  let hasMethodA = isFirstHas(url, ['GET ', 'DELETE ']);
  let hasMethodB = isFirstHas(url, ['POST ', 'PUT ']);
  if (hasMethodA) hasMethodA = hasMethodA.replace(' ', '');
  if (hasMethodB) hasMethodB = hasMethodB.replace(' ', '');

  if (hasMethodB || !hasMethodA) {
    const len = hasMethodB ? hasMethodB.length + 1 : 5;
    if (hasMethodB) {
      if (url.indexOf('?') === -1) {
        query = url.slice(len);
      } else {
        query = url.slice(len, url.indexOf('?'));
      }
    } else {
      query = url;
    }

    opt = {
      credentials: 'include',
      mode: 'cors',
      body: typeof params === 'string' ? params : JSON.stringify(params),
      ...opt
    };
  } else if (hasMethodA) {
    const realUrl = url.slice(hasMethodA.length + 1);
    query = realUrl;
    opt.method = hasMethodA;
    if (!hasQueryOnRUL && params) {
      query = realUrl + objToQueryString(params);
    }
  }

  // mockjs can't catch fetch request, so instead of ajax
  if (/\/\/mock.local/.test(api)) {
    return import('qwest').then(qwest => qwest.map(opt.method.toLowerCase(), (api || '') + query))
      .then(res => JSON.parse(res.response));
  }

  return fetch((api || '') + query, opt)
    .catch(clearReport)
    .then(checkStatus)
    .then((res) => {
      if (res.error) {
        return res;
      }
      return res.json();
    })
    .catch(clearReport);
}

export default request;
