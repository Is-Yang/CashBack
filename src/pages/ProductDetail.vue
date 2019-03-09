<template>
    <div id="productDetail">
        <Header title="商品详情" :posFixed="true"></Header>
        <div class="product-main">
            <div class="product-images">
                <van-swipe :autoplay="3000" indicator-color="white" v-if="productDetail.small_images.length > 0">
                    <van-swipe-item v-for="(image, index) in productDetail.small_images" :key="index">
                        <img :src="image" />
                    </van-swipe-item>
                </van-swipe>

                <div class="show-quan" v-if="coupon_money>0">
                    <div>减{{coupon_money}}元</div>
                    <div>领券</div>
                </div>
            </div>

            <van-row type="flex" class="product-title">
                <van-col class="icon-coupon taobao" v-if="productDetail['user_type']==0"></van-col>
                <van-col class="icon-coupon tmall" v-if="productDetail['user_type']==1"></van-col>
                <van-col>{{productDetail.title}}</van-col>
            </van-row>

            <van-row type="flex" justify="space-between" class="price-info">
                <van-col>
                    <span class="current">￥<em>{{current_price}}</em></span>
                    <del class="origin">￥{{productDetail['zk_final_price']}}</del>
                </van-col>
                <van-col>
                    <span>￥{{coupon_income}}</span>
                    <div>预估收益</div>
                </van-col>
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

            <!-- 图文详情 -->
            <div class="details-img">
                <img v-for="(img, index) in productDetail.imgeText" :key="index"
                    :src="img" v-lazy="img" />
            </div>
        </div>

        <van-goods-action>
            <van-goods-action-mini-btn text="分享" @click="shareMask = !shareMask" class="share"></van-goods-action-mini-btn>

            <van-goods-action-big-btn primary :text="buyText" ref="buy" class="buy" id="copy-btn" @click="onBuy"></van-goods-action-big-btn>
        </van-goods-action>

        <input hidden id="coupon-copy" type="text" v-model="tkl" />

        <div class="shareMask" v-if="shareMask" @click="shareMask = false"></div>
    </div>
</template>

<script>
    import ClipboardJS from 'clipboard';
    export default {
        data() {
            return {
                shareMask: false,
                itemId: '',
                userId: '',
                tkl: '',
                clipboardObject: null,
                buyText: '省钱购买',
                coupon_money: 0,
                coupon_income: '',
                current_price: '',
                productDetail: {
                    small_images: [],
                    imgeText: []
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
                    this.$eventHub.$emit('loading', true);
                    this.userId = this.$route.query.user_id;
                    this.itemId = this.$route.query.item_id;

                    let data = [];
                    $.ajax(this.$host.http_api+'/shop/detail', {
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
                            this.$eventHub.$emit('loading', false);
                        })
                    })
                    this.getDetail();
                    this.getCoupon();
                }
            },
            getCoupon() {
                $.ajax(this.$host.conpon_api+'/coupon/get?user_id=' + this.userId + '&item_id=' + this.itemId, {
                    data: {},
                    dataType: 'jsonp',
                    crossDomain: true,
                    success: ((res) => {
                        if (res.err) {
                            this.$toast(res.err.msg);
                            return;
                        }
                        let data = res.data;
                        if (data) {
                            if(data.coupon_money) {
                                this.coupon_money = data.coupon_money;
                                this.current_price = this.productDetail.zk_final_price - data.coupon_money;
                            }else{
                                this.current_price = this.productDetail.zk_final_price;
                            }
                            this.coupon_income = data.coupon_income ? data.coupon_income:data.income;
                            this.tkl = data.tkl;

                            let _this = this;
                            var copy_btn = document.getElementById('copy-btn');
                            this.clipboardObject = new ClipboardJS(copy_btn, {
                                text: function() {
                                    return _this.tkl;
                                }
                            });
                        }
                    })
                })
            },
            onBuy() {
                let _this = this;
                if (this.clipboardObject != null) {
                    this.clipboardObject.on('success', function (e) {
                        _this.$toast('已复制');
                        _this.buyText = '已复制，请打开淘宝购买';
                    });
                } else {
                    _this.$toast('未获取到信息');
                }
            },
            getDetail() {
                $.ajax(this.$host.http_api + '/taobao_item/get_desc', {
                    data: {
                        item_id: this.itemId
                    },
                    dataType: 'jsonp',
                    crossDomain: true,
                    success: ((res) => {
                        if (res.data) {
                            this.productDetail.imgeText = res.data;
                        }
                    })
                })
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
            padding-top: 46px;
            padding-bottom: 50px;
        }

        .price-info {
            padding: .1rem .2rem;
            height: .8rem;
            align-items: center;
            background-image: -webkit-linear-gradient(0deg, #ffac36, #ff611b); 
            color: #fff;
            text-align:center;
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
            overflow: hidden;

            .show-quan {
                position: absolute;
                top:10px;
                right: 10px;
                z-index: inherit;
                width: 50px;
                height: 45px;
                background: url('../assets/img/quan.png') no-repeat left center;
                background-size: contain;
                text-align: center;
                color: #fff;

                div:nth-child(1) {
                    padding: 5px 0 3px;
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
            font-weight: 600;
        }

        .reward-sales {
            margin: .13rem 0.2rem;
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