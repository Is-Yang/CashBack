import Index from '../pages/Index'
import ProductList from '../pages/ProductList'
import ProductDetail from '../pages/ProductDetail'
import FlashSale from '../pages/FlashSale'

export default [{
    path: '/index',   // 首页
    component: Index,
    meta: {
        keepAlive: true,
    }
}, {
    path: '/list',
    component: ProductList,  // 搜索列表页
    meta: {
        keepAlive: true,
    }
}, {
    path: '/category',
    component: ProductList,  // 分类列表页
    meta: {
        keepAlive: true,
    }
}, {
    path: '/detail',  // 详情页
    component: ProductDetail,
    meta: {
        keepAlive: false,
    }
}, {
    path: '/sale',  // 限时抢购
    component: FlashSale,
    meta: {
        keepAlive: true
    }
}]