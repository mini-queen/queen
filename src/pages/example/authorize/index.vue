<template>
  <div class="authorize-warp">
    <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">获取用户信息</button>
  </div>
</template>

<script>

import { USERINFO_GET } from '@/store/types'
export default {
  created () {

  },
  methods: {
    onGotUserInfo: function (e) {
      console.log(e.target.userInfo)
      this.$store.commit(USERINFO_GET, e.target.userInfo)
      wx.navigateBack({
        delta: 1
      })
    }
  }
}
</script>

<style lang="less">
.authorize-warp {
  text-align: center;
  padding-top: 100rpx;
}

</style>
