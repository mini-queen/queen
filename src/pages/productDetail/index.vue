<template>
  <div class="container">
    <!-- basic -->
    <div class="basic">
        <swiper-components :img-urls="imgUrls" height="376rpx"></swiper-components>
        <p class="product-title box">TURLEE特立燃气管4分304不锈钢天然气管液化气管防爆燃气波纹管金属软</p>
        <!-- 价格+销量 -->
        <div class="price-wrap box">
            <span class="current-price">￥128</span>
            <span class="old-price">￥199</span>
            <span class="sales">已售1206件</span>
        </div>
        <!-- 促销信息 -->
        <p class="promotional box" @click="showModal">
            <span>促销信息</span>
            <span class="discount">两件八折</span>
            <span class="discount">三件七折</span>
            <span class="icon-arrow_right"></span>
        </p>
        <!-- 广告横幅 -->
        <div class="advertising box">
            <img src="http://m.360buyimg.com/babel/s869x347_jfs/t24214/84/2640834698/143859/96cdca4d/5b876616Nbca0e9e4.jpg!q70.dpg" />
        </div>
        <!-- 详情 -->
        <div class="detail box">
            <p class="title">商品详情</p>
            <img src="http://img30.360buyimg.com/popWareDetail/jfs/t24247/363/1873243451/233886/3a3e076d/5b6d3ba3N626b14b7.jpg.dpg" />
            <img src="http://img11.360buyimg.com/popWareDetail/jfs/t22450/95/1942287375/292756/9f69dc88/5b6d3ba3Nec49ed30.jpg.dpg" />
        </div>
    </div>
    <!-- 加入购物车 -->
    <ul class="operate">
        <li class="link" @click="toIndex(true)">
            <span class="icon icon-home_details"></span> 
            <p class="text">首页</p>
        </li>
        <li class="link">
            <button open-type="share">
                <span class="icon icon-share"></span> 
                <p class="text">分享</p>
            </button>
        </li>
        <li class="link" @click="toIndex(false)">
            <span class="icon icon-cart">
                <span class="path1"></span>
                <span class="path2"></span>
                <span class="path3"></span>
                <span class="path4"></span>
            </span> 
            <p class="text">购物车</p>
        </li>
        <li class="cart">加入购物车</li>
    </ul>
    <!-- 促销弹窗 -->
    <popover @closeModal="closeModal" :isShow="is_show" :promotionalList="list" popType="promotional" :isAnim="false">
      <span slot="title">促销信息</span>
    </popover>
  </div>
</template>
<script>
import popover from '@/components/popover'
import swiperComponents from '@/components/swiperComponent'
import { mapGetters } from 'vuex'
import { getProductDetail } from '@/utils/api'
export default {
  data () {
    return {
      is_show: false,
      url: 'http://publish.kuchuan.com/activity/header/item2.png',
      imgUrls: [],
      list: ['两件八折', '三件七折', '全场满1000减100', '全场满2000减300']
    }
  },
  computed: {
    ...mapGetters({
      test: 'getTest'
    })
  },
  components: {
    swiperComponents, popover
  },
  mounted () {
    this.getBanner()
    const { id } = this.$root.$mp.query
    getProductDetail(id).then((res) => {
      console.log('getProductDetail----------------------->', res)
    })
  },
  onShow (options) {
    // console.log('options', options)
  },
  methods: {
    getBanner () {
      setTimeout(() => {
        this.imgUrls = [
          {
            url: 'http://m.afander.com/index/img/2ecbeeaf.banner_new.png'
          },
          {
            url: 'http://m.afander.com/index/img/2ecbeeaf.banner_new.png'
          },
          {
            url: 'http://m.afander.com/index/img/2ecbeeaf.banner_new.png'
          }
        ]
      }, 2000)
    },
    toIndex (isIndex) {
      console.log('跳转首页')
      wx.switchTab({
        url: isIndex ? '/pages/index/main' : '/pages/cart/main'
      })
    },
    showModal () {
    //   this.current = { ...item }
      console.log('current', this.current)
      this.is_show = true
    },
    closeModal () {
      this.is_show = false
    }
  },
  onShareAppMessage: function (res) {
    console.log(res.target)
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/pages/productDetail/main'
    }
  }
}
</script>

<style lang="less" scoped>
.container {
    padding: 0;
    min-height: 100vh;
    background-color: @color_mainbg;
    .box {
        padding: 30rpx;
        font-size: @fs26;
        background-color: #fff;
    }
    .basic {
        height: calc(100vh - 108rpx);
        overflow: auto;
        .swiper-continer {
            height: 376rpx;
        }
    }
    .product-title {
        // padding: 30rpx;
        font-size: @fs30;
        color: @color_text_333;
    }
    .price-wrap {
        padding: 0 30rpx 30rpx;
        color: @color_text_999;
        border-bottom: 1px solid #f6f6f6;
        .current-price {
            margin-right: 10px;
            font-size: @fs44;
            font-weight: bold;
            color: @color_main_100;
        }
        .old-price {
            text-decoration: line-through;
        }
        .sales {
            float: right;
        }
    }
    .promotional {
        // padding: 30rpx;
        color: @color_text_999;
        .discount {
            margin-left: 10px;
            padding: 1rpx 4rpx;
            font-size: @fs24;
            color: @border_yellow;
            border: 1px solid @border_yellow;
            border-radius: 4rpx;
        }
        .icon-arrow_right {
            float: right;
            font-weight:bold;
            font-size:34rpx;
        }
    }
    .advertising {
        padding: 10px 15px;
        background-color: #f6f6f6;
        img {
            width: 100%;
            height: 300rpx;
            border-radius: 10px;
        }
    }
    .detail {
        font-size: 0;
        .title {
            margin-bottom: 16rpx;
            padding-left: 12rpx;
            height:34rpx;
            line-height:34rpx;
            font-size: @fs34;
            color: @color_main_100;
            border-left: 5rpx solid @color_main_100;
        }
        img {
            width: 100%;
            height:800rpx;
            margin-top: 24rpx;
        }
    }
    .operate {
        box-sizing: border-box;
        padding-left: 30rpx;
        width: 100%;
        text-align: center;
        background-color: #fff;
        border-top: 1rpx solid #eee;
        .link {
            display: inline-block;
            width: 18%;
            font-size: @fs22;
            vertical-align: middle;
            button {
                display: initial;
                padding:0;
                font-size:inherit;
                border-radius:0;
                line-height:inherit;
                background-color:transparent;

            }
            .icon {
                font-size: @fs44;
            }
            .icon-cart {
                .path1:before,
                .path2:before,
                .path3:before,
                .path4:before {
                    color: @color_text_333;
                }
            }
        }
        .cart {
            display: inline-block;
            margin-left: 6%;
            width: 40%;
            height: 107rpx;
            line-height: 108rpx;
            font-size: @fs30;
            color: #fff;
            background-color: @color_main_100;
        }
    }
}

</style>
