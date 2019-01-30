<template>
  <div class="my-wrap">
    <p class="my_info">
      <span class='my_info_avatar' ><img class="my_info_avatar_img" :src="wxUserInfo.avatarUrl" alt=""></span>
      <span class="my_info_nickname">{{wxUserInfo.nickName||'用户昵称'}}</span>
    </p>

    <div class="my_order">
      <ul class="my_order_list">
        <li>
          <a class="my_order_item" href="/pages/order/main?indicator=1">
            <span class="my_order_item_icon"><i class="icon-will_delivery icon"></i> </span>
            <span>待支付</span>
          </a>
        </li>
        <li>
          <a class="my_order_item" href="/pages/order/main?indicator=2">
            <span class="my_order_item_icon my_order_item_icon_second"><i class="icon-will_delivery icon"></i></span>
            <span>待收货</span>
            <i class="my_order_num">6</i>
          </a>
        </li>
        <li><a class="my_order_item" href="/pages/order/main?indicator=3"><span class="my_order_item_icon my_order_item_icon_three"><i class="icon-will_comment icon"></i></span><span>待评价</span></a></li>
        <li><a class="my_order_item" href="/pages/order/main?indicator=4"><span class="my_order_item_icon my_order_item_icon_four"><i class="icon-exchange icon"></i></span><span>退换</span></a></li>
      </ul>
      <a class='my_order_all' href="/pages/order/main">查看全部订单>></a>
    </div>

    <!-- <div class="my_wealth">
      <a class="my_wealth_getFinance" href=""><i class='icon-fund svg_icon fl'></i>我的资产<i class='arrow_right'></i></a>
      <ul class="my_wealth_list">
        <li><a class="my_wealth_item"  href="/pages/search/main"><span class='my_wealth_item_val'>￥0.00</span><span>余额</span></a></li>
        <li><a class="my_wealth_item"  href="/pages/search/main"><span class='my_wealth_item_val'>80000</span><span>白条额度</span></a></li>
        <li><a class="my_wealth_item" href="/pages/search/main"><span class='my_wealth_item_val'>4</span><span>优惠券</span></a></li>
      </ul>
    </div> -->

    <ul class="my_other">
      <li class="my_other_item"><i class='icon-address svg_icon fl'></i><a class='icon_link' href="/pages/address/main">收货地址管理<i class='arrow_right'></i></a></li>
      <li class="my_other_item"><i class='icon-collect svg_icon fl'></i><a class='icon_link' href="/pages/search/main">我的收藏<i class='arrow_right'></i></a></li>
      <li class="my_other_item"><i class='icon-about svg_icon fl'></i><a class='icon_link' href="/pages/search/main">关于牛小野<i class='arrow_right'></i></a></li>
    </ul>

    <auth-component @closeAuth='closeAuthHandler' :show-auth='showAuth'></auth-component>

    <div v-if="!haveLogin" class="mask_bg" @click="showAuthHandler"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import authComponent from '@/components/auth'
export default {
  data () {
    return {
      showAuth: false,
      haveLogin: true
    }
  },
  computed: {
    ...mapGetters({
      wxUserInfo: 'getUserInfo'
    })
  },
  components: {
    authComponent
  },
  methods: {
    closeAuthHandler (val) {
      console.log(val)
      if (val === 3) {
        this.haveLogin = true
      }
      this.showAuth = false
    },
    showAuthHandler () {
      this.showAuth = true
    }
  },
  created () {

  },
  onShow () {
    console.log(this.$isLogin())
    if (this.$isLogin()) {
      this.haveLogin = true
    } else {
      this.haveLogin = false
      this.showAuth = true
    }
  }
}
</script>

<style lang="less" scoped>
.my-wrap{
  background: @bg;
  min-height: 100vh;
  overflow: hidden;
  font-size: 30rpx;
  line-height: 1;
  .mask_bg{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

  }
  .arrow_right{
    float: right;
    width: 18px;
    height: 18px;
    background: url('../../../static/images/arrow_right.png') no-repeat 0 0;
    background-size: cover;
  }
  .my_info{
    background: @color_main_100;
    padding: 40rpx 40rpx 110rpx 40rpx;
    text-align: center;
    margin-bottom: 205rpx;
    .my_info_avatar{
      width: 180rpx;
      height: 180rpx;
      border: solid 8rpx rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      outline: none;
      overflow: hidden;
      display: block;
      margin: 0 auto;
      .my_info_avatar_img{
        width: 180rpx;
        height: 180rpx;
        background: #fff;
      }
    }
    .my_info_nickname{
      display: block;
      font-size: 36rpx;
      color: @color-white;
      line-height: 2;
    }
  }
  .my_order{
    padding:40rpx 20rpx;
    width: 680rpx;
    position: absolute;
    top: 320rpx;
    left: 35rpx;
    background: rgba(255,255,255,0.9);
    box-sizing: border-box;
    border-radius: 10rpx;
    .my_order_all{
      font-size: 24rpx;
      line-height: 1;
      color: @color_main_100;
      text-align: center;
      padding-top: 30rpx;
    }
    .my_order_list{
      display: flex;
      flex-flow: nowrap row;
      justify-content: space-around;
      font-size: 26rpx;
      .my_order_item{
        display: flex;
        flex-flow: nowrap column;
        align-items: center;
        color: @content;
        position: relative;
        .my_order_item_icon{
          margin-bottom: 15px;
          box-shadow: 0rpx 20rpx 30rpx rgba(255, 178, 1, 0.3);
          border-radius: 40rpx;
          width: 88rpx;
          height: 88rpx;
          background-image: linear-gradient(-30deg, rgba(251, 146, 1, 0.75) 0%, rgba(255, 178, 1, 0.75) 100%), linear-gradient(#ffffff, #ffffff);
          background-blend-mode: normal, normal;
          color: @color-white;
          display: flex;
          flex-flow: nowrap column;
          align-items: center;
          justify-content: center;
          .icon{
            font-size: 35rpx;
          }
        }
        .my_order_item_icon_second{
          background-image: linear-gradient(-30deg,	rgba(22, 143, 208, 0.67) 0%, rgba(0, 198, 255, 0.67) 100%), linear-gradient(#ffffff, #ffffff);
          background-blend-mode: normal, normal;
          box-shadow: 0rpx 20rpx 30rpx rgba(0, 198, 255, 0.3);
        }
        .my_order_item_icon_three{
          background-image: linear-gradient(-30deg, rgba(255, 88, 88, 0.68) 0%, rgba(248, 87, 166, 0.68) 100%), linear-gradient(#ffffff, #ffffff);
          background-blend-mode: normal, normal;
          box-shadow: 0rpx 20rpx 30rpx rgba(248, 87, 166, 0.3);
        }
        .my_order_item_icon_four{
          background-image: linear-gradient(-30deg, rgba(142, 84, 233, 0.7) 0%, rgba(97, 105, 231, 0.7) 100%), linear-gradient(#ffffff, #ffffff);
          background-blend-mode: normal, normal;
          box-shadow: 0rpx 20rpx 30rpx rgba(97, 105, 231, 0.3);
        }
        .my_order_num{
          position: absolute;
          top: -2rpx;
          right: -2rpx;
          width: 29rpx;
          height: 29rpx;
          border-radius: 50%;
          overflow: hidden;
          outline: none;
          background: @color-red;
          color: @color-white;
          font-size: 24rpx;
          line-height: 29rpx;
          text-align: center;
        }
      }
    }
  }
  .my_wealth{
    margin: 20rpx 0;
    background: @color-white;
    font-size: 24rpx;
    line-height: 1;
    .my_wealth_getFinance{
      border-bottom: 2rpx solid @border;
      padding: 40rpx 20rpx;
      .svg_icon{
        font-size: 32rpx;
        margin-right: 10rpx;
      }
    }
    .my_wealth_list{
      display: flex;
      flex-flow: nowrap row;
      justify-content: space-between;
      font-size: 26rpx;
      padding:40rpx 80rpx;
      .my_wealth_item{
        display: flex;
        flex-flow: nowrap column;
        align-items: center;
        color: @content;
        .my_wealth_item_val{
          font-size: 32rpx;
          color: @color_main_100;
          margin-bottom: 10rpx;
        }
      }
    }
  }
  .my_other{
    margin: 20rpx 0;
    .my_other_item{
      height: 110rpx;
      background: @color-white;
      display: flex;
      flex-flow: nowrap row;
      align-items: center;
      padding: 0 30rpx;
      .icon_link{
        height: 100%;
        flex-grow: 1;
        line-height: 110rpx;
        .arrow_right{
          margin-top: 35rpx;
        }
      }
      &+.my_other_item{
        border-top: 1px solid @border;
      }
      .svg_icon{
        font-size: 32rpx;
        margin-right: 10rpx;
      }
    }
  }
}
</style>
