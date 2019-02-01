<template>
  <div class="container">
    <!-- <a href="/pages/permission/main" class="item-explain">去往授权页</a> -->
    <div class="title h1">英国女王大学</div>
    <div class="sub-title h2">2019年语言课</div>
    <div class="article1">
      根据学生自身语音水平和学位课程要求，语音课课程长度分别为10周6周和4周。
    </div>
    <div class="article2">
      点击开始查询你的语言课课程长度：
    </div>
    <div class="start-btn" @click="startHandler">
        开始
    </div>
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
      let token = wx.getStorageSync('token')
      if (!token) {
        wx.reLaunch({
          url: '/pages/permission/main'
        })
      }
    },
    onShow () {
  
    },
    methods: {
      startHandler: function () {
        wx.navigateTo({
          url: '/pages/infoInput/main'
        })
      }
    }
  }
</script>

<style lang="less" scope>
.container {
  .title {
    padding: 30rpx 0;
  }
  .sub-title {
    padding-bottom: 80rpx;
  }
  .article1 {
    font-size: 36rpx;
    text-align: left;
    text-indent: 2em;
    padding: 20rpx;
  }
  .article2 {
    font-size: 36rpx;
    margin-top: 30rpx;
    margin-bottom: 80rpx;
  }
  .start-btn {
      display: inline-block;
      width: 260rpx;
      height: 80rpx;
      line-height: 80rpx;
      border-radius: 40rpx;
      text-align: center;
      color: @color-white;
      background-color: @light-primary;
      box-shadow: 0 10rpx 30rpx rgba(243,163,0,0.3);
    }
}
</style>
