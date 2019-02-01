<template>
  <div class="container">
    <div class="logo-wrapper">
      <img class="logo" src="/static/images/queen-red.png" mode="aspectFit">
    </div>
    <button class="sure-btn" open-type="getUserInfo"  @getuserinfo="getInfo">
        微信快捷登录
    </button>
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
      getInfo (e) {
        if (e.target.userInfo) {
          console.log('用户信息', e.target.userInfo)
          wx.login({
            success: (login) => {
            // 调用接口获取登录凭证（code）。通过凭证进而换取用户登录态信息，包括用户的唯一标识（openid）
            // https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html
              console.log('登录码', login.code)
              // 模拟存储后端token
              wx.setStorageSync('token', login.code)
              // 授权成功后，并跳转进入小程序首页
              wx.reLaunch({
                url: '/pages/index/main'
              })
            },
            fail: (error) => {
              console.log('errlogin=>', error)
            }
          })
        } else {
          // 用户按了拒绝按钮
          wx.showModal({
            title: '警告',
            content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!',
            showCancel: false,
            confirmText: '返回授权',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击了“返回授权”')
              }
            }
          })
        }
      }
    }
  }
</script>

<style lang="less" scope>
.container {
  .logo-wrapper {
    width: 100%;
    text-align: center;
    .logo {
      margin-top: 116rpx;
      width: 400rpx;
    }
  }
  
  .sure-btn {
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
}
</style>
