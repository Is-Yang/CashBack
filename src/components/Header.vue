<template>
    <div id="header">
        <van-nav-bar 
            left-arrow :title="title" 
            @click-left="onClickLeft"
            @click-right="onHome"
            :class="posFixed ? 'fixed-nav-bar' : ''">
            <van-icon name="wap-home" slot="right" />
        </van-nav-bar>
    </div>
</template>

<script>
export default {
    /*
        title: 标题
        posFixed: 是否定位，(true, false)
    */
    props: ['title', 'posFixed'],
    methods: {
        onClickLeft() {
            this.$router.back()
        },
        onHome() {
            this.$router.push("/index")
        }
    }
}
</script>

<style lang="less" scoped>
#header {
    /deep/ .fixed-nav-bar {
        position: fixed;
        left: 0;
        right: 0;
        z-index: 99 !important;
    }

    /deep/ .van-nav-bar__title {
        max-width: 70%;
        height: 100%;
    }

    /deep/  .van-nav-bar__left, .van-nav-bar__right {
        width: 15%;
        bottom: 50%;
        font-size: 14px;
        position: absolute;
        transform: translateY(50%);
    }

    /deep/  .van-nav-bar__left {
        left: 0;
    }

    /deep/ .van-nav-bar__right {
        right: 0;
    }
    
    /deep/ .van-icon {
        color: #333;
        font-size: .48rem;
    }
}
   
</style>



