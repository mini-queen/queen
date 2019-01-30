<template id="create_address">
  <div class="create_address_container">
    <div class="fields">
      <div class="field">
        <span class="title">收货人：</span>
        <input
          type="text"
          class="content"
          placeholder="请填写收货人姓名"
          placeholder-style="color: #999999; font-size: 30rpx">
        </input>
      </div>
      <div class="field">
        <span class="title">手机号：</span>
        <input
          type="text"
          class="content"
          placeholder="请填写手机号码"
          placeholder-style="color: #999999; font-size: 30rpx">
        </input>
      </div>
      <div class="field location">
        <span class="title">所在城市</span>
        <div
          class="content"
          :style="{
            textAlign: region ? 'left' : 'right',
            color: region ? '#333333' : '#999999'
          }">
          <picker class="picker" mode="region" @change="bindRegionChange">
            <span v-if="region">{{ region }}</span>
            <span v-else>请选择</span>
          </picker>
          <i class="icon-arrow icon-arrow_right"></i>
        </div>
      </div>
      <div class="field">
        <span class="title">所在区域：</span>
        <input
          type="text"
          class="content"
          placeholder="社区、街道、学校"
          placeholder-style="color: #999999; font-size: 30rpx">
        </input>
      </div>
      <div class="field">
        <span class="title">详细地址：</span>
        <input
          type="text"
          class="content"
          placeholder="请填写详细地址"
          placeholder-style="color: #999999; font-size: 30rpx">
        </input>
      </div>
    </div>
    <button type="button" name="button" class="submit-btn">保存</button>
  </div>
</template>

<script type="text/javascript">
  export default {
    data () {
      return {
        region: ''
      }
    },
    methods: {
      bindRegionChange: function (e) {
        console.log(e)
        this.region = e.target.value.join(' ')
      }
    }
  }
</script>
<style scoped>
  .create_address_container {
    width: 750rpx;
    height: 100vh;
    padding-top: 20rpx;
    background-color: #f3f3f3;
  }

  .field {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 30rpx;
    background-color: #FFFFFF;
    border-bottom: 1rpx solid #eeeeee;
  }

  .field.location {
    justify-content: space-between;
  }

  .field.location .content {
    width: calc(100% - 176rpx);
    display: flex;
    align-items: center;
    justify-content:flex-end;
    text-align:right;
  }

  .field.location .picker {
    width: 100%;
  }

  .field .title {
    width: 176rpx;
    height: auto;
    font-size: 30rpx;
    color: #333333;
  }

  .field .content {
    flex: 1;
    font-size: 30rpx;
  }

  .icon-arrow {
    margin-left: 50rpx;
  }

  .submit-btn {
    width: 550rpx;
    height: 88rpx;
    line-height: 88rpx;
    color: #FFFFFF;
    font-size: 30rpx;
    background-color: #F3A300;
    box-shadow: 1rpx 2rpx 10rpx #F3A300;
    border-radius: 44rpx;
    margin-top: 140rpx;
  }
</style>
