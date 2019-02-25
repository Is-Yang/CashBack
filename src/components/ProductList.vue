<template>
    <div id="productList">
        <div class="head-wrap">
            <van-nav-bar left-arrow>
                <form action="/" slot="title">
                    <van-search slot="title" v-model="paramsScreen.keywords" placeholder="请输入关键词" @search="onSearch">
                    </van-search>
                </form>
                <div slot="right" @click="onSearch">搜索</div>
            </van-nav-bar>

            <div class="product-screen">
                <div class="van-hairline--bottom">
                    <van-row type="flex" justify="space-between" class="nav-screen">
                        <van-col v-for="(item, index) in navScreen" :key="index" :class="{active:index==isNavActive}">
                            <div @click="onNavScreen(item.value)">{{item.label}}</div>
                        </van-col>
                    </van-row>
                </div>

                <van-row type="flex" justify="space-between" class="screen-list">
                    <van-col class="screen-item" v-for="(item, index) in screen" :key="item.value" @click.native="onScreen(item.value)"
                        :class="{'active':index==isActive}">
                        <div v-if="item.value == 2 || item.value == 3" 
                            :class="(isSort == 1 && item.value == sortType) ? 'icon-sort' : (isSort == 2 && item.value == sortType) ? 'icon-drop' : ''" 
                            @click="sortScreen(isSort, item.value)">
                            {{item.label}}
                        </div>
                        <div v-if="item.value != 2 && item.value != 3">
                            {{item.label}}
                        </div>
                    </van-col>
                </van-row>

                <van-cell-group>
                    <van-switch-cell v-model="paramsScreen.checked" @input="onSearch" active-color="#ff611b" title="仅显示优惠券商品" />
                </van-cell-group>
            </div>
        </div>

        <van-list class="list-wrap" 
            v-model="dataLoading" 
            :finished="finished" 
            finished-text="已到达最底" 
            @load="onLoad">
            <van-cell v-for="(item, index) in list" :key="index">
                <van-row type="flex" @click.native="link(item.num_iid)">
                    <van-col class="product-img">
                        <img :src="item.pict_url+'_240x240'" v-lazy="item.pict_url+'_240x240'" />
                        <!-- <div class="discounts" v-if="item.coupon_info">
                            <span>{{item.coupon_info}}</span>
                        </div> -->
                    </van-col>
                    <van-col offset="1" class="product-content">
                        <div class="product-info">
                            <van-row type="flex" class="product-tit">
                                <van-col class="icon-coupon taobao icon-coupon-list" v-if="item.user_type==0"></van-col>
                                <van-col class="icon-coupon tmall icon-coupon-list" v-if="item.user_type==1"></van-col>
                                <van-col>{{item.title}}</van-col>
                            </van-row>
                            <van-row type="flex" justify="space-between">
                                <van-col>
                                    <span class="price">{{'￥' + (item.zk_final_price - item.coupon_amount)}}</span>
                                    <span>天猫价：{{'￥' + item.zk_final_price}}</span>
                                </van-col>
                                <van-col>月销：{{item.volume}}</van-col>
                            </van-row>
                            <p class="shop">{{item.shop_title}}</p>
                        </div>
                        <div class="item-foot">
                            <van-row type="flex" justify="space-between">
                                <van-col>
                                    <div class="item-coupon" v-if="item.coupon_amount != 0">
                                        券 &nbsp;
                                        {{'￥' + item.coupon_amount}}
                                    </div>
                                </van-col>
                                <van-col>
                                    <div class="earnings">预估收益：{{'￥' + item.coupon_income}}</div>
                                </van-col>
                            </van-row>
                        </div>
                    </van-col>
                </van-row>
            </van-cell>
        </van-list>

        <div class="loading" v-if="loading">
            <van-loading type="spinner" color="white" />
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                isNavActive: 0,
                isActive: 0,
                isSort: '',
                sortType: '',
                list: [],
                loading: false,
                dataLoading: false,
                finished: false,
                flag: false,
                paramsScreen: {
                    checked: false,
                    page_no: 1,
                    q: '',
                    keywords: '女装',
                },
                navScreen: [
                    {
                        label: '全部',
                        value: 0,
                    },
                    {
                        label: '天猫',
                        value: 1
                    }, {
                        label: '全球购',
                        value: 2
                    }

                ],
                screen: [{
                    label: '综合排序',
                    value: 0
                }, {
                    label: '销量优先',
                    value: 1
                }, {
                    label: '价格排序',
                    value: 2
                }, {
                    label: '比率排序',
                    value: 3
                }]
            }
        },
        filters: {
            rateFilter(value) {
                return parseFloat(value * 100).toFixed(2) + '%';
            }
        },
        mounted() {
            window.addEventListener('resize', this.handleResize);
        },
        created() {
            setTimeout(() => {
                this.handleResize();
            }, 100);
        },
        /*beforeRouteEnter(to, from, next) {
            if (from.path == "/detail") {
              to.meta.isBack = true;
            } else {
              to.meta.isBack = false;
            }
            next();
        },
        activated() {
            if (!this.$route.meta.isBack) {
              this.list = [];
              this.paramsScreen.page_no = 1;
              this.onLoad();
            }
            this.$route.meta.isBack = false;
        },*/
        methods: {
            handleResize() {
                let headWrap = document.getElementsByClassName("head-wrap")[0];
                let listWrap = document.getElementsByClassName("list-wrap")[0];
                if (headWrap) {
                    listWrap.style.marginTop = headWrap.clientHeight + 'px';
                }
            },
            link(id) {
                if (this.$route.query) {
                    this.$router.push({ 
                        path: 'detail', 
                        query: { 
                            user_id: this.$route.query.user_id,
                            item_id: id,
                        }
                    })
                }
            },
            toSrollTop(){
                document.documentElement.scrollTop = document.body.scrollTop = 0;
                return ;
            },
            onLoad(params = {}) {
                // 判断关键字 如果关键字为空，则搜索关键字为上一个
                this.paramsScreen.q = this.paramsScreen.keywords ? this.paramsScreen.keywords : this.paramsScreen.q;
                Object.assign(this.paramsScreen, params);
                let _this = this;

                /*
                    查询条件
                    page_no：翻页，可补充，默认是1
                    page_size：每页多少条数据，可不传，默认20
                    q：关键词
                    sort_type：0综合排序、1-销量优先、2-价格升序、3-价格降序、4-比率升序、5-比率降序
                    is_overseas：true海外
                    is_tmall：true天猫
                    has_coupon：有优惠
                */
                if (this.flag) {
                    this.toSrollTop();
                }

                $.ajax(this.GLOBAL.http_api+'/shop/index', {
                    data: {
                        page_no: this.flag ? 1 : this.paramsScreen.page_no,
                        page_size: 20,
                        q: this.paramsScreen.q,
                        sort_type: this.paramsScreen.sort_type || 0,
                        is_overseas: this.paramsScreen.is_overseas || false,
                        is_tmall: this.paramsScreen.is_tmall || false,
                        has_coupon: this.paramsScreen.checked || false
                    },
                    dataType: 'jsonp',
                    crossDomain: true,
                    success: function (res) {
                        if (res.data.result_list && res.data.result_list.map_data.length > 0) {
                            if (!_this.flag) {
                                // res.data.result_list.map_data.forEach(item => {
                                //     _this.list.push(item);
                                // });
                                 _this.list =  _this.list.concat(res.data.result_list.map_data);
                                  _this.paramsScreen.page_no++;

                                
                            } else {
                                _this.list = res.data.result_list.map_data;
                                _this.paramsScreen.page_no = 2;
                                _this.flag = false;
                            }

                            // 加载状态结束
                             _this.dataLoading = false;
                             _this.loading = false;
                            
                            // 再去请求是否有数据
                            if (_this.list.length >= res.data.total_results) {
                                _this.finished = true;
                            }
                        }
                    }
                })
            },
            onScreen(value) {
                this.isActive = value;
                if (value != 2 && value != 3) {
                    this.paramsScreen.sort_type = value;
                    this.flag = true;
                    this.isSort = '';
                    this.loading = true;
                    this.onLoad(this.paramsScreen);
                } 
            },
            onNavScreen(value) {
                this.isNavActive = value;
                if (value == 1) {
                    this.paramsScreen.is_tmall = true;
                    this.paramsScreen.is_overseas = false;
                } else if (value == 2) {
                    this.paramsScreen.is_tmall = false;
                    this.paramsScreen.is_overseas = true;
                } else {
                   this.paramsScreen.is_tmall = false;
                   this.paramsScreen.is_overseas = false;
                }
                this.flag = true;
                this.loading = true;
                this.finished = false;
                this.onLoad(this.paramsScreen);
            },
            onSearch() {
                this.flag = true;
                this.loading = true;
                this.finished = false;
                this.onLoad(this.paramsScreen);
            },
            sortScreen(sort, type) {
                // type 2: 价格 3：比率
                // sort 1: 升，2：降
                this.sortType = type;  
                if (sort == '') {
                    this.isSort = 1;
                } else if (sort == 1) {
                    this.isSort = 2;
                } else {
                    this.isSort = 1;
                }

                if (this.isSort == 1) {
                    this.paramsScreen.sort_type = type == 2 ? 2 : 4;
                } else if (this.isSort == 2) {
                    this.paramsScreen.sort_type = type == 2 ? 3 : 5;
                } else {
                     this.paramsScreen.sort_type = '';
                }

                this.flag = true;
                this.loading = true;
                this.onLoad(this.paramsScreen);
            }
        }

    }
</script>

<style lang="less">
#productList {
    .head-wrap {
        position: fixed;
        top:0;
        left:0;
        right:0;
        z-index: 9;
    }

    .van-search {
        padding: 0;
        height: 100%;
        background-color: #fff!important;

        .van-cell {
            background: rgb(242, 242, 242);
            border-radius: 25px;
            line-height: 30px;
        }
    }

    .product-screen {
        position: relative;
        background-color: #fff;

        .nav-screen {
            padding: .25rem;
            box-sizing: border-box;

            .van-col {
                width: 33.333%;
                text-align: center;
                font-size: .28rem;
                color: rgb(51, 51, 51);

                &.active {
                    font-size: .32rem;
                    color: #ff611b;
                }
            }
        }
    }

    .screen-list {
        padding: .1rem .5rem;
        background-color: #fff;

        .screen-item {
            height: .6rem;
            line-height: .6rem;
            font-size: .28rem; 
            color: rgb(102, 102, 102);

            &.active {
                color: #ff611b;
            }

            .icon-sort {
                background: url('../assets/img/sheng.png') no-repeat right 0.2rem;
                background-size: contain;
                background-size: 0.18rem;
                padding-right: 0.25rem;
            }

            .icon-drop {
                background: url('../assets/img/jiang.png') no-repeat right 0.2rem;
                background-size: contain;
                background-size: 0.18rem;
                padding-right: 0.25rem;
            }
        }
    }

    .list-wrap {
        .van-cell {
            margin-bottom: .2rem;
            padding: 10px;
            cursor: pointer;
        }

        .product-img {
            width: 2.1rem;
            height: 2.1rem;
            position: relative;

            .discounts {
                position: absolute;
                bottom: 6%;
                left: 0;
                right: 0;
                z-index: 1;
                transform: translateY(-6%);
                text-align: center;
                 span{
                    background-image: -webkit-linear-gradient(0deg, #ffac36, #ff611b);
                    color: #fff;
                    font-size: 12px;
                    line-height: 15px;
                    border-radius: 25px;
                    padding: 2px .088rem
                }
            }
        }

        .product-tit {
            font-size: .26rem;
            line-height: .34rem;
            margin-bottom: .1rem;
            color: rgb(13, 8, 5);
            font-weight: 600;
        }

        .product-info {
            font-size: 12px;
            line-height: 18px;
            color: rgb(143, 154, 168);

            .price {
                color: #fd333c;
                font-size: .3rem;
                margin-right: .1rem;
            }

            .shop {
                margin-top: .1rem;
            }
        }

        .product-content {
            -webkit-flex: 1;
            flex:1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .item-foot {
            .van-row {
                align-items: flex-end;
                color: rgb(143, 154, 168);
                font-size: 12px;
                line-height: 18px;
            }
            .num {
                color: #323233;
                font-size: .28rem;
            } 

            .item-coupon {
                padding: 1px 6px;
                background-color: #fc5260;
                border-radius: 2px;
                text-align: center;
                color: #fff;
                position: relative;

                &::after, &::before{
                    content: "";
                    position: absolute;
                    height: 4px;
                    width: 4px;
                    background-color: #fff;
                    border-radius: 50%;
                    left: 40%;
                    transform: translateX(-40%);
                    z-index: 9;
                }
                &::after {
                    bottom: -1px;
                }
                &::before {
                    top: -1px;
                }
            }

            .earnings {
                background-color: #ffece3;
                color: #ff611b;
                padding: 2px 5px;
                border-radius: 3px;
            }
        } 
    }
} 
</style>

