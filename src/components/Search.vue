<template>
    <div class="search-wrapper">
        <div class="search-head">
            <van-nav-bar>
                <form action="/" slot="title">
                    <van-search slot="title" autofocus placeholder="请输入关键词" show-action v-model.trim="filter.keyword"
                        @cancel="onCancel" @input="onKeywords" @search="onRusult(filter.keyword)"></van-search>
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
                    <van-col v-for="item in hotList" :key="item.id" 
                        @click.native="onRusult(item.keyword)"
                        :style="{color: item.color}">{{item.keyword}}</van-col>
                </van-row>
            </div>
            <div class="history" v-if="historyList && historyList.length > 0">
                <h3>
                    <van-row type="flex" justify="space-between">
                        <van-col>
                            <van-icon name="clock-o" />
                            搜索历史
                        </van-col>
                        <van-col @click.native="reset">清空</van-col>
                    </van-row>
                </h3>

                <div class="list-item">
                    <van-row type="flex" justify="space-between" 
                        v-for="(item, index) in historyList" :key="index">
                        <van-col class="title" @click.native="onRusult(item.title)">
                            {{item.title}}
                        </van-col>
                        <van-col class="remove" @click.native="removeData(index)">
                            <van-icon name="cross" />
                        </van-col>
                    </van-row>
                </div>
            </div>
        </div>

        <div v-if="isResult" class="search-result">
            <van-row type="flex" justify="space-between" v-for="(item, index) in resultList" :key="index" @click.native="onRusult(item[0])">
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
                filter: {
                    keyword: '' // 关键词
                }
            }
        },
        mounted() {
            this.getHistory();
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
            getHistory() {   // 获取历史数据
                let history = JSON.parse(localStorage.getItem("history"));
                if (history){  
                    // 数组去重
                    let result = [];
                    const hash = {};
                    history.forEach((item, index) => {
                        const ele = history[index].title;
                        if (!hash[ele]) {
                            result.push(history[index]);
                            hash[ele] = true;
                        }
                    });
                    
                    this.historyList = result;
                }
            },
            removeData(key) {
                this.historyList.splice(key, 1);
                localStorage.setItem("history", JSON.stringify(this.historyList));
            },
            reset() {
                this.historyList = [];
                localStorage.setItem("history", JSON.stringify(this.historyList));
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
            onRusult(keyword) {  // 跳转到列表页
                if (keyword != '') {
                     this.historyList.unshift({
                        title: keyword
                    });
                    localStorage.setItem("history", JSON.stringify(this.historyList));
                }
                this.$router.push({
                    path: 'list',
                    query: {
                        keyword: keyword
                    }
                })
                this.$eventHub.$emit('search-ok', true);
            }
        },
    }
</script>

<style lang="less" scoped>
    .search-wrapper {
        background-color: #f5f5f9;
        overflow-x: hidden;

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

                    &:last-child {
                        ::after {
                            border: none;
                        }
                    }

                    .title, .remove {
                        padding: .23rem .15rem;
                    }

                    .title {
                        flex : 1;
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