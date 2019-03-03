<template>
    <div id="header">
        <van-nav-bar 
            left-arrow :title="title" 
            @click-left="onClickLeft">
            <van-icon name="wap-home" slot="right" />
        </van-nav-bar>
    </div>
</template>

<script>
export default {
    props: ['title'],
    methods: {
        onClickLeft() {
            this.$router.back()
        },
    }
}
</script>

<style lang="less" scoped>
#header {
    /deep/ .van-nav-bar {
        position: fixed;
        left: 0;
        right: 0;
        z-index: 1;

        .van-nav-bar__title {
            max-width: 70%;
            height: 100%;
        }

        .van-nav-bar__left, .van-nav-bar__right {
            width: 15%;
            bottom: 50%;
            font-size: 14px;
            position: absolute;
            transform: translateY(50%);
        }

        .van-nav-bar__left {
            left: 0;
        }

        .van-nav-bar__right {
            right: 0;
        }

        .van-icon {
            color: #333;
            font-size: .48rem;
        }
    }
}
   
</style>



