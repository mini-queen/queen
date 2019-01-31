<template>
  <div class="container">
    授权信息或logo
    <div class="sure-btn" @click="sureHandler">
        确定授权
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
  
    },
    onShow () {
  
    },
    methods: {
      sureHandler: function () {
        console.log('授权')
      }
    }
  }
</script>

<style lang="less" scope>
.container {
  .sure-btn {
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
