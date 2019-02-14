<template>
    <div class="popover-wrapper" :class="[isShow?'show':'',isAnim?'anim':'']" :catchtouchmove="true">
        <div class="popover-body" :class="[className, popType]">
            <div class="popover-header">
                <slot name="title"></slot>
            </div>
            <div class="promotional-content" v-if="popType=='promotional'">
                <slot name="content"></slot>
            </div>
            <div  v-if="popType == 'promotional'" class="popover-footer">
                <span class="btn" @click="close">我知道了</span>
            </div>
        </div>
        <div class="mask" @click="close('mask')"></div>
    </div>
</template>

<script>

export default {
  data () {
    return {
      number: 0
    }
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    popType: {
      type: String,
      default: 'add'
    },
    isAnim: {
      type: Boolean,
      default: false
    },
    isUnPass: {
      type: Boolean,
      default: false
    },
    className: {
      type: String,
      default: ''
    },
    promotionalList: {
      type: Array,
      default: []
    }
  },
  methods: {
    close (val) {
      if (val === 'mask' && this.isUnPass) return
      this.$emit('closeModal')
    }
  }
}
</script>

<style lang="less">
@keyframes showPopover {
  0% {
    transform: scale(0.7);
    -webkit-transform: scale(0.7);
  }
  45% {
    transform: scale(1.05);
    -webkit-transform: scale(1.05);
  }
  80% {
    transform: scale(0.95);
    -webkit-transform: scale(0.95);
  }
  100% {
    transform: scale(1);
    -webkit-transform: scale(1);
  }
}

.popover-wrapper {
  position: fixed;
  z-index: 98;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 0;
  opacity: 0;
  overflow: hidden;
  &.anim {
    transition: opacity  0.3s linear ;
  }
  &.show {
    height: 100%;
    opacity: 1;
    .mask {
      height: 100%;
    }
    &.anim {
      .popover-body {
        animation: showPopover 0.3s;
      }
    }
  }
  .promotional.popover-body {
    .popover-footer {
      color: @light-primary;
    }
  }
  .mask {
    position: fixed;
    z-index: 99;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    height: 0;
  }
  .popover-body {
    position: absolute;
    z-index: 100;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 550rpx;
    font-size: @fs30;
    color: @primary;
    text-align: center;
    border-radius: 20rpx;
    background-color: #fff;
  }
  .popover-header,
  .popover-footer {
    font-size: @fs30;
    text-align: center;
  }
  .popover-header {
    height: 110rpx;
    line-height: 110rpx;
    color: @text;
    border-bottom: 1rpx solid @line;
  }
  .promotional-content {
    overflow: auto;
    padding: 40rpx 0;
    text-align: center;
  }
  
  
  .popover-footer {
    height: 100rpx;
    line-height: 100rpx;
    color: @fcolor;
    border-top: 1rpx solid @line;
    .btn {
      display: inline-block;
      width: calc(50% - 1rpx);
      height: 100%;
      text-align: center;
    }
  }
}
</style>
