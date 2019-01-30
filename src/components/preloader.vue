<template>
  <div class="loading-wrap" :class="[isShow?'show':'']">
    <div class="loading-content">
        <img src="https://file.digitaling.com/eImg/uimages/20150908/1441704518179024.gif" class="icon" />
        <p class="text">
        <slot name="title"></slot>
        </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'preloader',
  props: {
    isShow: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="less" scoped>
.loading-wrap {
    position: fixed;
    z-index: 98;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    background-color:#fff;
    display: none;
    &.show {
      display: block;
    }
    .loading-content {
        position: absolute;
        top:300rpx;
        left:250rpx;
        text-align:center;
        img {
            width: 240rpx;
            height: 240rpx;
        }
        .text {
            margin-top:20rpx;
            font-size: @fs30;
        }
    }
}
</style>
