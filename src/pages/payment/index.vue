<template>
  <div class="payment-container">
    <div class="payment-top">
      <div class="remain">
        <div class="remain-tip">支付剩余时间</div>
        <div class="remain-time">{{remainTime}}</div>
      </div>
      <div class="order-amount">
        <span>订单金额：</span>
        <span class="amount">￥{{amount}}</span>
      </div>
    </div>
    <div class="payment-type">
      <div class="type-tip">
        <span>选择支付方式</span>
      </div>
      <div class="type-list">
        <div class="type-item" v-for="(type,index) in types" :key="index">
          <span>{{type.name}}</span>
          <comCheckbox :value="type.isChecked" @changeHandle="changeHandle(type)"/>
        </div>
      </div>
    </div>
    <div class="payment-bottom" @click="payHandle">
      <span>确认支付：</span>
      <span class="pay-amount">￥{{amount}}</span>
    </div>
  </div>
</template>

<script>
import comCheckbox from '@/components/checkbox'
import * as tools from '@/utils/tools'
import Payment from '@/utils/payment'

export default {
  data () {
    return {
      remainTime: '30:00',
      amount: '240.00',
      types: [
        {
          isChecked: true,
          name: '微信支付'
        }
        // {
        //   isChecked: false,
        //   name: '白条支付'
        // }
      ]
    }
  },
  computed: {},
  components: {
    comCheckbox
  },
  methods: {
    getDiffTime () {
      let oldTime = new Date() // new Date(order.created_at);
      let subtractTime = new Date() - oldTime
      if (subtractTime >= 0) {
        this.countdown((30 * 60 * 1000 - subtractTime - 1) / 1000)
      }
    },
    countdown (intDiff) {
      // 倒计时函数
      this.timer = setInterval(() => {
        let day = 0
        let hour = 0
        let minute = 0
        let second = 0 // 时间默认值
        if (intDiff > 0) {
          // 计算相关的天，小时，还有分钟，以及秒
          day = Math.floor(intDiff / (60 * 60 * 24))
          hour = Math.floor(intDiff / (60 * 60)) - day * 24
          minute = Math.floor(intDiff / 60) - day * 24 * 60 - hour * 60
          second = Math.floor(intDiff) - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60
        }
        hour = '0' + hour
        minute = tools.transTwoStr(minute)
        second = tools.transTwoStr(second)
        this.remainTime = `${minute}:${second}`
        intDiff--
        if (intDiff < 0) {
          clearInterval(this.timer)
          this.remainTime = '00:00'
        }
      }, 1000)
    },
    changeHandle (type) {
      // type.isChecked = type.isChecked
    },
    payHandle () {
      this.payment.get().next('test') // 调用支付功能，临时模拟传参
    },
    initPay () {
      this.payment = new Payment()
      this.payment.pay()
        .catch((e) => {
          wx.showToast({
            title: '支付失败',
            icon: 'none'
          })
          console.log('错误', e)
        })
        .subscribe((resp) => {
          wx.showToast({
            title: '支付成功',
            icon: 'none'
          })
          this.payment.clear() // 重置count
          // 模拟支付成功后跳转页面
          wx.navigateTo({
            url: '/pages/example/index/main'
          })
          console.log('过来了', resp)
        })
    }
  },
  watch: {

  },
  mounted () {
    // 模拟从接口获取 生成订单时间
    this.getDiffTime()
    // 初始化支付数据
    this.initPay()
  },
  created () {

  },
  onHide () {
    console.log('onHide')
  },
  onUnload () {
    clearInterval(this.timer)
    this.remainTime = '30:00'
  },
  beforeDestroy () {
    console.log('destroyed')
  }
}
</script>

<style lang="less">
page {
  background: @bg;
}
.payment-container {
  color: @primary;
  padding-top: 30rpx;
  .payment-top {
    background: @color-white;
    text-align: center;
    .remain {
      padding: 38rpx 0 30rpx;
      .remain-tip {
        margin-bottom: 20rpx;
        font-size: @fs30;
      }
      .remain-time {
        font-size: @fs44;
        color: @warning;
      }
    }
    .order-amount {
      height: 86rpx;
      line-height: 86rpx;
      border-top: solid 1rpx @line;
      font-size: @fs30;
      .amount {
        margin-left: 20rpx;
      }
    }
  }
  .payment-type {
    .type-tip {
      height: 90rpx;
      line-height: 90rpx;
      padding: 0 30rpx;
      font-size: @fs30;
    }
    .type-list {
      padding: 0 30rpx;
      background: @color-white;
      .type-item {
        height: 100rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: @fs34;
        border-bottom: solid 1rpx @line;
        &:last-of-type {
          border-bottom: none;
        }
      }
    }
  }
  .payment-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 100rpx;
    line-height: 100rpx;
    width: 100%;
    background-color: @border_yellow;
    text-align: center;
    color: @color-white;
    font-size: @fs34;
    .pay-amount {
      margin-left: 20rpx;
    }
  }
}
</style>
