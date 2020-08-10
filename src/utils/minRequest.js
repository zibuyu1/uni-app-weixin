const config = Symbol('config')
const isCompleteURL = Symbol('isCompleteURL')
const requestBefore = Symbol('requestBefore')
const requestAfter = Symbol('requestAfter')
import globalData from './globalData';
import urls from './baseurl';

class MinRequest {
  [config] = {
    baseURL: urls.userUrl,
    header: globalData.header,
    method: 'GET',
    dataType: 'json',
    responseType: 'text',
  }

  interceptors = {
    request: (func) => {
      if (func) {
        MinRequest[requestBefore] = func
      } else {
        MinRequest[requestBefore] = (request) => request
      }
    },
    response: (func) => {
      if (func) {
        MinRequest[requestAfter] = func
      } else {
        MinRequest[requestAfter] = (response) => response
      }
    }
  }

  static [requestBefore] (config) {
    return config
  }

  static [requestAfter] (response) {
    return response
  }

  static [isCompleteURL] (url) {
    return /(http|https):\/\/([\w.]+\/?)\S*/.test(url)
  }

  setConfig (func) {
    this[config] = func(this[config])
  }

  request (options = {}) {
    options.baseURL = options.baseURL || this[config].baseURL
    options.dataType = options.dataType || this[config].dataType
    options.url = MinRequest[isCompleteURL](options.url) ? options.url : (options.baseURL + options.url)
    options.data = options.data
    options.header = {...options.header, ...this[config].header}
    options.method = options.method || this[config].method

    options = {...options, ...MinRequest[requestBefore](options)}

    return new Promise((resolve, reject) => {
      options.success = function (res) {
        resolve(MinRequest[requestAfter](res))
      }
      options.fail= function (err) {
        reject(MinRequest[requestAfter](err))
      }
      uni.request(options)
    })
  }

  get (url, data, options = {}) {
    options.url = url
    options.data = data
    options.method = 'GET'
    return this.request(options)
  }

  post (url, data, options = {}) {
    options.url = url
    options.data = data
    options.method = 'POST'
    return this.request(options)
  }
}

MinRequest.install = function (Vue) {
  Vue.mixin({
    beforeCreate: function () {
			if (this.$options.minRequest) {
				Vue._minRequest = this.$options.minRequest
			}
    }
  })
  Object.defineProperty(Vue.prototype, '$minApi', {
    get: function () {
			return Vue._minRequest.apis
		}
  })
}
// 拦截器
const minRequest = new MinRequest()
// 请求拦截器
minRequest.interceptors.request((request) => {
  return request
});
// 响应拦截器
minRequest.interceptors.response((response) => {
  if (response && response.data && response.data.rspResult) {
    const bizCode = response.data.rspResult.bizCode;
    switch(bizCode) {
      // 基本信息未授权
      case 14002:
        break;
        // 登录过期
      case 14001:
        break;
      default:
        break;
    }
  }
  return response;
});

export default MinRequest