import urls from '../baseurl';
import globalData from '../globalData';
import MinRequest from '../minRequest';
const minRequest = new MinRequest();

// 设置默认配置
minRequest.setConfig((config) => {
  config.baseURL = urls.userUrl;
  config.header = globalData.header;
  return config;
})

export default {
  // POST 微信登录
  authLogin (data) {
    return minRequest.post('/mini-app/auth/login', data);
  },
  // GET 是否登录过期
  checkLogin () {
    return minRequest.get('/mini-app/check/login');
  },
}