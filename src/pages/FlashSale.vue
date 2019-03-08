<template>
    <div id="flash-sale">
        <Header title="限时抢购" :posFixed="true"></Header>

        <div class="tabs-content">
            <van-tabs v-model="active" @click="getSale">
                <van-tab v-for="(item, index) in timeNodes" :key="index">
                    <div slot="title">
                        <span class="time">{{item.time}}</span>
                        <span>{{item.label}}</span>
                    </div>
                    
                    <van-list class="list-wrap" 
                        v-model="dataLoading" 
                        :finished="finished" 
                        finished-text="已到达最底" 
                        @load="onLoad">
                        <van-cell v-for="(item, index) in list" :key="index">
                            <van-row type="flex" @click.native="link(item.num_iid)">
                                <van-col class="product-img">
                                    <img :src="item.pic_url" v-lazy="item.pic_url" />
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
                                                <span class="price" v-if="item.zk_final_price">{{'￥' + item.zk_final_price}}</span>
                                                <span>天猫价：{{'￥' + item.reserve_price}}</span>
                                            </van-col>
                                            <van-col>月销：{{item.volume}}</van-col>
                                        </van-row>
                                        <div class="sale-progress" v-if="item.total_amount && item.sold_num">
                                            <div class="progress-tip" :style="{width:(item.total_amount/(item.total_amount/item.sold_num) + '%')}"></div>
                                            已抢：{{item.sold_num}}
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
                                                <van-button round type="danger" size="small" @click.native="link(item.num_iid)">马上抢</van-button>
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
import moment from 'moment';
export default {
    data() {
        return {
            active: '',
            dataLoading: false,
            finished: false,
            flag: false,
            timeNodes: [
                {
                    time: '12:00',
                    label: '已开抢'
                }, {
                    time: '14:00',
                    label: '已开抢'
                }, {
                    time: '16:00',
                    label: '已开抢'
                }, {
                    time: '18:00',
                    label: '已开抢'
                }, {
                    time: '20:00',
                    label: '已开抢'
                }, {
                    time: '22:00',
                    label: '已开抢'
                }, {
                    time: '24:00',
                    label: '已开抢'
                }, {
                    time: '08:00',
                    label: ''
                }, {
                    time: '10:00',
                    label: ''
                }, {
                    time: '12:00',
                    label: ''
                }, {
                    time: '14:00',
                    label: ''
                }, {
                    time: '16:00',
                    label: ''
                }, {
                    time: '18:00',
                    label: ''
                }, {
                    time: '20:00',
                    label: ''
                }, {
                    time: '22:00',
                    label: ''
                }, {
                    time: '24:00',
                    label: ''
                }, {
                    time: '08:00',
                    label: '即将开抢'
                }, {
                    time: '10:00',
                    label: '即将开抢'
                }, {
                    time: '12:00',
                    label: '即将开抢'
                }
            ],
            list: [],
            filter: {
                page_num: 1,
                start_time: '',
                end_time: '',
            },
            currentDate: new Date()
        }
    },
    mounted () {
        this.init();
    },
    created () {
        this.init();
    },
    methods: {
        init(){
            let currentDate = this.currentDate;
            let hours = this.currentDate.getHours();
            let minutes = currentDate.getMinutes();

            this.timeNodes.forEach((item, index) => {
                if (item.label == '') {
                    // 数组里的时间小于当前时间时
                    if (item.time < moment(currentDate).format('HH:00')) {
                        this.timeNodes[index].label = '已开抢';
                    } else if (item.time > moment(currentDate).format('HH:00')) {  // 数组里的时间大于当前时间时
                        this.timeNodes[index].label = '即将开抢';
                    } else if (item.time == moment(currentDate).format('HH:00') || item.time == moment(currentDate.getTime() - 1*60*60*1000).format('HH:00')) {
                        // 数组里的时间等于当前时间时 或者 当前时间的后一个小时时为抢购中
                        this.timeNodes[index].label = '抢购中';
                    }
                }
            });


            // if (minutes < 59) {
            //     this.filter.start_time = moment(currentDate).format('YYYY-MM-DD HH:00:00');
            //     this.filter.end_time = moment(currentDate.getTime() + 1*60*60*1000).format('YYYY-MM-DD HH:00:00');

            //     let startH = moment(currentDate.getTime() - 1*60*60*1000).format('HH:00');
            //     let endH = moment(currentDate).format('HH:00');
            //     console.log(startH, endH)
            //     this.timeNodes.forEach((ele, index) => {
            //         if (ele.label == '抢购中' && (startH == ele.time || endH == ele.time)) {
            //             this.active = index;
            //         }
            //     });
            // }


        },
        toSrollTop(){
            document.documentElement.scrollTop = document.body.scrollTop = 0;
            return ;
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
        getSale(index) {
            console.log(index)
        },
        onLoad(params = {}) {
            Object.assign(this.filter, params);
            /*
                查询条件
                page_num：翻页，可补充，默认是1
                page_size：每页多少条数据，可不传，默认20
                start_time: 开团时间开始(注：开始和结束时间，都仅针对start_time限定)
                end_time: 开团时间结束(注：开始和结束时间，都仅针对start_time限定)
            */
           if (this.flag) {
                this.toSrollTop();
            }
           $.ajax(this.$host.http_api + '/mall_tqg/query_list', {
               data: {
                   page_num: this.flag ? 1 : this.filter.page_num,
                   page_size: 20,
                   start_time: this.filter.start_time,
                   end_time: this.filter.end_time
               },
               dataType: 'jsonp',
               crossDomain: true,
               success: ((res) => {
                   if (res.data) {
                       let data = res.data;
                       if (data && data.list) {
                            if (!this.flag) {
                                this.list =  this.list.concat(data.list);
                                this.filter.page_num++;
                                
                            } else {
                                this.list = data.list;
                                this.filter.page_num = 2;
                                this.flag = false;
                            }

                            // 加载状态结束
                            this.dataLoading = false;
                            this.$eventHub.$emit('loading', false);
                            
                        }

                        // 再去请求是否有数据
                        if (this.list.length >= data.total) {
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
    #flash-sale {
        .tabs-content {
            padding-top: 46px;

            /deep/ .van-tabs--line {
                padding-top: 1rem;
            }

            /deep/ .van-tabs__wrap {
                height: 1rem;
                .van-tabs__nav {
                    align-items: center;
                    padding: 0 .1rem;
                    background-image: -webkit-linear-gradient(0deg, #ff7422, #ff4760); 
                }

                .van-tabs__line {
                    background-color: initial;
                    bottom: 0;
                }

                .van-tab {
                    background-color: initial;
                    color: #fff;
                    flex-basis: 20%!important;

                    span {
                        line-height: .34rem;
                        font-size: .24rem;

                        &.time {
                            font-size: .34rem;
                            margin-bottom: 0.05rem;
                        }
                    }

                    &.van-tab--active {
                        padding: 0.05rem 0;
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
