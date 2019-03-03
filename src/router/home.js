import Index from '../pages/Index'
import ProductList from '../pages/ProductList'
import ProductDetail from '../pages/ProductDetail'
import FlashSale from '../pages/FlashSale'

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
}, {
    path: '/sale',
    component: FlashSale,
    name: '限时抢购',
    meta: {
        keepAlive: false
    }
}]