import Vue from 'vue'
import App from './App.vue'
import router from './router/index';
import Vant from 'vant';
import 'vant/lib/index.css';
import './assets/css/common.css';
import {
  Lazyload,
  Toast
} from 'vant';


import global_ from './components/Global'

Vue.use(Vant);
Vue.use(Lazyload);
Vue.use(Toast);
Vue.prototype.GLOBAL = global_

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')