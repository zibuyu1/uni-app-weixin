let baseUrl; // API地址
let cookieName; // cookie
switch(process.env.NODE_ENV) {
  case 'development':
    baseUrl = 'test.com';
    cookieName = '_TEST';
    break;
  case 'production':
    baseUrl = 'pro.com';
    cookieName = '_PRO';
    break;
}

export default {
  baseUrl,
  cookieName,
}