import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Vant from 'vant';
import 'vant/lib/index.css';
import './assets/css/common.css';

import ProductList from './components/ProductList'
import ProductDetail from './components/ProductDetail'
import { Lazyload } from 'vant';

Vue.use(Vant);
Vue.use(VueRouter)
Vue.use(Lazyload);

const routes = [
  {
    path: '/list',
    component: ProductList,
    meta: {
      keepAlive: true
    }
  }, {
    path: '/detail',
    component: ProductDetail,
    meta: {
      keepAlive: false
    }
  }
]

const router = new VueRouter({
  routes
})

Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
