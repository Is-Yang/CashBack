import Index from '../pages/Index';
import ProductList from '../pages/ProductList';
import ProductDetail from '../pages/ProductDetail'

export default [{
    path: '/index',
    component: Index,
    name: '首页'
}, {
    path: '/list',
    component: ProductList,
    name: '商品列表',
    meta: {
        keepAlive: true
    }
}, {
    path: '/detail',
    component: ProductDetail,
    name: '商品详情',
    meta: {
        keepAlive: false
    }
}]