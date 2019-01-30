<template>
  <div class="cart-container">
    <div class="cart-empty" v-if="goods.length<1">
      <img class="empty-img" src="/static/images/cart_blank.png" alt="">
      <div class="empty-tip">您的购物车空空如也</div>
      <div class="empty-btn" @click="goShopping">
        选购商品
      </div>
    </div>
    <div class="cart-header" v-if="goods.length>=1">
      <span>这是您最近添加的购物车</span>
      <span @click="cartEdit" v-show="isEdit">完成</span>
      <span @click="cartEdit" v-show="!isEdit">编辑</span>
    </div>
    <div class="cart-goods" v-if="goods.length>=1">
      <div class="cart-good" v-for="(good,index) in goods" :key="index">
        <comCheckbox :value="good.isChecked" @changeHandle="changeHandle(good)"/>
        <img :src="good.url" alt="" class="good-img" @click="goToDetail">
        <div class="good-content">
          <p class="good-desc">{{good.goodDesc}}</p>
          <div class="good-bottom">
            <div class="price-block">
              <span class="pirce">￥{{good.price}}</span>
              <span class="discount">￥{{good.discount}}</span>
            </div>
            <div class="good-num">
              <comAdd :num="good.goodNum" @add="addGood(good)" @reduce="reduceGood(good,index)" @numHandle="numHandle(good)"></comAdd>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="cart-bottom" v-if="goods.length>=1">
      <div class="bottom-inner">
        <div class="cart-check">
          <comCheckbox :value="isAllChecked" @changeHandle="checkedAll">全选</comCheckbox>
          <span class="price-total" v-show="!isEdit">合计：￥{{totolPrice}}</span>
        </div>
        <div class="cart-btns">
          <div class="btn-collect" @click="collect" v-if="false">加入收藏夹</div>
          <div class="btn-del" @click="delCart" v-if="isEdit">删除</div>
          <div class="btn-checkout" @click="checkout" :class="{disable:totolPrice<=0}" v-else>结算</div>
        </div>
      </div>
    </div>
    <popover @closeModal="closeModal" :isShow="is_show" :num="currentGood.goodNum || 0" @submit="sureCallBack" :isUnPass="true">
      <span slot="title">请输入购买数量</span>
    </popover>
  </div>
</template>

<script>
import comCheckbox from '@/components/checkbox'
import comAdd from '@/components/add'
import popover from '@/components/popover'

export default {
  data () {
    return {
      is_show: false,
      totolPrice: 0,
      isEdit: false,
      isAllChecked: false,
      currentGood: {},
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
        },
        {
          isChecked: false,
          url: 'http://publish.kuchuan.com/activity/header/item2.png',
          goodDesc: '科固全铜冷热水单孔接管',
          price: '399',
          discount: '118',
          goodNum: 1
        }
      ]
    }
  },
  computed: {},
  components: {
    comCheckbox,
    comAdd,
    popover
  },
  methods: {
    goShopping () {
      wx.switchTab({
        url: '/pages/index/main'
      })
    },
    closeModal () {
      this.is_show = false
    },
    numHandle (good) {
      this.currentGood = good
      this.is_show = true
    },
    sureCallBack (val) {
      this.currentGood.goodNum = val
      this.is_show = false
    },
    goToDetail () {
      wx.navigateTo({
        url: '/pages/productDetail/main'
      })
    },
    cartEdit () {
      this.isEdit = !this.isEdit
      console.log('购物车编辑')
    },
    addGood (good) {
      good.goodNum++
    },
    reduceGood (good, index) {
      console.log('进入')
      if (good.goodNum > 0) {
        good.goodNum--
      }
      if (good.goodNum === 0) {
        wx.showModal({
          title: '提示',
          content: '确定从购物车删除该商品吗',
          success: (res) => {
            if (res.confirm) {
              this.goods.splice(index, 1)
            } else if (res.cancel) {
              good.goodNum = 1
            }
          }
        })
      }
    },
    delCart () {
      if (this.goods.every(item => !item.isChecked)) {
        return wx.showToast({
          title: '请选择一个商品',
          icon: 'none'
        })
      }
      wx.showModal({
        title: '提示',
        content: '确定从购物车删除该商品吗',
        success: (res) => {
          if (res.confirm) {
            this.goods = this.goods.filter(item => !item.isChecked)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    checkout () {
      if (this.totolPrice <= 0) {
        return
      }
      wx.navigateTo({
        url: '/pages/checkout/main'
      })
      console.log('结算金额', this.totolPrice)
    },
    collect () {
      console.log('收藏')
    },
    changeHandle (good) {
      good.isChecked = !good.isChecked
    },
    checkedAll () {
      this.isAllChecked = !this.isAllChecked
    },
    calculateTotalPrice () {
      let goods = this.goods.filter(item => item.isChecked && item.goodNum > 0)
      this.totolPrice = goods.reduce((acc, item) => acc + item.goodNum * item.price, 0)
    }
  },
  watch: {
    isAllChecked (v) {
      if (!v && this.goods.some(item => item.isChecked === false)) return
      this.goods = this.goods.map(item => (item.isChecked = v, item))  // eslint-disable-line
    },
    goods: {
      handler (v) {
        this.isAllChecked = v.every(item => item.isChecked)
        this.calculateTotalPrice()
      },
      deep: true
    }
  },
  created () {}
}
</script>

<style lang="less">
page {
  background: @bg;
}
.cart-container {
  color: @primary;
  margin-bottom: 100rpx;
  .cart-empty {
    margin-top: 116rpx;
    text-align: center;
    font-size: @fs30;
    .empty-img {
      width: 276rpx;
      height: 136rpx;
    }
    .empty-tip {
      color: @text;
      margin-top: 40rpx;
      margin-bottom: 100rpx;
    }
    .empty-btn {
      display: inline-block;
      width: 260rpx;
      height: 80rpx;
      line-height: 80rpx;
      border-radius: 40rpx;
      color: @color-white;
      background-color: @light-primary;
      box-shadow: 0 10rpx 30rpx rgba(243,163,0,0.3);
    }
  }
  .cart-header {
    height: 80rpx;
    padding: 0 30rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #f3e3c2;
    margin-bottom: 20rpx;
    font-size: @fs30;
  }
  .cart-goods {
    background: @color-white;
    padding: 0 30rpx;
    .cart-good {
      display: flex;
      align-items: center;
      padding: 30rpx 0;
      border-bottom: @line solid 1rpx;
      .checkbox-wrapper {
        margin-right: 0;
        height: 180rpx;
        line-height: 180rpx;
        padding-right: 20rpx;
      }
      .good-img {
        margin-right: 20rpx;
        width: 180rpx;
        height: 180rpx;
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
            .discount {
              font-size: 28rpx;
              margin-left: 20rpx;
              text-decoration: line-through;
              color: @sub;
            }
          }
          .good-num {
            .btn-add {
              border: none;
              font-size: @fs44;
              color: @color-black;
            }
            .text {
              display: inline-block;
              width: 70rpx;
              height: 50rpx;
              text-align: center;
              line-height: 50rpx;
              background: @line;
            }
          }
        }
      }
      &:last-of-type {
        border: none;
      }
    }
  }
  .cart-bottom {
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
      .cart-check {
        .checkbox-wrapper {
          margin-right: 40rpx;
          .checkbox-label {
            margin-left: 20rpx;
            font-size: @fs34;
          }
        }
        .price-total {
          font-size: @fs34;
        }
      }
      .cart-btns {
        font-size: @fs30;
        .btn-collect {
          display: inline-block;
          height: 62rpx;
          padding: 0 30rpx;
          border: solid 1rpx @line;
          border-radius: 30rpx;
          text-align: center;
          line-height: 62rpx;
          box-sizing: border-box;
        }
        .btn-del {
          display: inline-block;
          width: 210rpx;
          height: 60rpx;
          margin-left: 30rpx;
          background-color: @warning;
          border-radius: 30rpx;
          text-align: center;
          line-height: 60rpx;
          color: @color-white;
        }
        .btn-checkout {
          display: inline-block;
          width: 260rpx;
          height: 100rpx;
          margin-right:-30rpx;
          background-color: @border_yellow;
          text-align: center;
          line-height: 100rpx;
          color: @color-white;
          &.disable {
            background-color: @disabled;
          }
        }
      }
    }
  }
}
</style>
