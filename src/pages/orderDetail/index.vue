<template>
  <div class="my-order-detail-wrap">
    <div class="my-order_status my-order">
      <p class="my-order_title"><i class="my-order_line"></i>订单状态</p>
      <div class="my-order_status_detail">
        <p class="my-order_status_detail_circle my-order_status_detail_complete"><span class="my-order_status_detail_name">接收</span></p>
        <p class="my-order_status_detail_circle my-order_status_detail_complete"><span class="my-order_status_detail_name">拣货</span></p>
        <p class="my-order_status_detail_circle"><span class="my-order_status_detail_name">派送</span></p>
        <p class="my-order_status_detail_circle"><span class="my-order_status_detail_name">完成</span></p>
      </div>
    </div>
    <div class="my-order_deliver my-order">
      <p class="my-order_title"><i class="my-order_line"></i>物流状态</p>
      <a class="order_content" href="">订单正在派送<i class="arrow_right"></i></a>
    </div>
    <div class="my-order_address my-order">
      <p class="my-order_title"><i class="my-order_line"></i>订单地址</p>
      <div class="order_content" >
        <p class="order_address_name"><span>李子涵</span><span class="order_address_mobile">183100403366</span></p>
        <p>北京市朝阳区潘家园华威百利21楼1102</p>
      </div>
    </div>
    <div class="my-order_goods my-order">
      <p class="my-order_title"><i class="my-order_line"></i>商品信息</p>
      <div class="my-order_goods_detail">
        <ul class="my-order_goods_list" :style="{width:3*210+100+'rpx'}">
          <li class="my-order_goods_item">
            <img class="my-order_goods_img" src="http://publish.kuchuan.com/activity/header/item2.png" alt="">
            <i class="my-order_goods_num">3</i>
          </li>
          <li class="my-order_goods_item">
            <img class="my-order_goods_img" src="http://publish.kuchuan.com/activity/header/item2.png" alt="">
            <i class="my-order_goods_num">3</i>
          </li>
          <li class="my-order_goods_item">
            <img class="my-order_goods_img" src="http://publish.kuchuan.com/activity/header/item2.png" alt="">
            <i class="my-order_goods_num">3</i>
          </li>
          <!-- <li class="my-order_goods_item">
            <img class="my-order_goods_img" src="http://publish.kuchuan.com/activity/header/item2.png" alt="">
            <i class="my-order_goods_num">3</i>
          </li>
          <li class="my-order_goods_item">
            <img class="my-order_goods_img" src="http://publish.kuchuan.com/activity/header/item2.png" alt="">
            <i class="my-order_goods_num">3</i>
          </li>
          <li class="my-order_goods_item">
            <img class="my-order_goods_img" src="http://publish.kuchuan.com/activity/header/item2.png" alt="">
            <i class="my-order_goods_num">3</i>
          </li> -->
        </ul>
      </div>
      <span class="arrow_right">
          <i class="icon-arrow_right"></i>
      </span>
    </div>
    <div class="my-order_info my-order">
      <p class="my-order_title"><i class="my-order_line"></i>订单信息</p>
        <p class="order_content">
          <span class='order_info'>订单编号：1000023012</span>
          <span class='order_info'>订单时间：2018-08-19 09:00:23</span>
        </p>
        <p class="order_content">
          <span class='order_info'>支付方式：在线支付</span>
          <span class='order_info'>支付途径：微信支付</span>
        </p>
        <p class="order_content">
          <span class='order_info'>配送方式：配送</span>
        </p>        
    </div>
    <div class="my-order_cost my-order">
      <p class="my-order_title"><i class="my-order_line"></i>商品金额</p>
      <p class="order_content">商品总计<i class="fr">￥240.00</i></p>
      <p class="order_content">运费<i class="fr">￥0.00</i></p>
      <p class="order_content">优惠<i class="fr">￥0.00</i></p>
      <p class="order_content">应付金额<i class="fr">￥240.00</i></p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      screenWidth: 375,
      current: 0,
      sliderOffset: 0
    }
  },
  computed: {},
  components: {},
  methods: {},
  created () {},
  onLoad (option) {}
}
</script>

<style lang="less" scoped>
.my-order-detail-wrap{
  background: @bg;
  overflow: hidden;
  color: @content;
  font-size: 30rpx;
  line-height: 1;
  .my-order{
    background: @color-white;
    margin: 18rpx 0;
    // .arrow_right{
    //   float: right;
    //   width: 18px;
    //   height: 18px;
    //   background: url('../../../static/images/arrow_right.png') no-repeat 0 0;
    //   background-size: cover;
    // }
    .my-order_title{
      padding: 29rpx;
      font-size: 34rpx;
      line-height: 1;
      display: flex;
      flex-flow: nowrap row;
      justify-content: flex-start;
      border-bottom: 1rpx solid @color_lin;
      font-weight: bold;
      .my-order_line{
        width: 5rpx;
        background: @color-black;
        margin-right: 13rpx;
      }
    }
    .order_content{
      padding: 40rpx 30rpx;
      &+.order_content{
        border-top: 1rpx solid @color_lin;
      }
      .order_address_name{
        padding-bottom:26rpx;
        .order_address_mobile{
          margin-left: 72rpx;
        }
      }
      .order_info{
        display: block;
        &+.order_info{
          padding-top: 20rpx;
        }
      }

    }
    .my-order_status_detail{
      display: flex;
      flex-flow: nowrap row;
      justify-content: space-between;
      padding: 40rpx 30rpx;
      .my-order_status_detail_circle{
        width: 100rpx;
        height: 100rpx;
        padding: 4rpx;
        border: 2rpx solid @color_text_999;
        border-radius: 50%;
        overflow: hidden;
        outline: none;
        position: relative;
        .my-order_status_detail_name{
          display: inline-block;
          width: 100rpx;
          height: 100rpx;
          line-height: 100rpx;
          border-radius: 50%;
          background: @color_text_999;
          font-size: 26rpx;
          color: @color-white;
          text-align: center;
        }
      }
      .my-order_status_detail_complete{
        border: 2rpx solid @color_main_100;
        .my-order_status_detail_name{
          background: @color_main_100;
        }
      }

    }
  }
  .my-order_goods{
    position: relative;
    .my-order_goods_detail{
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
      overflow-y: auto;
      .my-order_goods_list{
        .my-order_goods_item{
          width: 180rpx;
          height: 180rpx;
          position: relative;
          display: inline-block;
          margin-right: 30rpx;
          border: 1rpx solid @color_lin;
          .my-order_goods_img{
            width: 100%;
            height: 100%;
          }
          .my-order_goods_num{
            width: 30rpx;
            font-size: 24rpx;
            line-height: 1;
            padding: 3rpx 0;
            background: @color_delete;
            border-radius: 50%;
            position: absolute;
            top: -10rpx;
            right: -10rpx;
            color: @color-white;
            text-align: center;
          }
        }
      }
    }
    .arrow_right{
      background: @color-white;
      width: 100rpx;
      position: absolute;
      bottom: 0;
      right: 0;
      height: 240rpx;
      display: flex;
      flex-flow: nowrap row;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
