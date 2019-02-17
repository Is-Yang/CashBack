import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import ProductList from './components/ProductList'
import ProductDetail from './components/ProductDetail'
import Share from './components/Share'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: ProductList
  }, {
    path: '/detail',
    component: ProductDetail
  }, {
    path: '/share',
    component: Share
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
