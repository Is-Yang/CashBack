<template>
    <div id="flash-sale">
        <Header title="限时抢购"></Header>

        <div class="tabs-content">
            <van-tabs>
                <van-tab v-for="index in 8">
                    <div slot="title">
                        <span class="time">{{index}}</span>
                        <span>已开抢</span>
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
                                        <div class="sale-progress">
                                            <div class="progress-tip" style="width: 30%;"></div>
                                            已抢：1526
                                        </div>
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
                                                <van-button round type="danger" size="small">马上抢</van-button>
                                            </van-col>
                                        </van-row>
                                    </div>
                                </van-col>
                            </van-row>
                        </van-cell>
                    </van-list>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dataLoading: false,
            finished: false,
            list: []
        }
    },
    methods: {
        onLoad() {

        }
    }
}
</script>


<style lang="less" scoped>
    #flash-sale {
        .tabs-content {
            padding-top: 46px;

            /deep/ .van-tabs--line {
                padding-top: 1.2rem;
            }

            /deep/ .van-tabs__wrap {
                height: 1.2rem;
                .van-tabs__nav {
                    align-items: center;
                    padding: 0 .1rem;
                    background-image: -webkit-linear-gradient(0deg, #ff7422, #ff4760); 
                }

                .van-tabs__line {
                    background-color: initial;
                }

                .van-tab {
                    background-color: initial;
                    color: #fff;
                    flex-basis: 20%;

                    span {
                        line-height: .4rem;

                        &.time {
                            font-size: .38rem;
                        }
                    }

                    &.van-tab--active {
                        padding: .1rem 0;
                        background-color: #fff;
                        color: #ff7422;
                        border-radius: 4px;
                    }
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

            } 
        }

        /deep/ .van-button--danger {
            height: .5rem;
            line-height: .48rem;
            padding: 0 .35rem;
        }

        .sale-progress {
            width: 50%;
            position: relative;
            z-index: 1;
            line-height: .35rem;
            padding: 0 3%;
            margin-top: 0.05rem;
            border: 1px solid #fb3940;
            color: #fff;
            border-radius: 25px;
            font-size: .24rem;
        }

        .sale-progress .progress-tip {
            position: absolute;
            left: 0;
            background-color: #fb3940;
            height: 100%;
            border-radius: 25px;
            z-index: -1;

        }
    }
</style>
