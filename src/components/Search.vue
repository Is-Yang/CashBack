<template>
    <div class="search-wrapper">
        <div class="search-head">
            <van-nav-bar>
                <form action="/" slot="title">
                    <van-search slot="title" autofocus placeholder="请输入关键词" show-action v-model.trim="filter.keyword"
                        @cancel="onCancel" @input="onKeywords"></van-search>
                </form>
            </van-nav-bar>
        </div>

        <div v-if="!isResult">
            <div class="hot">
                <h3>
                    <van-icon name="fire" />
                    热门搜索
                </h3>
                <van-row class="list-label">
                    <van-col v-for="item in hotList" :key="item.id" @click.native="onRusult(item.keyword)">{{item.keyword}}</van-col>
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

        <div v-if="isResult" class="search-result">
            <van-row type="flex" justify="space-between" v-for="item in resultList" :key="item[1]" @click.native="onRusult(item[0])">
                <van-col>
                    {{item[0]}}
                </van-col>
                <van-col><span class="icon-go"></span></van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isResult: false, // 搜索结果
                hotList: [], // 热词数据
                resultList: [], // 搜索结果
                historyList: [], // 搜索历史
                user_id: 18,
                filter: {
                    keyword: '' // 关键词
                }
            }
        },
        created() {
            this.getHot();
        },
        methods: {
            getHot() { // 搜索热词
                // 请求数据
                $.ajax(this.$host.http_api + '/mall_hot_keyword/query_all', {
                    dataType: 'jsonp',
                    crossDomain: true,
                    success: ((res) => {
                        if (res && res.data) {
                            if (res.data.list) {
                                this.hotList = res.data.list;
                            }
                        }

                    })
                })
            },
            onCancel() {
                this.$eventHub.$emit('cancel', true);
            },
            onKeywords() { //  搜索关键词
                if (this.filter.keyword == '') {
                    this.resultList = [];
                    this.isResult = false;
                    return;
                } else {
                    this.isResult = true;
                    // 请求数据
                    $.ajax(this.$host.search_api + '/sug', {
                        data: {
                            q: this.filter.keyword,
                            code: 'utf-8'
                        },
                        dataType: 'jsonp',
                        crossDomain: true,
                        success: ((res) => {
                            if (res.result) {
                                this.resultList = res.result;
                            }
                        })
                    })
                }
            },
            onRusult(keyword) {  // 条状到列表页
                this.$router.push({
                    path: 'list',
                    query: {
                        user_id: this.user_id,
                        keyword: keyword
                    }
                })
            }
        },
    }
</script>

<style lang="less" scoped>
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
</style>