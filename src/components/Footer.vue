<template>
    <van-tabbar v-model="current" active-color="#ff611b">
        <van-tabbar-item icon="wap-home" :to="{ path: '/index', query: { user_id: user_id }}">首页</van-tabbar-item>
        <van-tabbar-item icon="underway-o" :to="{ path: '/sale'}">限时抢</van-tabbar-item>
        <van-tabbar-item icon="search" :to="{ path: '/list'}">搜索</van-tabbar-item>
        <van-tabbar-item icon="contact" url="https://usercenter.api.dxanm.com/wechat/auth?url=https%3a%2f%2fusercenter.dxanm.com%2f">我的</van-tabbar-item>
    </van-tabbar>
</template>

<script>
export default {
    data() {
        return {
            current: 0,
            user_id: '',
        }
    },
    watch:{
        "$route" (to,from){
           this.init();
        }
    },
    created () {
       this.init();
    },
    methods: {
        init() {
            if (this.$route) {
                this.current = this.$route.path == '/index' ? 0 : this.$route.path == '/sale' ? 1 : 
                               (this.$route.path == '/list' || this.$route.path == '/category') ? 2 : 3
                this.user_id = this.$route.query.user_id ? this.$route.query.user_id : 
                               localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).userId
            }
        }
    }
}
</script>

