<template>
    <div id="index">
        <div class="main-wrapper" v-show="!isSearch">
            <div class="main-head">
                <div class="search-wrap">
                    <van-search slot="title" placeholder="粘贴宝贝标题或地址，搜索优惠劵" @focus="onFocus"></van-search>
                </div>

                <van-swipe :autoplay="3000" indicator-color="white">
                    <van-swipe-item>1</van-swipe-item>
                    <van-swipe-item>2</van-swipe-item>
                    <van-swipe-item>3</van-swipe-item>
                    <van-swipe-item>4</van-swipe-item>
                </van-swipe>
            </div>

            <!-- 分类栏目 -->
            <div class="main-classify">
                <van-row type="flex" justify="center">
                    <van-col>
                        <router-link :to="{ path: '/classify', query: { cat_id: 1, cat_name: '女装', user_id: user_id }}">
                            <img src="../assets/img/woman.png" />
                            女装
                        </router-link>
                    </van-col>
                    <van-col>
                        <router-link :to="{ path: '/classify', query: { cat_id: 2, cat_name: '男装', user_id: user_id }}">
                            <img src="../assets/img/man.png" />
                            男装
                        </router-link>
                    </van-col>
                    <van-col>
                        <router-link :to="{ path: '/classify', query: { cat_id: 3, cat_name: '数码', user_id: user_id }}">
                            <img src="../assets/img/shuma.png" />
                            数码
                        </router-link>
                    </van-col>
                    <van-col>
                        <router-link :to="{ path: '/classify', query: { cat_id: 4, cat_name: '母婴', user_id: user_id }}">
                            <img src="../assets/img/muying.png" />
                            母婴
                        </router-link>
                    </van-col>
                    <van-col>
                        <router-link :to="{ path: '/classify', query: { cat_id: 5, cat_name: '食品', user_id: user_id }}">
                            <img src="../assets/img/food.png" />
                            食品
                        </router-link>
                    </van-col>
                </van-row>
                <van-row type="flex" justify="center">
                    <van-col>
                        <router-link :to="{ path: '/classify', query: { cat_id: 6, cat_name: '内衣', user_id: user_id }}">
                            <img src="../assets/img/nieyi.png" />
                            内衣
                        </router-link>
                    </van-col>
                    <van-col>
                        <router-link :to="{ path: '/classify', query: { cat_id: 7, cat_name: '居家', user_id: user_id }}">
                            <img src="../assets/img/jiaju.png" />
                            居家
                        </router-link>
                    </van-col>
                    <van-col>
                        <router-link :to="{ path: '/classify', query: { cat_id: 8, cat_name: '美妆', user_id: user_id }}">
                            <img src="../assets/img/meizhuang.png" />
                            美妆
                        </router-link>
                    </van-col>
                    <van-col>
                        <router-link :to="{ path: '/classify', query: { cat_id: 9, cat_name: '鞋包', user_id: user_id }}">
                            <img src="../assets/img/xiebao.png" />
                            鞋包
                        </router-link>
                    </van-col>
                    <van-col>
                        <router-link :to="{ path: '/classify', query: { cat_id: 10, cat_name: '运动', user_id: user_id }}">
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
                    finished-text="已到达最底" 
                    @load="onLoad">
                    <van-row type="flex" justify="space-between" gutter="5">
                        <van-col span="12" v-for="item in list" :key="item.id" @click.native="link(item.num_iid)">
                            <div class="product">
                                <div class="coupon-price">
                                    <span class="icon-coupon" v-if="item.coupon_money">￥{{item.coupon_money}}</span>
                                </div>
                                <div class="img">
                                    <img :src="item.pict_url" />
                                </div>
                                <div class="text">
                                    <i class="taobao" v-if="item.user_type == 0"></i>
                                    <i class="tmall" v-if="item.user_type == 1"></i>
                                    {{item.title}}
                                </div>
                                <div class="price">
                                    <van-row type="flex" justify="space-between">
                                        <van-col class="txt-left">
                                            <span class="now">￥{{(item.zk_final_price - (item.coupon_amount ? item.coupon_amount : 0))}}</span>
                                            <del class="original">￥{{item.zk_final_price}}</del>
                                        </van-col>
                                        <van-col class="txt-right">
                                            <span class="earnings" v-if="item.coupon_income">预计收益:￥{{item.coupon_income}}</span>
                                            <span class="sales">月销：{{item.volume}}</span>
                                        </van-col>
                                    </van-row>
                                </div>
                            </div>
                        </van-col>
                    </van-row>
                </van-list>
            </div>
        </div>

        <Search v-show="isSearch" />
    </div>
</template>

<script>
    export default {
        data() {
            return {
                list: [],
                dataLoading: false,
                finished: false,
                isSearch: false,
                page_num: 1,
                user_id: 18
            }
        },
        mounted() {
            window.addEventListener('resize', this.handleResize, true);
        },
        created() {
            // 用户Id
            this.user_id = this.$route.query.user_id ? this.$route.query.user_id : this.user_id;

            this.$eventHub.$on('cancel', (data)=> {
                this.isSearch = false;
            });

            setTimeout(() => {
                this.handleResize();
            }, 100);
        },
        methods: {
            onFocus() {
                this.isSearch = true;
            },
            handleResize() {
                let mainHead = document.getElementsByClassName("main-head")[0];
                let width = document.documentElement.clientWidth || document.body.clientWidth;
                if (mainHead) {
                    mainHead.style.height = width / 2.15 + 'px';
                }
            },
            link(id) {
                this.$router.push({ 
                    path: 'detail', 
                    query: { 
                        user_id: this.user_id,
                        item_id: id,
                    }
                })
            },
            onLoad() {
                // 添加个背景样式
                let body = document.getElementsByTagName('body')[0];
                body.style.backgroundColor = '#fff';

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
        overflow-x: hidden;

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
                    background-color: rgb(252, 82, 96);
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

            .main-classify {
                padding: 2% 0;
                background-color: #fff;

                .van-col {
                    width: 20%;

                    a {
                        display: block;
                        padding: .12rem .15rem;
                        text-align: center;
                    }
                }
            }

            .recommend {
                .tit {
                    margin: .33rem 0;
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
                        padding: 0 0.2rem 0.1rem;
                        background-color: #ffece3;
                        color: rgb(255, 97, 27);
                        border-radius: 4px;

                        .icon-coupon {
                            height: .35rem;
                            display: block;
                            padding-left: .4rem;
                        }
                    }

                    .img {
                        height: 3.7rem;
                        background-color: #efefef
                    }

                    .text {
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        font-size: .26rem;
                        margin: .12rem .18rem;
                        height: .75rem;

                        &>i {
                            width: .32rem;
                            height: .32rem;
                            vertical-align: middle;
                            display: inline-block;
                        }
                    }

                    .price {
                        padding: 0 .12rem .18rem .12rem;

                        span,
                        del {
                            display: inline-block;
                            margin-bottom: .1rem;
                            color: rgb(143, 154, 168)
                        }

                        .now {
                            display: block;
                            color: rgb(252, 82, 96);
                            font-size: .3rem;
                        }

                        .earnings {
                            padding: 0 .1rem;
                            line-height: .4rem;
                            background-color: #ffece3;
                            color: rgb(255, 97, 27);
                        }
                    }

                }
            }
        }
    }
</style>