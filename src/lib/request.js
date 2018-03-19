import fetch from 'isomorphic-fetch';
import isTypeOf from './is_type_of';
import errorReport from './error_report';

const en_Lang = {
  UNAUTHORIZED: '认证过期，请重新认证(或登录)',
  FORBIDDEN: '服务器拒绝访问',
  NOT_FOUND: '服务器没有找到资源(或接口)',
  METHOD_NOT_ALLOWED: ['拒绝访问，请使用', '方法请求'],
  INTERNAL_SERVER_ERROR: '服务器未知错误',
  FAILED_GATEWAY: '资源(或接口)服务没有(正确)响应',
  SERVICE_UNAVAILABLE: '服务器繁忙',
  BAD_REQUEST: '没有(或错误的)请求内容',
  FAIL_TO_FETCH: [
    '请求失败，未知故障',
    '检查你的Internet网络连接是否正常',
    '检查该请求链接是否存在',
    '你可能跨域访问该站点(资源)，检查请求Response是否包含Content-Security-Policy/Access-Control-Allow-Origin属性',
    '检查是否使用了非HTTP/HTTPS请求'
  ],
  PARSE_JSON_FAILED: '接口返回内容是非标准JSON格式',
  EXECUTE_FETCH_FAILED: ['请求链接(', ')拼写错误'],
  UNKNOW: '未知错误'
};

function checkStatus(response, lang) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = {};
  const LANG = lang || en_Lang;

  if (response.status === 400) {
    error.message = LANG.BAD_REQUEST;
    error.code = 499;
  }
  if (response.status === 401) {
    error.message = LANG.UNAUTHORIZED;
    error.code = 401;
  }
  if (response.status === 403) {
    error.message = LANG.FORBIDDEN;
    error.code = 499;
  }
  if (response.status === 404) {
    error.message = LANG.NOT_FOUND;
    error.code = 499;
  }
  if (response.status === 405) {
    error.message = LANG.METHOD_NOT_ALLOWED;
    error.code = 499;
  }
  if (response.status === 500) {
    error.message = LANG.INTERNAL_SERVER_ERROR;
    error.code = 599;
  }
  if (response.status === 502 || response.status === 504) {
    error.message = LANG.FAILED_GATEWAY;
    error.code = 599;
  }
  if (response.status === 503) {
    error.message = LANG.SERVICE_UNAVAILABLE;
    error.code = 599;
  }

  throw (error);
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
 *    401      unauthorized
 *    499      client error
 *    599      server error
 *    777      complex error
 *    [number] customer defined error
 */
function clearReport({ code, message, ...rest }, lang) {
  let err = {};
  const LANG = lang || en_Lang;

  if (code) {
    err = { error: code, message };
  } else {
    switch (true) {
      case /Unexpected token < in JSON at position/.test(message):
        err = {
          message: LANG.PARSE_JSON_FAILED,
          error: 599
        };
        break;
      case /Failed to execute 'fetch' on 'Window': Failed to parse URL from/.test(message):
        err = {
          message: `${LANG.EXECUTE_FETCH_FAILED[0]}${message.replace(/Failed to execute 'fetch' on 'Window': /, '')}${LANG.EXECUTE_FETCH_FAILED[1]}`,
          error: 499
        };
        break;
      case /Failed to fetch/.test(message):
        err = {
          message: LANG.FAIL_TO_FETCH[0],
          info: LANG.FAIL_TO_FETCH,
          error: 777
        };
        break;
      default:
        err = {
          message: LANG.UNKNOW,
          error: 777
        };
    }
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
    .then(res => checkStatus(res, opt.errorMsgLangType))
    .then((res) => {
      switch (opt.parseType) {
        case 'text':
          return res.text();
        case 'download':
          res.blob().then((blob) => {
            const reader = new FileReader();
            const createObjectURL = window.URL.createObjectURL;
            const revokeObjectURL = window.URL.revokeObjectURL;
            reader.readAsText(blob);

            const zhBlob = new Blob(res, { type: 'application/octet-stream' })

            const disposition = res.headers.get('Content-Disposition');
            const match = disposition ? disposition.match(/attachment; filename=(.+)/i) : null;
            const filename = match && match.length > 1 ? match[1] : 'unknownfile';

            let link = document.createElement('a');
            document.body.appendChild(link);

            const url = window.URL.createObjectURL(zhBlob);
            link.href = url;
            link.download = filename;
            link.click();
            window.URL.revokeObjectURL(url);
            // const timer = setInterval(() => {
            //   if (reader.result) {
            //     clearInterval(timer);
            //   }
            // }, 6);
          });
          return { message: 'success' };
        case 'json':
        default:
          return res.json();
      }
    })
    .catch(err => clearReport(err, opt.errorMsgLangType));
}

export default request;
