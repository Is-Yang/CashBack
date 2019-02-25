import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Vant from 'vant';
import 'vant/lib/index.css';
import './assets/css/common.css';
import { Toast } from 'vant';

import ProductList from './components/ProductList'
import ProductDetail from './components/ProductDetail'
import global_ from './components/Global'

import { Lazyload } from 'vant';

Vue.use(Vant);
Vue.use(VueRouter)
Vue.use(Lazyload);
Vue.use(Toast);
Vue.prototype.GLOBAL = global_

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
  routes,
  scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
          return savedPosition
      }   else {
          if (from.meta.keepAlive) {
              from.meta.savedPosition = document.body.scrollTop;
          }
          return { x: 0, y: to.meta.savedPosition || 0 }
      }
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
