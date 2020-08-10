const CryptoJS = require('./md5');
const Encrypt = require('./jsencrypt');
const publicKey = ""; // 共钥

// md5加密
function md5encode(str) {
  var hash = CryptoJS.MD5(str);
  return hash.toString();
}
// rsa加密
export function rsaEncrypt(text) {
  const encrypt = new Encrypt.JSEncrypt();
  encrypt.setPublicKey(publicKey);
  const encrypted = encrypt.encrypt(text);
  return encrypted;
}
// 加密登录密码
export function passwordEncrypt(str, timestamp) {
  const newStr = md5encode(str) + timestamp;
  const rsaStr = md5encode(newStr);
  return rsaEncrypt(rsaStr);
}
