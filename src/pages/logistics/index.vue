<template>
  <div class="my-order">
    <div class="my-order_navbar">
      <p class="my-order_navbar_item" @click="tabClick(0)"><span class="weui-navbar__title">全部</span></p>
      <p class="my-order_navbar_item" @click="tabClick(1)"><span class="weui-navbar__title">待支付</span></p>
      <p class="my-order_navbar_item" @click="tabClick(2)"><span class="weui-navbar__title">代发货</span></p>
      <p class="my-order_navbar_item" @click="tabClick(3)"><span class="weui-navbar__title">完成</span></p>
      <p class="my-order_navbar_item" @click="tabClick(4)"><span class="weui-navbar__title">取消</span></p>
      <div class="my-order_navbar_slider" :style="'transform: translateX('+sliderOffset+'px)'"></div>
    </div>
    <swiper class="my-order_swiper" :current="current" duration="300" @change="slideeChange">
      <swiper-item class="my_swiper-item">
        <!-- 全部订单 -->
        <div class="my-order_all">

        </div>
      </swiper-item>
      <swiper-item class="my_swiper-item">
        <!-- 待支付订单 -->
        <div class="my-order_pay">

        </div>
      </swiper-item>
      <swiper-item class="my_swiper-item">
        <!-- 已完成订单 -->
        <div class="my-order_complete">

        </div>
      </swiper-item>
      <swiper-item class="my_swiper-item">
        <!-- 等待配送订单 -->
        <div class="my-order_deliver">

        </div>
      </swiper-item>
      <swiper-item class="my_swiper-item">
        <!-- 已取消订单 -->
        <div class="my-order_cancel">

        </div>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      screenWidth: 375,
      current: 0,
      sliderOffset: 0
    }
  },
  computed: {
    ...mapGetters([
      'wxUserInfo'
    ])
  },
  components: {

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
      console.log(e)
      this.current = e.mp.detail.current
      this.tabLineMove()
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
    this.current = option.indicator
  }
}
</script>

<style lang="less" scoped>
.my-order{
  background: @bg;
  height: 100vh;
  .my-order_navbar{
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    height: 49px;
    background: #fff;
    position: fixed;
    border-bottom:1px solid @border;
    display: flex;
    flex-flow: nowrap row;
    z-index: 999;
    .my-order_navbar_item{
      width: 20%;
      padding: 16px 0;
      text-align: center;
      font-size: 16px;
      line-height: 1;
      color: @content;
    }
    .my-order_navbar_slider{
      width: 20%;
      background: @primary;
      height: 1px;
      position: absolute;
      left: 0;
      top: 49px;
      z-index: 2;
      transform:translateX(0px);
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
    .my-order_all{
      height: 80vh!important;
      background: #fff;
    }
    .my-order_pay{
      height: 200vh!important;
      background: #000;
    }
    .my-order_complete{
      height: 70vh!important;
      background: pink;
    }
    .my-order_deliver{
      height: 30vh!important;
      background: purple;
    }
    .my-order_cancel{
      height: 130vh!important;
      background:grey;
    }
  }
}
</style>
