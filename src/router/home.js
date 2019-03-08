import Index from '../pages/Index'
import ProductList from '../pages/ProductList'
import ProductDetail from '../pages/ProductDetail'
import FlashSale from '../pages/FlashSale'

export default [{
    path: '/index',   // 首页
    component: Index,
}, {
    path: '/',
    component: ProductList,
    children: [{
        path: 'list'  // 搜索列表页
    }, {
        path: 'classify'  // 分类列表页
    }],
    meta: {
        keepAlive: true
    }
}, {
    path: '/detail',  // 详情页
    component: ProductDetail,
    meta: {
        keepAlive: false
    }
}, {
    path: '/sale',  // 限时抢购
    component: FlashSale,
    meta: {
        keepAlive: false
    }
}]