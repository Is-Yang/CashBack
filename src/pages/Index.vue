<template>
    <div id="index">
        <div class="main-wrapper" v-if="!isSearch">
            <div class="main-head">
                <div class="search-wrap">
                    <van-search slot="title" placeholder="粘贴淘宝宝贝标题，先领券再购物" @focus="onFocus"></van-search>
                </div>

                <van-swipe :autoplay="3000" indicator-color="white">
                    <van-swipe-item>
                        <router-link :to="{ path: '/list', query: { keyword: '三只松鼠' }}">
                            <img src="../assets/img/brand01.jpg" />
                        </router-link>
                    </van-swipe-item>
                </van-swipe>
            </div>

            <!-- 分类栏目 -->
            <div class="main-category">
                <van-row type="flex" justify="center">
                    <van-col>
                        <router-link :to="{ path: '/category', query: { cat_id: 1, cat_name: '女装' }}">
                            <img src="../assets/img/woman.png" />
                            女装
                        </router-link>
                    </van-col>
                    <van-col>
                        <router-link :to="{ path: '/category', query: { cat_id: 2, cat_name: '男装' }}">
                            <img src="../assets/img/man.png" />
                            男装
                        </router-link>
                    </van-col>
                    <van-col>
                        <router-link :to="{ path: '/category', query: { cat_id: 3, cat_name: '数码' }}">
                            <img src="../assets/img/shuma.png" />
                            数码
                        </router-link>
                    </van-col>
                    <van-col>
                        <router-link :to="{ path: '/category', query: { cat_id: 4, cat_name: '母婴' }}">
                            <img src="../assets/img/muying.png" />
                            母婴
                        </router-link>
                    </van-col>
                    <van-col>
                        <router-link :to="{ path: '/category', query: { cat_id: 5, cat_name: '食品' }}">
                            <img src="../assets/img/food.png" />
                            食品
                        </router-link>
                    </van-col>
                </van-row>
                <van-row type="flex" justify="center">
                    <van-col>
                        <router-link :to="{ path: '/category', query: { cat_id: 6, cat_name: '内衣' }}">
                            <img src="../assets/img/nieyi.png" />
                            内衣
                        </router-link>
                    </van-col>
                    <van-col>
                        <router-link :to="{ path: '/category', query: { cat_id: 7, cat_name: '居家' }}">
                            <img src="../assets/img/jiaju.png" />
                            居家
                        </router-link>
                    </van-col>
                    <van-col>
                        <router-link :to="{ path: '/category', query: { cat_id: 8, cat_name: '美妆' }}">
                            <img src="../assets/img/meizhuang.png" />
                            美妆
                        </router-link>
                    </van-col>
                    <van-col>
                        <router-link :to="{ path: '/category', query: { cat_id: 9, cat_name: '鞋包' }}">
                            <img src="../assets/img/xiebao.png" />
                            鞋包
                        </router-link>
                    </van-col>
                    <van-col>
                        <router-link :to="{ path: '/category', query: { cat_id: 10, cat_name: '运动' }}">
                            <img src="../assets/img/sport.png" />
                            运动
                        </router-link>
                    </van-col>
                </van-row>
            </div>

            <!-- 推荐 -->
            <div class="recommend">
                <div class="tit">
                    <img src="../assets/img/recommend@3x.png" />
                </div>

                <van-list class="list-wrap" 
                    v-model="dataLoading" 
                    :finished="finished" 
                    :finished-text="finishedText"
                    @load="onLoad">
                        <van-row type="flex" justify="space-between">
                            <van-col span="12" v-for="item in list" :key="item.id" @click.native="link(item.num_iid)">
                                <div class="product">
                                    <div class="coupon-price" v-if="item.coupon_money && item.coupon_money != 0">
                                        <span class="icon-coupon">￥{{item.coupon_money}}</span>
                                         <!-- <span class="icon-coupon">￥{{item.now_price ? item.now_price : 0}}</span> -->
                                    </div>
                                    <div class="img">
                                        <!-- <img :src="item.pict_url+'_240x240'" v-lazy="item.pict_url+'_240x240'" /> -->
                                        <div class="figure" v-lazy:background-image="item.pict_url + '_240x240'"></div>
                                    </div>
                                    <van-row type="flex" class="product-tit">
                                        <van-col class="icon-coupon taobao icon-coupon-list" v-if="item.user_type == 0"></van-col>
                                        <van-col class="icon-coupon tmall icon-coupon-list" v-if="item.user_type == 1"></van-col>
                                        <van-col class="text-line">{{item.title}}</van-col>
                                    </van-row>
                                    <div class="price">
                                        <van-row type="flex" justify="space-between">
                                            <div class="now">￥{{item.now_price | floatFilter}}</div>
                                            <div class="earnings" v-if="item.coupon_income">预估收益:￥{{item.coupon_income | floatFilter}}</div>
                                        </van-row>
                                        <van-row type="flex" justify="space-between">
                                            <del class="original">￥{{item.zk_final_price | floatFilter}}</del>
                                            <span class="sales">月销：{{item.volume}}</span>
                                        </van-row>
                                    </div>
                                </div>
                            </van-col>
                        </van-row>
                </van-list>
            </div>

            <Footer></Footer>
        </div>

        <Search v-if="isSearch" />
    </div>
</template>

<script>
    export default {
        data() {
            return {
                list: [],
                dataLoading: false,
                finished: false,
                finishedText: '暂无数据',
                isSearch: false,
                page_num: 1,
                user_id: ''
            }
        },
        mounted() {
            // window.addEventListener('resize', this.handleResize, true);
        },
        created() {
            // 用户Id
            this.user_id = this.$route.query.user_id ? this.$route.query.user_id : this.user_id;
            localStorage.setItem("userInfo", JSON.stringify({userId: this.user_id}));

            this.$eventHub.$on('cancel', (data)=> {
                this.isSearch = false;
            });

            // setTimeout(() => {
            //     this.handleResize();
            // }, 100);
        },
        methods: {
            onFocus() {
                this.isSearch = true;
            },
            handleResize() {
                let mainHead = document.getElementsByClassName("main-head")[0];
                let width = document.documentElement.clientWidth || document.body.clientWidth;
                if (mainHead) {
                    mainHead.style.height = width / 2.5 + 'px';
                }
            },
            link(id) {
                this.$router.push({ 
                    path: 'detail', 
                    query: { 
                        item_id: id,
                    }
                })
            },
            onLoad() {
                // 请求数据
                this.$eventHub.$emit('loading', true);
                $.ajax(this.$host.http_api + '/mall_category_item/query_list', {
                    data: {
                        cat_id: 11,
                        page_size: 20,
                        page_num: this.page_num
                    },
                    dataType: 'jsonp',
                    crossDomain: true,
                    success: ((res) => {
                        if (res && res.data) {
                            if (res.data.list) {
                                this.list = this.list.concat(res.data.list);
                                this.page_num++;
                            }

                            // 加载状态结束
                            this.dataLoading = false;
                            this.$eventHub.$emit('loading', false);
                            
                            // 再去请求是否有数据
                            if (this.list.length >= res.data.total) {
                                this.finished = true;

                                if (this.list.length > 0) {
                                    this.finishedText = "已到达最底";
                                }
                            }
                        }
                    })
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    #index {
        padding-bottom: 50px;
        .main-wrapper {
            .main-head {
                position: relative;

                .search-wrap {
                    width: 100%;
                    position: absolute;
                    z-index: 99;

                    .van-search {
                        .val-cell {
                            border-radius: 25px;
                        }

                        background: initial !important;

                    }
                }

                .van-swipe {
                    height: 100%;
                }

                /deep/ .van-search .van-cell {
                    background-color: rgba(255, 255, 255, .2);
                    border-radius: 25px;
                    line-height: .56rem;

                    .van-field__control,
                    .van-icon,
                    input::-webkit-input-placeholder {
                        color: #fff;
                        font-size: .26rem;
                    }

                    .van-icon {
                        font-size: .4rem;
                    }
                }
            }

            .main-category {
                padding: 2% 0;
                background-color: #fff;

                .van-col {
                    width: 20%;

                    a {
                        display: block;
                        padding: 0.05rem .15rem;
                        text-align: center;
                    }

                    img {
                        display: block;
                        margin: 0 auto;
                        padding: .12rem .15rem;
                        box-sizing: border-box;
                    }
                }
            }

            .recommend {
                .tit {
                    margin: .33rem 0;
                }

                /deep/ .list-wrap>div.van-row--flex {
                    flex-wrap: wrap;

                    &>.van-col {
                        margin-bottom: .1rem;
                        &:nth-child(even) {
                            padding-left: 0.05rem;
                        }
                        &:nth-child(odd) {
                            padding-right: 0.05rem;
                        }
                    }
                }

                .product {
                    background-color: #fff;
                    position: relative;
                    border-radius: 4px;

                    .coupon-price {
                        position: absolute;
                        top: 0;
                        right: 0;
                        z-index: 1;
                        min-width: 1rem;
                        padding: 0 0.05rem 0.08rem 0.1rem;
                        background-color: #ffece3;
                        color: rgb(255, 97, 27);
                        border-radius: 4px;

                        .icon-coupon {
                            width: auto;
                            display: block;
                            padding-left: .4rem;
                        }
                    }

                    .img {
                        // height: 3.7rem;
                        background-color: #efefef
                    }

                    .product-tit {
                        font-size: .26rem;
                        margin: .12rem .18rem;
                        height: .75rem;
                        color: #0d0805;
                    }

                    .price {
                        padding: 0 .12rem .2rem .12rem;
                        color: rgb(143, 154, 168);

                        /deep/ .van-row--flex {
                            align-items: center;
                            margin-bottom: .1rem;
                        }

                        del {
                            padding-left: 0.03rem;
                        }

                        .now {
                            display: block;
                            color: #fd333c;
                            font-size: .3rem;
                        }

                        .earnings {
                            background-color: #ffece3;
                            color: #ff611b;
                            padding: 2px 5px;
                            border-radius: 3px;
                            word-break: break-all;
                        }
                    }

                }
            }
        }
    }
</style>