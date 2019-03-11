<template>
    <div id="flash-sale">
        <Header title="限时抢购" :posFixed="true"></Header>

        <div class="tabs-content">
            <van-tabs v-model="active" @click="getSale" sticky :offset-top="46">
                <van-tab v-for="(item, index) in timeNodes" :key="index">
                    <div slot="title">
                        <span class="time">{{item.time}}</span>
                        <span>{{item.label}}</span>
                    </div>
                    
                    <van-list class="list-wrap" 
                        v-model="dataLoading" 
                        :finished="finished" 
                        :finished-text="finishedText"
                        @load="onLoad">
                        <van-cell v-for="(item, index) in list" :key="index">
                            <van-row type="flex" @click.native="link(item.num_iid)">
                                <van-col class="product-img">
                                    <img :src="item.pict_url" v-lazy="item.pict_url" />
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
                                                <span class="price" v-if="item.zk_final_price">{{'￥' + (item.zk_final_price - (item.coupon_amount ? item.coupon_amount : 0))}}</span>
                                                <span>{{item.user_type == 1 ? '天猫价' : '淘宝价'}}：{{'￥' + item.zk_final_price}}</span>
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
                                                <div class="item-coupon" v-if="item.coupon_amount && item.coupon_amount != 0">
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

        <Footer></Footer>
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
            finishedText: '暂无数据',
            flag: false,
            timeNodes: [
                {
                    time: '12:00',
                    label: '已开抢',
                    flag: 1
                }, {
                    time: '14:00',
                    label: '已开抢',
                    flag: 1
                }, {
                    time: '16:00',
                    label: '已开抢',
                    flag: 1
                }, {
                    time: '18:00',
                    label: '已开抢',
                    flag: 1
                }, {
                    time: '20:00',
                    label: '已开抢',
                    flag: 1
                }, {
                    time: '22:00',
                    label: '已开抢',
                    flag: 1
                }, {
                    time: '00:00',
                    label: '',
                    flag: 2
                }, {
                    time: '08:00',
                    label: '',
                    flag: 2
                }, {
                    time: '10:00',
                    label: '',
                    flag: 2
                }, {
                    time: '12:00',
                    label: '',
                    flag: 2
                }, {
                    time: '14:00',
                    label: '',
                    flag: 2
                }, {
                    time: '16:00',
                    label: '',
                    flag: 2
                }, {
                    time: '18:00',
                    label: '',
                    flag: 2
                }, {
                    time: '20:00',
                    label: '',
                    flag: 2
                }, {
                    time: '22:00',
                    label: '',
                    flag: 2
                }, {
                    time: '00:00',
                    label: '即将开抢',
                    flag: 3
                }, {
                    time: '08:00',
                    label: '即将开抢',
                    flag: 3
                }, {
                    time: '10:00',
                    label: '即将开抢',
                    flag: 3
                }, {
                    time: '12:00',
                    label: '即将开抢',
                    flag: 3
                }
            ],
            list: [],
            filter: {
                page_num: 1,
                start_time: new Date(),
                end_time: new Date()
            },
            currentDate: new Date()
        }
    },
    mounted () {
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
                    // 数组里的时间小于当前时间时 比如 12:00 < 13:00 已开抢的
                    if (item.time < moment(currentDate).format('HH:00')) {
                        this.timeNodes[index].label = '已开抢';
                        /*
                            如果为13:00，由于设置的值是2小时累加，找不到13:00，则当前时间也是定位在12:00 
                        */
                        if (item.time == moment(currentDate.getTime() - 1*60*60*1000).format('HH:00')) {
                            this.timeNodes[index].label = '抢购中';
                            this.active = index;
                            setTimeout(() => {
                                this.toSrollLeft(index);
                            }, 100);
                        }
                    } else if (item.time > moment(currentDate).format('HH:00')) {   // 还没到时间点的，则即将开抢
                        this.timeNodes[index].label = '即将开抢';
                    } else if (item.time == moment(currentDate).format('HH:00')) {  // 如果值与当前时间相等则是抢购中
                        this.timeNodes[index].label = '抢购中';
                        this.active = index;
                         setTimeout(() => {
                            this.toSrollLeft(index);
                        }, 100);
                    }

                    // 00 ~ 07时为抢购中
                    if (item.time == "00:00") {
                        const sevenTime = ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00"];
                        sevenTime.forEach(ele => {
                            if (ele == moment(currentDate).format('HH:00')) {
                                this.timeNodes[index].label = '抢购中';
                                this.active = index;
                                setTimeout(() => {
                                    this.toSrollLeft(index);
                                }, 100);
                            }
                        });
                    }
                }
            });
        },
        // 设置tab导航栏加载上来选中时展示在中间
        toSrollLeft(index) {
            let tabNav = document.getElementsByClassName("van-tabs__nav")[0];
            let tabItemW = document.getElementsByClassName("van-tab")[0];
            // 如果索引大于3，则-2定位在中间
            tabNav.scrollLeft = tabItemW.clientWidth * (index - (index > 3 ? 2 : 0));
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
            this.flag = true;
            this.$eventHub.$emit('loading', true);
            let start =  this.timeNodes[index];
            let end = this.timeNodes[index + 1] ? this.timeNodes[index + 1] : this.timeNodes[index];

            let day = "";

            if (end.flag == 1) {  // 前一天
                day =  moment(this.currentDate.getTime() - 24*60*60*1000).format('YYYY-MM-DD');
            } else if (end.flag == 2) {  // 今天
                day = moment(this.currentDate).format('YYYY-MM-DD');
            } else if (end.flag == 3) {  // 明天
                day =  moment(this.currentDate.getTime() + 24*60*60*1000).format('YYYY-MM-DD');
            }

            this.filter.start_time = moment(day.toString() + " " + start.time.toString()).format('YYYY-MM-DD HH:00');

             // 最后一个时间点 12点~14点
            if(index + 1 == this.timeNodes.length) {
                this.filter.end_time = moment(day.toString() + " " + "14:00".toString()).format('YYYY-MM-DD HH:00');
            } else {
                this.filter.end_time = moment(day.toString() + " " + end.time.toString()).format('YYYY-MM-DD HH:00');
            }
            this.onLoad(this.filter);
        },
        onLoad() {
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

            let startTime = moment(this.filter.start_time).format("YYYY-MM-DD HH:00");
            let endTime = moment(this.filter.end_time).format("YYYY-MM-DD HH:00");

            $.ajax(this.$host.http_api + '/mall_tqg/query_list', {
               data: {
                   page_num: this.flag ? 1 : this.filter.page_num,
                   page_size: 10,
                   start_time: startTime,
                   end_time: endTime
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
                            if (this.list.length > 0) {
                                this.finishedText = "已到达最底";
                            }
                        } else {
                            this.finished = false;
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
        padding-bottom: 50px;
        .tabs-content {
            padding-top: 46px;

            /deep/ .van-tabs--line {
                padding-top: 1rem;
            }

            /deep/ .van-tabs__wrap {
                padding: 0 .1rem;
                background-image: -webkit-linear-gradient(0deg, #ff7422, #ff4760); 
                height: 1rem;

                .van-tabs__nav {
                   align-items: center;
                   background-color: initial;
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
            /deep/ .van-cell {
                margin-bottom: .2rem;
                padding: 10px;
                cursor: pointer;
                
                &:first-child {
                    margin-top: 0;
                }
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
            background-color: #fb3940;
            color: #fff;
            border-radius: 25px;
            font-size: .24rem;
        }

        .sale-progress .progress-tip {
            position: absolute;
            left: 0;
            background-color: #ff7224;
            height: 100%;
            border-radius: 25px;
            z-index: -1;

        }
    }
</style>
