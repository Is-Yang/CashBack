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

import component from './components/index'
import api_ from './api'

Vue.use(Vant);
Vue.use(Lazyload);
Vue.use(Toast);
Vue.prototype.API = api_;

Vue.config.productionTip = false

// 注册全局组件
Object.keys(component).forEach(key => {
  var name = key.replace(/(\w)/, (v) => v.toUpperCase()); // 首字母大写
  Vue.component(`${name}`, component[key]);
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')