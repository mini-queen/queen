<template>
  <ul class="order-wrap">
    <li v-for="(item, index) in orderList" :key="index" class="order_item" >
        <div class="order_time">订单日期：2018-08-08 09:10 <a class="toOrderDetail fr" :href="'/pages/orderDetail/main?order='+item.order">订单详情>></a></div>
        <div class="order_goods_detail clearfix" v-if="item.num < 5">
            <img class="order_goods_img fl" :src="item.url" alt="">
            <p class="order_goods_name">{{item.name}}</p>
            <p class="order_goods_value clearfix"><span class="goods_price fl">￥{{item.price}}</span><i class="goods_num fl">x{{item.num}}</i></p>
            <i class="icon-arrow_right"></i>
        </div>

        <div class="order_goods_detail clearfix" v-else>
            <scroll-view class="scroll-view_H" scroll-x style="width: 100%">
            <ul class='order_goods_detail_list clearfix' :style="{width:4*210+50+'rpx'}">
                <li class='order_goods_detail_list_item'><img class="order_goods_img fl" :src="item.url" alt=""><i class="order_goods_detail_list_item_num">{{item.num}}</i></li>
                <li class='order_goods_detail_list_item'><img class="order_goods_img fl" :src="item.url" alt=""><i class="order_goods_detail_list_item_num">{{item.num}}</i></li>
                <li class='order_goods_detail_list_item'><img class="order_goods_img fl" :src="item.url" alt=""><i class="order_goods_detail_list_item_num">{{item.num}}</i></li>
                <li class='order_goods_detail_list_item'><img class="order_goods_img fl" :src="item.url" alt=""><i class="order_goods_detail_list_item_num">{{item.num}}</i></li>
            </ul>
           </scroll-view>
            <span class="arrow_right">
                <i class="icon-arrow_right"></i>
            </span>
        </div>
        <!-- 待支付 -->
        <div class="order_goods_pay" v-if="item.status == 1" >
            <span class="pay_money">应付金额：￥{{item.price * item.num }}</span>
            <span class="order_btn fr" @click="cancelPay">取消订单</span>
            <span class="order_btn order_pay fr" @click="pay(item.order)">支付{{item.wait}}</span>
        </div>
        <!-- 已完成 -->
        <div class="order_goods_pay" v-if="item.status == 3" >
            <span class="pay_money">实付金额：￥{{item.price * item.num }}</span>
            <a class="order_btn fr" :href="'/pages/orderDetail/main?order='+item.order">去评价</a>
        </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'item',
  props: {
    orderList: {
      type: Array,
      default: function () {
        return []
      }
    },
    type: {
      type: String,
      default: 'all'
    }
  },
  components: {},
  beforeMount () {},
  computed: {},
  methods: {
    cancelPay () {
      console.log('cancelPay')
    },
    pay () {}
  }
}
</script>

<style lang="less" scoped>
.order-wrap {
    .order_item {
        background:@color-white;
        margin-bottom:20rpx;
        color:@content;
        font-size: 30rpx;
        line-height: 1;
        .order_time {
            padding: 30rpx;
            display: flex;
            flex-flow: nowrap row;
            justify-content: space-between;
            align-items: center;
            .toOrderDetail{
                font-size: 24rpx;
                color: @color_main_100;
            }
        }
        .order_goods_detail{
            padding: 30rpx 37rpx 30rpx 30rpx;
            border-top: 1px solid @color_lin;
            border-bottom: 1px solid @color_lin;
            text-align: left;
            position: relative;
            overflow-x: auto;
            .order_goods_img{
                width: 180rpx;
                height: 180rpx;
                border: 1rpx solid @color_lin;
                margin-right: 30rpx;
                box-sizing: border-box;
            }
            .order_goods_name{
                padding-top: 7rpx;
                margin-bottom: 90rpx;
            }
            .order_goods_value{
                display: flex;
                flex-flow: nowrap row;
                justify-content: flex-start;
                align-items: center;
            }
            .goods_price{
                color: @color_main_100;
                font-size: 44rpx;
                line-height: 1;
                margin-right: 10px;
            }
            .goods_num{
                color: @color_text_666;
                font-size: 24rpx;
                line-height: 1;
            }
            .icon-arrow_right{
                color: @color_text_666;
                font-size: 30rpx;
                position: absolute;
                right: 37rpx;
                top: 108rpx;
            }

            .order_goods_detail_list{
                padding-top: 15rpx;
                .order_goods_detail_list_item{
                    position: relative;
                    width: 180rpx;
                    height: 180rpx;
                    float: left;
                    margin-right: 30rpx;
                    .order_goods_detail_list_item_num{
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
            .arrow_right{
                background: @color-white;
                width: 100rpx;
                position: absolute;
                top: 0;
                right: 0;
                height: 240rpx;
                display: flex;
                flex-flow: nowrap row;
                align-items: center;
                justify-content: center;
            }
        }
        .order_goods_pay {
            padding: 20rpx;
            display: flex;
            flex-flow: nowrap row;
            justify-content: flex-end;
            align-items: center;
            line-height: 1.6;
            font-size: 24rpx;
            .order_btn{
                width: 140rpx;
                padding: 9rpx 0;
                border-radius: 48rpx;
                border: 1rpx solid @content;
                text-align: center;
                box-sizing: border-box;
            }
            .order_pay{
                border: 1rpx solid @color_main_100;
                background: @color_main_100;
                color:@color-white;
                margin-left: 36rpx;
                display: flex;
                flex-flow: nowrap row;
                justify-content: center;
            }
            .pay_money{
                flex-grow: 1;
                text-align: left;
            }
        }
    }

}
</style>
