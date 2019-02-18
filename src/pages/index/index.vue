<template>
  <div class="container">
    <!-- <a href="/pages/permission/main" class="item-explain">去往授权页</a> -->
    <div class="title h1">英国女王大学</div>
    <div class="sub-title h2">2019年语言课</div>
    <div class="article1">
      根据学生自身语音水平和学位课程要求，语音课课程长度分别为10周6周和4周。
    </div>
    <div class="article2">
      点击开始查询适合您的语言课课程长度：
    </div>
    <div class="start-btn" @click="startHandler">
        开始
    </div>
    <!-- <img class="logo-top" src="/static/images/queen-white.png" mode="widthFix">
    <img class="logo-bottom" src="/static/images/queen-red.png" mode="widthFix"> -->
  </div>
</template>
<script>
  export default {
    data () {
      return {

      }
    },
    computed: {

    },
    components: {

    },
    mounted () {
  
    },
    onShow () {

    },
    methods: {
      startHandler: function () {
        let token = wx.getStorageSync('token')
        if (!token) {
          wx.reLaunch({
            url: '/pages/permission/main'
          })
        } else {
          wx.navigateTo({
            url: '/pages/infoInput/main'
          })
        }
      }
    }
  }
</script>

<style lang="less" scope>
.container {
  .title {
    padding: 30rpx 0;
    margin-top: 60rpx;
  }
  .sub-title {
    padding-bottom: 80rpx;
  }
  .article1 {
    .font-base();
    text-align: left;
    // text-indent: 2em;
    padding: 20rpx;
    line-height: 60rpx;
  }
  .article2 {
    .font-base();
    margin-bottom: 80rpx;
    text-align: left;
    // text-indent: 2em;
    padding: 20rpx;
  }
  .start-btn {
      display: inline-block;
      width: 61.8%;
      // padding: 0 60rpx;
      height: 90rpx;
      line-height: 90rpx;
      border-radius: 45rpx;
      text-align: center;
      color: @color-white;
      font-size: @fsh2;
      background-color: @light-primary;
  }
  .logo-bottom {
    width: 300rpx;
    position: fixed;
    left: 20rpx;
    bottom: 20rpx;
  }
  .logo-top {
    width: 300rpx;
    position: fixed;
    left: 20rpx;
    top: 20rpx;
  }
}
</style>
