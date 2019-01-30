<template>
<swiper class="swiper-continer" indicator-dots="true" :autoplay="isAuto" duration="1000" :style="{width:width,height:height}">
    <swiper-item v-for="(item, index) in imgUrls" :key="index">
        <image :src="item.url" class="slide-image"/>
    </swiper-item>
</swiper>
</template>
<script>
export default {
  name: 'swiperComponent',
  data () {
    return {}
  },
  props: {
    isAuto: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '260rpx'
    },
    imgUrls: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  watch: {
    imgUrls (v) {
      this.imgUrls = v
    }
  },
  methods: { },
  created () { }
}
</script>

<style lang="less">
  .swiper-continer{
    .slide-image{
      width: 100%;
      height: 100%;
    }
    .wx-swiper-dot{
      content: '';
      flex-grow: 1; 
      border-radius: 12rpx;
      background: @color_point; 
      height: 12rpx;
      width: 12rpx;
    }
    .wx-swiper-dot-active{
      width:24rpx;
      background:@color_main_100  
    }
  }
</style>
