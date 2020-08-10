import urls from './baseurl';
import MinCache from './cache';
const cache = new MinCache();
const globalData = {
  header: {
    'Content-Type': 'application/json',
    'cookie': cache.has(urls.cookieName) ? cache.get(urls.cookieName) : '',
  }
}
export default globalData;