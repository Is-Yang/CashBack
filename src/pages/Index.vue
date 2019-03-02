<template>
    <div id="index">
        <div class="main-wrapper" v-if="false">
            <div class="main-head">
                <div class="search-wrap">
                    <van-search slot="title" placeholder="粘贴宝贝标题或地址，搜索优惠劵"></van-search>
                </div>

                <van-swipe :autoplay="3000" indicator-color="white">
                    <van-swipe-item>1</van-swipe-item>
                    <van-swipe-item>2</van-swipe-item>
                    <van-swipe-item>3</van-swipe-item>
                    <van-swipe-item>4</van-swipe-item>
                </van-swipe>
            </div>

            <div class="main-classify">
                <van-row type="flex" justify="center">
                    <van-col>
                        <img src="../assets/img/woman.png" />
                        女装
                    </van-col>
                    <van-col>
                        <img src="../assets/img/man.png" />
                        男装
                    </van-col>
                    <van-col>
                        <img src="../assets/img/shuma.png" />
                        数码
                    </van-col>
                    <van-col>
                        <img src="../assets/img/muying.png" />
                        母婴
                    </van-col>
                    <van-col>
                        <img src="../assets/img/food.png" />
                        食品
                    </van-col>
                </van-row>
                <van-row type="flex" justify="center">
                    <van-col>
                        <img src="../assets/img/nieyi.png" />
                        内衣
                    </van-col>
                    <van-col>
                        <img src="../assets/img/jiaju.png" />
                        居家
                    </van-col>
                    <van-col>
                        <img src="../assets/img/meizhuang.png" />
                        美妆
                    </van-col>
                    <van-col>
                        <img src="../assets/img/xiebao.png" />
                        鞋包
                    </van-col>
                    <van-col>
                        <img src="../assets/img/sport.png" />
                        运动
                    </van-col>
                </van-row>
            </div>

            <div class="recommend">
                <div class="tit">
                    <img src="../assets/img/recommend@3x.png" />
                </div>
                <van-row type="flex" justify="space-between" gutter="5">
                    <van-col>
                        <div class="product">
                            <div class="coupon-price">
                                <span class="icon-coupon">￥50</span>
                            </div>
                            <div class="img"></div>
                            <div class="text">
                                <span class="tmall"></span>
                                xxxxxxx
                            </div>
                            <div class="price">
                                <van-row type="flex" justify="space-between">
                                    <van-col class="txt-left">
                                        <span class="now">￥30.00</span>
                                        <del class="original">￥36.00</del>
                                    </van-col>
                                    <van-col class="txt-right">
                                        <span class="earnings">预计收益:￥10.00</span>
                                        <span class="sales">月销：1260</span>
                                    </van-col>
                                </van-row>
                            </div>
                        </div>
                    </van-col>

                    <van-col>
                        <div class="product">
                            <div class="coupon-price">
                                <span class="icon-coupon">￥50</span>
                            </div>
                            <div class="img"></div>
                            <div class="text">
                                <span class="tmall"></span>
                                描述描述描述描述描述描述描述
                            </div>
                            <div class="price">
                                <van-row type="flex" justify="space-between">
                                    <van-col class="txt-left">
                                        <span class="now">￥30.00</span>
                                        <del class="original">￥36.00</del>
                                    </van-col>
                                    <van-col class="txt-right">
                                        <span class="earnings">预计收益:￥10.00</span>
                                        <span class="sales">月销：1260</span>
                                    </van-col>
                                </van-row>
                            </div>
                        </div>
                    </van-col>
                </van-row>
            </div>
        </div>

        <div class="search-wrapper">
            <div class="search-head">
                <van-nav-bar>
                    <form action="/" slot="title">
                        <van-search slot="title" placeholder="请输入关键词" show-action></van-search>
                    </form>
                </van-nav-bar>
            </div>

            <div v-if="false">
                <div class="hot">
                    <h3>
                        <van-icon name="fire" />
                        热门搜索
                    </h3>

                    <van-row class="list-label">
                        <van-col>绿色</van-col>
                        <van-col>波浪</van-col>
                        <van-col>span: 8</van-col>
                    </van-row>

                </div>
                <div class="history">
                    <h3>
                        <van-row type="flex" justify="space-between">
                            <van-col>
                                <van-icon name="clock-o" />
                                搜索历史
                            </van-col>
                            <van-col>清空</van-col>
                        </van-row>
                    </h3>

                    <div class="list-item">
                        <van-row type="flex" justify="space-between">
                            <van-col>
                                搜索内容啥啥啥xx
                            </van-col>
                            <van-col>
                                <van-icon name="cross" />
                            </van-col>
                        </van-row>
                        <van-row type="flex" justify="space-between">
                            <van-col>
                                搜索内容啥啥啥2
                            </van-col>
                            <van-col>
                                <van-icon name="cross" />
                            </van-col>
                        </van-row>
                        <van-row type="flex" justify="space-between">
                            <van-col>
                                搜索内容啥啥啥d
                            </van-col>
                            <van-col>
                                <van-icon name="cross" />
                            </van-col>
                        </van-row>
                    </div>
                </div>
            </div>

            <div class="search-result">
                <van-row type="flex" justify="space-between">
                    <van-col>
                        搜索内容啥啥啥xx
                    </van-col>
                    <van-col><span class="icon-go"></span></van-col>
                </van-row>
                <van-row type="flex" justify="space-between">
                    <van-col>
                        搜索内容啥啥啥xx
                    </van-col>
                    <van-col><span class="icon-go"></span></van-col>
                </van-row>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        created() {
            setTimeout(() => {
                this.handleResize();
                this.init();
            }, 100);
        },
        methods: {
            handleResize() {
                let mainHead = document.getElementsByClassName("main-head")[0];
                let width = document.documentElement.clientWidth || document.body.clientWidth;
                if (mainHead) {
                    mainHead.style.height = width / 2.15 + 'px';
                }
            },
            init() {
                let body = document.getElementsByTagName('body')[0];
                body.style.backgroundColor = '#fff';
            }
        }
    }
</script>

<style lang="less" scoped>
    #index {
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
                    padding: 2% 3%;
                    text-align: center;
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
                        margin: .15rem .22rem;
                        height: .68rem;

                        .tmall {
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
                            padding: 0 .12rem;
                            line-height: .4rem;
                            background-color: #ffece3;
                            color: rgb(255, 97, 27);
                        }
                    }

                }
            }
        }

        .search-wrapper {
            background-color: #f5f5f9;

            /deep/ .van-nav-bar__title {
                width: 100%;
                max-width: 100%;
                padding: 0 0 0 .3rem;
                height: 100%;
                box-sizing: border-box;

                form {
                    height: 100%;
                }

                .van-search__action {
                    padding-right: .3rem;
                    color: #000;
                }
            }

            /deep/ .van-nav-bar .van-icon {
                font-size: 22px;
                color: #888;
            }

            /deep/ .van-search {
                padding: 0;
                height: 100%;
                background-color: #fff !important;

                .van-cell {
                    background: rgb(242, 242, 242);
                    border-radius: 25px;
                    line-height: 30px;
                }
            }

            .search-head {
                margin-bottom: .2rem;
            }

            .hot,
            .history {
                background-color: #fff;
                margin-bottom: .1rem;
                padding: .15rem .15rem .35rem .15rem;
                font-size: .28rem;

                h3 {
                    padding: .2rem .1rem;
                    font-weight: 500;
                    font-size: .24rem;

                    /deep/ .van-icon {
                        font-size: .36rem;
                        vertical-align: middle;
                    }
                }
            }

            .hot {
                /deep/ .van-icon {
                    color: #fc5260;
                }

                .list-label {
                    /deep/ .van-col {
                        margin: .1rem;
                        padding: 0.13rem 0.2rem;
                        background-color: rgb(245, 245, 249);
                        border-radius: 4px;
                    }
                }
            }

            .history {
                /deep/ .van-icon {
                    color: #ccc;
                }

                .list-item {
                    /deep/ .van-row--flex {
                        padding: .23rem .15rem;
                        position: relative;

                        ::after {
                            content: "";
                            position: absolute;
                            border-color: #e8e8e8;
                            position: absolute;
                            pointer-events: none;
                            box-sizing: border-box;
                            top: -50%;
                            left: -50%;
                            right: -55%;
                            bottom: -50%;
                            -webkit-transform: scale(.5);
                            transform: scale(.5);
                            border: 0 solid #ebedf0;
                            border-bottom-width: 1px;
                        }
                    }
                }
            }

            .search-result {
                background-color: #fff;
                .icon-go {
                    display: inline-block;
                    width: .32rem;
                    height: .32rem;
                }

                /deep/ .van-row--flex {
                    padding: .23rem .15rem;
                    position: relative;
                    font-size: .28rem;

                    ::after {
                        content: "";
                        position: absolute;
                        border-color: #e8e8e8;
                        position: absolute;
                        pointer-events: none;
                        box-sizing: border-box;
                        top: -50%;
                        left: -50%;
                        right: -55%;
                        bottom: -50%;
                        -webkit-transform: scale(.5);
                        transform: scale(.5);
                        border: 0 solid #ebedf0;
                        border-bottom-width: 1px;
                    }
                }
            }

        }

    }
</style>