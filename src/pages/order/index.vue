<template>
  <div class="my-order">
    <div class="my-order_navbar">
      <p class="my-order_navbar_item" @click="tabClick(0)"><span class="weui-navbar__title" :class="current===0?'current_navbar':''">全部</span></p>
      <p class="my-order_navbar_item" @click="tabClick(1)"><span class="weui-navbar__title" :class="current===1?'current_navbar':''">待支付</span></p>
      <p class="my-order_navbar_item" @click="tabClick(2)"><span class="weui-navbar__title" :class="current===2?'current_navbar':''">代发货</span></p>
      <p class="my-order_navbar_item" @click="tabClick(3)"><span class="weui-navbar__title" :class="current===3?'current_navbar':''">完成</span></p>
      <p class="my-order_navbar_item" @click="tabClick(4)"><span class="weui-navbar__title" :class="current===4?'current_navbar':''">取消</span></p>
      <div class="my-order_navbar_slider" :style="'transform: translateX('+sliderOffset+'px)'"></div>
    </div>
    <swiper class="my-order_swiper" :current="current" duration="300" @change="slideeChange">
      <swiper-item class="my_swiper-item">
        <!-- 全部订单 -->
        <div class="my-order_all">
            <order-component :order-list="orderList"></order-component> 
        </div>
      </swiper-item>
      <swiper-item class="my_swiper-item">
        <!-- 待支付订单 -->
        <div class="my-order_pay">
          <order-component :order-list="orderListPay"></order-component>
        </div>
      </swiper-item>
      <swiper-item class="my_swiper-item">
        <!-- 已完成订单 -->
        <div class="my-order_complete">
          <order-component :order-list="orderListComplete"></order-component>
        </div>
      </swiper-item>
      <swiper-item class="my_swiper-item">
        <!-- 等待配送订单 -->
        <div class="my-order_deliver">
          <order-component :order-list="orderListDeliver"></order-component>
        </div>
      </swiper-item>
      <swiper-item class="my_swiper-item">
        <!-- 已取消订单 -->
        <div class="my-order_cancel">
          <order-component :order-list="orderListCancel"></order-component>
        </div>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import orderComponent from '@/components/order'
export default {
  data () {
    return {
      orderList: [],
      timer: null,
      sliderOffset: 0,
      current: 0
    }
  },
  computed: {
    ...mapGetters([
      'wxUserInfo'
    ])
  },
  components: {
    orderComponent
  },
  methods: {
    tabClick (index) {
      if (this.current === index) return
      this.current = index
      this.tabLineMove()
    },
    // 头部横线移动
    tabLineMove () {
      this.sliderOffset = (this.screenWidth / 5) * Number(this.current)
    },
    slideeChange (e) {
      this.current = e.mp.detail.current
      this.tabLineMove()
    },
    getOrder () {
      setTimeout(() => {
        let orderList = [
          {
            order: '123454432132',
            num: 31,
            price: 99,
            name: '地暖水管3',
            url: 'http://publish.kuchuan.com/activity/header/item2.png',
            status: 3,
            time: 18000
          },
          {
            order: '123454334321',
            num: 13,
            price: 99,
            name: '地暖水管1',
            url: 'http://publish.kuchuan.com/activity/header/item2.png',
            status: 1,
            time: 3600
          },
          {
            order: '123454422321',
            num: 3,
            price: 99,
            name: '地暖水管2',
            url: 'http://publish.kuchuan.com/activity/header/item2.png',
            status: 1,
            time: 600
          },
          {
            order: '123454432132',
            num: 31,
            price: 99,
            name: '地暖水管3',
            url: 'http://publish.kuchuan.com/activity/header/item2.png',
            status: 2,
            time: 18000
          },
          {
            order: '123454334321',
            num: 13,
            price: 99,
            name: '地暖水管1',
            url: 'http://publish.kuchuan.com/activity/header/item2.png',
            status: 4,
            time: 3600
          },
          {
            order: '123454422321',
            num: 3,
            price: 99,
            name: '地暖水管2',
            url: 'http://publish.kuchuan.com/activity/header/item2.png',
            status: 3,
            time: 600
          }
        ]

        this.handleOrder(orderList)
      })
    },
    handleOrder (source) {
      this.orderList = source
      this.orderListPay = source.filter(item => {
        return item.status === 1
      })
      this.orderListComplete = source.filter(item => {
        return item.status === 3
      })
      this.orderListDeliver = source.filter(item => {
        return item.status === 2
      })
      this.orderListCancel = source.filter(item => {
        return item.status === 4
      })
      let isAvailable = false
      this.timer = setTimeout(() => {
        source = source.map(item => {
          item.wait = 0
          if (item.time > 0) {
            isAvailable = true
            item.time--
            if (Math.floor(item.time / 60)) {
              item.wait = Math.floor(item.time / 60) + ':' + item.time % 60
            } else {
              item.wait = item.time
            }
          }
          return item
        })
        if (isAvailable) {
          this.handleOrder(source)
        } else {
          clearTimeout(this.timer)
        }
      }, 1000)
    }
  },
  created () {
    // 获取屏幕宽度
    wx.getSystemInfo({
      success: (res) => {
        this.screenWidth = res.windowWidth
      }
    })
  },
  onLoad (option) {
    // 判断当前属于哪一个订单界面
    this.current = option.indicator || 0
    console.log(this.current)
  },
  onShow () {
    this.getOrder()
  },
  onHide () {
    clearTimeout(this.timer)
  },
  onUnload () {
    clearTimeout(this.timer)
  }
}
</script>

<style lang="less" scoped>
.my-order{
  background: @bg;
  height: 100vh;
  font-size: 30rpx;
  line-height: 1;
  .my-order_navbar{
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    height: 96rpx;
    background: #fff;
    position: fixed;
    border-bottom:4rpx solid @border;
    display: flex;
    flex-flow: nowrap row;
    z-index: 999;
    .my-order_navbar_item{
      width: 20%;
      padding: 33rpx 0;
      text-align: center;
      color: @content;
      .current_navbar{
        color: @color_main_100;
        font-weight: bolder;
      }
    }
    .my-order_navbar_slider{
      width: 20%;
      background: @color_main_100;
      height: 4rpx;
      position: absolute;
      left: 0;
      top: 96rpx;
      z-index: 2;
      transform:translateX(0rpx);
      transition:all 0.2s;
    }
  }
  .my-order_swiper{
    width: 100%;
    padding-top: 60px;
    height: 100%;
    box-sizing: border-box;
    .my_swiper-item{
      width: 100%;
      height: 100%;
      overflow-y: auto;
      background: @bg;
    }
    .my-order_all{}
    .my-order_pay{}
    .my-order_complete{}
    .my-order_deliver{}
    .my-order_cancel{}
  }
}
</style>
