<template>
    <div id="productDetail">
        <van-nav-bar left-arrow title="商品详情" @click-left="onClickLeft"></van-nav-bar>

        <div class="product-main">
            <div class="product-images">
                <van-swipe :autoplay="3000" indicator-color="white" v-if="productDetail.small_images.length > 0">
                    <van-swipe-item v-for="(image, index) in productDetail.small_images" :key="index">
                        <img :src="image" />
                    </van-swipe-item>
                </van-swipe>

                <div class="show-quan" v-if="coupon_money">
                    <div>减{{coupon_money}}元</div>
                    <div>领券</div>
                </div>
            </div>

            <van-row type="flex" class="product-title">
                <van-col class="icon-coupon" v-if="productDetail['coupon_money']"></van-col>
                <van-col>{{productDetail.title}}</van-col>
            </van-row>

            <van-row type="flex" justify="space-between" class="price-info">
                <van-col>
                    <span class="current">￥<em>{{productDetail['zk_final_price']}}</em></span>
                    <del class="origin">￥{{productDetail['zk_final_price']}}</del>
                </van-col>
                <!-- <van-col>
                    <span>￥5.0</span>
                    <div>双倍奖励金</div>
                </van-col> -->
            </van-row>

            <van-row type="flex" justify="space-between" class="reward-sales">
                <!-- <van-col class="reward">
                    奖励金 x3
                </van-col> -->
                <van-col></van-col>
                <van-col class="sales">
                    月销：{{productDetail['volume']}}
                </van-col>
            </van-row>
        </div>

        <van-goods-action>
            <van-goods-action-mini-btn text="分享" @click="shareMask = !shareMask" class="share"></van-goods-action-mini-btn>

            <van-goods-action-big-btn primary text="省钱购买" class="buy" id="copy-btn" @click="onBuy"
                data-clipboard-target="#coupon-copy"></van-goods-action-big-btn>
        </van-goods-action>

        <input hidden id="coupon-copy" type="text" v-model="tkl" />

        <div class="shareMask" v-if="shareMask" @click="shareMask = false"></div>

        <van-popup v-model="show">复制成功</van-popup>

        <div class="loading" v-if="loading">
            <van-loading type="spinner" color="white" />
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                shareMask: false,
                itemId: '',
                show: false,
                loading: false,
                userId: '',
                tkl: '',
                coupon_money: '',
                productDetail: {
                    small_images: [],
                }
            }
        },
        mounted() {
            window.addEventListener('resize', this.handleResize, true);
        },
        created() {
            setTimeout(() => {
                this.handleResize();
            }, 100);
            this.init();
        },
        methods: {
            handleResize() {
                let productImages = document.getElementsByClassName("product-images")[0];
                let width = document.documentElement.clientWidth || document.body.clientWidth;
                if (productImages) {
                    productImages.style.height = width + 'px';
                }
            },
            init() {
                if (this.$route.query) {
                    this.loading = true;
                    this.userId = this.$route.query.user_id;
                    this.itemId = this.$route.query.item_id;

                    let data = [];
                    $.ajax('http://search.jifan.dxanm.com/shop/detail', {
                        data: {
                            num_iid: this.itemId
                        },
                        dataType: 'jsonp',
                        crossDomain: true,
                        success: ((res) => {
                            let result = res.data.results.n_tbk_item;
                            if (result) {
                                this.productDetail = result;
                                this.productDetail.small_images = result.small_images.string;
                            }
                            this.loading = false;
                        })
                    })

                    this.getCoupon();
                }
            },
            onClickLeft() {
                this.$router.back()
            },
            getCoupon() {
                $.ajax('http://coupon.dxanm.com/coupon/get?user_id=' + this.userId + '&item_id=' + this.itemId, {
                    data: {},
                    dataType: 'jsonp',
                    crossDomain: true,
                    success: ((res) => {
                        let data = res.data;
                        this.coupon_money = data.coupon_money;
                        this.tkl = data.tkl;
                    })
                })
            },
            onBuy() {
                let clipboard = new Clipboard('#copy-btn');
                let _this = this;
                clipboard.on('success', function (e) {
                    _this.show = true;
                });
            }
        }
    }
</script>

<style lang="less">
    #productDetail {
        height: 100%;
        background-color: #fff;
        .product-main {
            overflow: auto;
            padding-bottom: 50px;
        }

        .price-info {
            padding: .1rem .2rem;
            height: .8rem;
            align-items: center;
            background-image: -webkit-linear-gradient(0deg, #ffac36, #ff611b); 
            color: #fff;
            .current em {
                font-size: .36rem;
            }

            .origin {
                margin: 0 .1rem;
                color: rgba(255, 255, 255, .5);
                font-size: .26rem;
            }

            .van-col:nth-child(2) span {
                font-size: .36rem;
                line-height: .36rem;
            }
        }
        .product-images {
            position: relative;
            background-color: #efefef;

            .show-quan {
                position: absolute;
                top:10px;
                right: 10px;
                z-index:1;
                width: 50px;
                height: 45px;
                background: url('../assets/img/quan.png') no-repeat left center;
                background-size: contain;
                text-align: center;
                color: #fff;

                div:nth-child(1) {
                    padding: 5px 0;
                    color: #ff611b;
                }
            }
        }

        .reward {
            position: relative;
            background-color: #ffac36;
            color: #fff;
            padding: 2px 5px 4px 5px;
            border-radius: 3px;
        }

        .reward::after {
            content: "";
            position: absolute;
            left: 20%;
            bottom: -4px;
            width: 6px;
            height: 6px;
            background-color: #ffac36;
            transform: rotate(45deg) translateX(-20%);
            z-index: 9;
        }

        .product-title {
            padding: .2rem;
            font-size: .32rem;
            color: rgb(13, 8, 5);
        }

        .reward-sales {
            margin: .13rem 0;
            // position: absolute;
            // left: 13px;
            // right: 13px;
            // bottom: 60px;
            // z-index: 1;
            align-items: center;
            color: rgb(143, 154, 168);
        }
    }
</style>