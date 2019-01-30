<template>
  <ul class="item-wrap" :class="{'item-horizontally': direction}">
    <li v-for="(n, i) in market" :key="i" class="item">
      <img :src="n.src" alt="" class="item-img" :id="mark+'_img'+n.id">
      <div class="item-text-wrap">
        <a :href="'/pages/productDetail/main?id=' + n.id" class="item-explain">{{n.explain}}</a>
        <p v-if="n.tips && n.tips.length" class="item-tips">
            <span v-for="(k, index) in n.tips" :key="index"  class="tip">{{k}}</span>
        </p>
        <div class="item-price">
            <span class="price">￥{{n.price}}</span>
            <p class="wrap" v-if="mark === 'category' && n.num > 0">
                <span class="icon-minus operation-btn" @click="reduce(n)"></span> 
                <span class="argument" @click="openModal(n)">{{n.num}}</span>
                <!--<span class="operation-btn btn-down" @click="reduce(n)">-</span>
                <span class="operation-btn btn-up" @click="add(n , mark)">+</span>-->
                <span class="icon-add operation-btn" @click="add(n , mark)"></span>
            </p>
            <p class="wrap" v-if="mark !== 'category' || (mark === 'category' && n.num == 0)">
                <!--  购物车-->
                <span class="btn-cart">
                    <span class="icon-cart"  @click="add(n , mark)">
                        <span class="path1"></span>
                        <span class="path2"></span>
                        <span class="path3"></span>
                        <span class="path4"></span>
                    </span> 
                </span>
                <!--<img @click="openModal(n)" src="../../static/images/cart.jpg" />-->
                <span v-if="n.num" class="pop">{{n.num}}</span>
            </p>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import addGoods from '@/components/add'
export default {
  name: 'item',
  props: ['mark', 'market', 'num', 'direction'],
  components: {
    addGoods
  },
  beforeMount () {
    // this.screenSize()
  },
  methods: {
    screenSize: function () {
      wx.getSystemInfo({
        success: function (res) {
          var ww = res.windowWidth
          var hh = res.windowHeight
          console.log(`屏幕宽度：${ww}, 屏幕高度：${hh}`)
        }
      })
    },
    add (n, mark) {
      this.$emit('add', { n, mark })
    },
    reduce (n) {
      this.$emit('reduce', n)
    },
    openModal (item) {
      this.$emit('openModal', item)
    }
  }
}
</script>

<style lang="less" scoped>
.item-wrap {
    // padding: 10px;
    box-sizing: border-box;
    padding: 30rpx 30rpx 0rpx;
    width: 100%;
    .item {
        display: inline-block;
        // padding: 40rpx;
        width:calc(50% - 21rpx);
        margin-bottom: 40rpx;
        box-shadow:0 0 60rpx #d9d9d9;
        border-radius:10px;
        background-color: #fff;
        font-size: 0;
        overflow:hidden;
        &:nth-child(2n+1) {
            margin-right: 40rpx;
        }
        .item-text-wrap {
            padding: 20rpx;
            border-top: 1rpx solid #eee;
        }
        .item-tips {
            margin-bottom: 5px;
            color: #fff;
            font-size: @fs22;
            .tip {
                margin-right: 5px;
                padding: 1px 3px;
                border-radius: 2px;
                background-color: @color_main_100;
            }
        }
        .item-explain {
            margin-bottom: 30rpx;
            height: 66rpx;
            color: @content;
            font-size: @fs24;
            display:-webkit-box; 
            overflow:hidden; 
            text-overflow:ellipsis;
            -webkit-box-orient:vertical;
            -webkit-line-clamp: 2; 
        }
        .item-img {
            width: 100%;
            height: 330rpx;
        }
        .price {
            color: @light-primary;
            font-size: @fs44;
        }
    }
    .wrap {
        position: relative;
        display: inline-block;
        float:right;
        color: @primary;
        .argument {
            display:inline-block;
            margin:0 10rpx;
            width:50rpx;
            height:50rpx;
            line-height:50rpx;
            font-size: @fs30;
            text-align: center;
            vertical-align:middle;
            background-color: #f5f5f5;
        }
        .operation-btn {
            display: inline-block;
            width: 35rpx;
            height: 35rpx;
            line-height: 35rpx;
            text-align: center;
            font-size: @fs20;
            vertical-align: middle;
        }
        .btn-cart {
            display:inline-block;
            padding-top: 11rpx;
            width: 58rpx;
            height: 47rpx;
            // line-height:58rpx;
            border-radius: 50%;
            font-size: @fs34;
            background-color: @color_main_100;
            text-align: center;
            .icon-cart {
                .path1:before,
                .path2:before,
                .path3:before,
                .path4:before {
                    color: #fff;
                }
            }
        }
        .pop {
            position: absolute;
            right: -10rpx;
            top: -10rpx;
            width: 30rpx;
            height: 30rpx;
            text-align: center;
            line-height: 30rpx;
            font-size: @fs24;
            border-radius: 50%;
            color: #fff;
            background-color: #f6634a;
        }
    }
}
.item-horizontally {
    .item {
        box-sizing: border-box;
        margin: 0 0 20rpx 0;
        padding: 30rpx;
        width: 100%;
        border-radius: 0px;
        .item-img {
            width: 70px;
            height: 70px;
        }
        .item-text-wrap {
            display: inline-block;
            padding:0 0 0 30rpx;
            width: calc(100% - 170rpx);
            border-top: none;
            .item-explain {
                margin-bottom: 10rpx;
                height: inherit;
                font-size: @fs30;
                -webkit-line-clamp:1;
            }
        }
    }
}
</style>
