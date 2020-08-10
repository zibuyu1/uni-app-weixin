import Vue from 'vue';
import App from './App';
import MinCache from './utils/cache';
import MinRequest from './utils/minRequest';
import MinRouter from './utils/minRouter';
import minRequest from './utils/api/index';
import globalData from './utils/globalData';


Vue.use(MinRequest);
Vue.use(MinRouter);
Vue.use(MinCache);
Vue.config.productionTip = false;
Vue.prototype.$util = globalData;

App.mpType = 'app';

const app = new Vue({
    ...App,
    minRequest,
    minRouter,
});
app.$mount();
