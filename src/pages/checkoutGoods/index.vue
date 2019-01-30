<template>
  <div class="checkout-goods">
    <div class="cart-good" v-for="(good,index) in goods" :key="index">
      <img :src="good.url" alt="" class="good-img"  @click="goToDetail">
      <div class="good-content">
        <p class="good-desc">{{good.goodDesc}}</p>
        <div class="good-bottom">
          <div class="price-block">
            <span class="pirce">￥{{good.price}}</span>
            <span class="good-num">x{{good.goodNum}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      goods: [
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
  },
  computed: {},
  components: {

  },
  methods: {
    goToDetail () {
      wx.navigateTo({
        url: '/pages/productDetail/main'
      })
    }
  },
  watch: {},
  created () {}
}
</script>

<style lang="less">
page {
  background: @bg;
  padding-top: 30rpx;
}
.checkout-goods {
  .cart-good {
    display: flex;
    align-items: center;
    padding: 30rpx;
    margin-bottom: 20rpx;
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
    &:last-of-type {
      border: none;
    }
  }
}
</style>
