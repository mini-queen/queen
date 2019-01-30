<template>
  <div class="checkout-container">
    <infobar classTag="infobar-addr" barTip="收货信息" :barDesp="isAddAddress ? '更改收货人信息' : '添加收货人信息'" @clickHandle="clickHandle('addr')"/>
    <div class="address-info" v-if="isAddAddress">
      <p class="addr-top">
        <span class="checkout-name">{{address.name}}</span>
        <span>{{address.tel}}</span>
        </p>
      <p class="checkout-addr">
        {{address.addr}}
      </p>
    </div>
    <infobar classTag="infobar-goods" :isHideBarRight="true" barTip="商品信息"/>
    <div class="goods">
      <!-- 多个商品 -->
      <div class="good-list" v-if="checkoutObj.goodList.length>1">
        <div class="good-item" v-for="(good, index) in checkoutObj.goodList" :key="index" @click="goToDetail">
          <img class="good-img" :src="good.url" alt="">
          <span class="good-num">{{good.goodNum}}</span>
        </div>
      </div>
      <!-- 只有一个商品 -->
      <div class="cart-good" v-if="checkoutObj.goodList.length==1">
        <img :src="checkoutObj.goodList[0].url" alt="" class="good-img" @click="goToDetail">
        <div class="good-content">
          <p class="good-desc">{{checkoutObj.goodList[0].goodDesc}}</p>
          <div class="good-bottom">
            <div class="price-block">
              <span class="pirce">￥{{checkoutObj.goodList[0].price}}</span>
              <span class="good-num">x{{checkoutObj.goodList[0].goodNum}}</span>
            </div>
          </div>
        </div>
    </div>
      <div class="good-total_num" @click="goToList">
        <span class="num-text" v-if="checkoutObj.goodList.length>1">共{{checkoutObj.goodList.length}}件商品</span>
        <span class="icon-arrow_right"></span>
      </div>
    </div>
    <infobar classTag="infobar-pay" barTip="在线支付" :isShowArrow="false"/>
    <infobar classTag="infobar-send_type" barTip="配送方式" :barDesp="sendType"  @clickHandle="clickHandle('send_type')"/>
    <infobar classTag="infobar-send_time" barTip="配送时间" :barDesp="timeObj ? (timeObj.day+timeObj.time.noon) : '选择配送时间'" :isHideRod="true"  @clickHandle="clickHandle('send_time')" :isShow="sendType=='配送'"/>
    <infobar classTag="infobar-voucher" barTip="优惠券" barDesp="选择优惠券"  @clickHandle="clickHandle('voucher')" v-if="false"/>
    <infobar classTag="infobar-note" barTip="订单备注" barDesp="填写备注" :isRightInput="true" @inputBar="inputBar"/>
    <infobar classTag="infobar-amount" barTip="商品金额" :isHideBarRight="true"/>
    <div class="amount-line">
      <span>商品总计</span>
      <span>￥{{checkoutObj.amount}}</span>
    </div>
    <div class="amount-line">
      <span>运费</span>
      <span>￥{{checkoutObj.sendAmount}}</span>
    </div>
    <div class="amount-line">
      <span>优惠</span>
      <span>￥{{checkoutObj.discount}}</span>
    </div>
    <div class="amount-line line-last">
      <span>应付金额</span>
      <span>￥{{checkoutObj.finalAmount}}</span>
    </div>
    <div class="checkout-bottom">
      <div class="bottom-inner">
        <div class="checkout-check">
          <span class="price-total" v-show="!isEdit">应付款：￥{{checkoutObj.finalAmount}}</span>
        </div>
        <div class="checkout-btns">
          <div class="btn-checkout" @click="checkout">确认下单</div>
        </div>
      </div>
    </div>
    <popover @closeModal="closeModal" :isShow="isShow" @checkedHandle="checkedHandle" popType="sendType" :isAnim="true" :isUnPass="true">
        <span slot="title">请选择配送方式</span>
    </popover>
    <popover @closeModal="closeModal" :isShow="isTimeShow" @timeHandle="timeHandle" popType="sendTime" :isUnPass="true" className="tiempop">
        <span slot="title">选择配送时间</span>
    </popover>
  </div>
</template>

<script>
import infobar from '@/components/infobar'
import popover from '@/components/popover'
export default {
  data () {
    return {
      address: {
        name: '李子涵',
        tel: '18210371644',
        addr: '广州市荔湾区芳村花海街1号'
      },
      noteMsg: '',
      timeObj: null,
      isShow: false,
      isTimeShow: false,
      isAddAddress: false,
      sendType: '配送',
      checkoutObj: {
        finalAmount: '240.00',
        amount: '240.00',
        sendAmount: '0.00',
        discount: '0.00',
        goodList: [
          {
            isChecked: false,
            url: 'http://publish.kuchuan.com/activity/header/item2.png',
            goodDesc: '科固全铜冷热水单孔接管',
            price: '199',
            discount: '118',
            goodNum: 1
          },
          {
            isChecked: false,
            url: 'http://publish.kuchuan.com/activity/header/item2.png',
            goodDesc: '科固全铜冷热水单孔接管',
            price: '299',
            discount: '118',
            goodNum: 1
          }
        ]
      }
    }
  },
  computed: {},
  components: {
    infobar, popover
  },
  methods: {
    goToDetail () {
      wx.navigateTo({
        url: '/pages/productDetail/main'
      })
    },
    clickHandle (type) {
      switch (type) {
        case 'addr':
          this.isAddAddress = !this.isAddAddress
          break
        case 'send_type':
          this.isShow = true
          break
        case 'send_time':
          this.isTimeShow = true
          break
        case 'voucher':break
        default:break
      }
    },
    closeModal () {
      this.isShow = false
      this.isTimeShow = false
    },
    goToList () {
      wx.navigateTo({
        url: '/pages/checkoutGoods/main'
      })
    },
    checkout () {
      if (!this.address || !this.sendType || (this.sendType === '配送' && !this.timeObj)) {
        return wx.showToast({
          title: '输入信息不完整，请检查'
        })
      }
      wx.navigateTo({
        url: '/pages/payment/main'
      })
    },
    checkedHandle (item) {
      this.sendType = item.name
      this.isShow = false
    },
    timeHandle (val) {
      console.log(val)
      this.timeObj = val
      this.isTimeShow = false
    },
    inputBar (val) {
      this.noteMsg = val
    }
  },
  watch: {

  },
  created () {}
}
</script>

<style lang="less">
.checkout-container {
  background: @bg;
  margin-bottom: 100rpx;
  padding-bottom: 30rpx;
  color: @primary;
  .tiempop {
    top: calc(50% - 350rpx) !important;
  }
  .goods {
    height: 250rpx;
    padding: 0 30rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: @color-white;
    .cart-good {
      display: flex;
      align-items: center;
      background: @color-white;
      .good-img {
        margin-right: 30rpx;
        width: 180rpx;
        height: 180rpx;
        border: solid 1rpx @line;
      }
      .good-content {
        height: 180rpx;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .good-desc {
          font-size: @fs30;
        }
        .good-bottom {
          display: flex;
          justify-content: space-between;
          .price-block {
            .pirce {
              font-size: @fs44;
              color: @border_yellow;
            }
            .good-num {
              margin-left: 20rpx;
              color: @sub;
              font-size: @fs26;
            }
          }
        }
      }
    }
    .good-list {
      .good-item {
        float: left;
        border: solid 1rpx @line;
        height: 180rpx;
        position: relative;
        margin-right: 30rpx;
        .good-img {
          width: 180rpx;
          height: 180rpx;
        }
        .good-num {
          position: absolute;
          width: 30rpx;
          height: 30rpx;
          top: -12rpx;
          right: -12rpx;
          background: @warning;
          color: @color-white;
          border-radius: 50%;
          text-align: center;
          line-height: 30rpx;
          font-size: @fs20;
        }
      }
    }
    .good-total_num {
      .num-text {
        font-size: @fs30;
        margin-right: 30rpx;
      }
      .icon-arrow_right {
        vertical-align: middle;
      }
    }
  }
  .address-info {
    height: 160rpx;
    padding: 0 30rpx;
    border-top: 1rpx solid @line;
    display: flex;
	  flex-direction: column;
    justify-content: center;
    font-size: @fs30;
	  background: @color-white;
    .addr-top {
      .checkout-name {
        margin-right: 60rpx;
      }
    }
    .checkout-addr {
      margin-top: 20rpx;
    }
  }
  .infobar-addr {
    border-top: 20rpx solid @bg;
  }
  .infobar-goods {
    margin-top: 20rpx;
    border-bottom: 1rpx solid @line;
  }
  .infobar-pay {
    margin: 20rpx 0;
    .checkbox-wrapper {
      margin-right: 0;
    }
  }
  .infobar-send_type {
    border-bottom: 1rpx solid @line;
  }
  .infobar-send_time {
  
  }
  .infobar-voucher {
    margin-bottom: 20rpx;
  }
  .infobar-note {
    margin-top: 20rpx;
    margin-bottom: 20rpx;
    .bar-input {
      font-size: @fs30;
      margin-right: 10rpx;
    }
  }
  .infobar-amount {
    border-bottom: 1rpx solid @line;
  }
  .amount-line {
    font-size: @fs30;
    height: 110rpx;
    padding: 0 30rpx;
    background: @color-white;
    border-bottom: 1rpx solid @line;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &.line-last {
      border: 0;
    }
  }
  .checkout-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 100rpx;
    line-height: 100rpx;
    width: 100%;
    background: @color-white;
	border-top: solid 1rpx @line;
    .bottom-inner {
      display: flex;
      justify-content: space-between;
      margin: 0 30rpx;
      .checkout-check {
        .price-total {
          font-size: @fs34;
        }
      }
      .checkout-btns {
        font-size: @fs30;
        .btn-checkout {
          display: inline-block;
          width: 260rpx;
          height: 100rpx;
          margin-right:-30rpx;
          background-color: @border_yellow;
          text-align: center;
          line-height: 100rpx;
          color: @color-white;
        }
      }
    }
  }
}
</style>
