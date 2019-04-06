<template>
    <van-tabbar v-model="current" active-color="#ff611b">
        <van-tabbar-item icon="wap-home" :to="{ path: '/index'}">首页</van-tabbar-item>
        <van-tabbar-item icon="underway-o" :to="{ path: '/sale'}">限时抢</van-tabbar-item>
        <van-tabbar-item icon="search" :to="{ path: '/list', query: { user_id: user_id }}">搜索</van-tabbar-item>
        <van-tabbar-item icon="contact" url="https://user_center.dxanm.com">我的</van-tabbar-item>
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
                this.user_id = this.$route.query.user_id;
            }
        }
    }
}
</script>

