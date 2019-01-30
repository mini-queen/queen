<template>
    <div class="modal-wrapper" :class="[isShow?'show':'']">
        <div class="modal-body">
            <div class="modal-header">
                <slot name="title"></slot>
            </div>
            <div class="modal-content">
                <div class="operation-wrap">
                    <span class="icon-minus operation-btn" @click="decrease"></span>
                    <input class="argument" type="number" v-model="number" @blur="changeVal(number)"/>
                    <span class="icon-add operation-btn" @click="increase"></span>
                </div>
            </div>
            <div class="modal-footer">
                <span class="btn" @click="close">取消</span>
                <span class="btn btn-primary" @click="submit">确定</span>
            </div>
        </div>
        <div class="mask" @click="close"></div>
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
    num: {
      type: Number,
      default: 0
    }
  },
  watch: {
    num (v) {
      this.number = v
    },
    number (v) {
      this.number = v < 0 ? 0 : v
    }
  },
  methods: {
    increase () {
      this.number++
      console.log(this.number)
    },
    decrease () {
      if (this.number > 0) {
        this.number--
      }
    },
    changeVal (v) {
      const val = isNaN(v * 1) ? 0 : v
      // 输入值非法则不做任何变更
      this.number = val || this.num
    },
    close () {
      this.number = this.num
      this.$emit('closeModal')
    },
    submit () {
      this.$emit('submit', this.number)
    }
  }
}
</script>

<style lang="less">
  .modal-wrapper {
    position: fixed;
    z-index: 98;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: none;
    // max-height: 0;
    // transform: rotate3d(1,0,0,-90deg);
    // transition: all .3s ease-in-out;
    // transform-origin: 50% 0%;
    &.show {
      display: block;
      // max-height: 100%;
    //   transform: rotate3d(0,0,0,0deg);
    }
    .mask {
        position: fixed;
        z-index: 99;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.5);
    }
    .modal-body {
        position: absolute;
        z-index: 100;
        top: calc( 50% - 100px);
        left: calc(50% - 275rpx);
        width: 550rpx;
        font-size: @fs30;
        color: @primary;
        text-align: center;
        border-radius: 20rpx;
        background-color: #fff;
    }
    .modal-header,
    .modal-footer {
      // height: 110rpx;
      // line-height: 110rpx;
      font-size: @fs30;
      text-align: center;
    }
    .modal-header {
      height: 110rpx;
      line-height: 110rpx;
      color: @color_text_333;
      border-bottom: 1rpx solid @color_lin;
    }
    .modal-content {
        overflow: auto;
        padding: 40rpx;
        .operation-wrap {
            font-size: 22px;
            color: @primary;
            .argument {
                display:inline-block;
                margin: 0 20rpx;
                width: 80rpx;
                height: 60rpx;
                line-height:60rpx;
                font-size: @fs30;
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
        }
    }
    .modal-footer {
      height: 100rpx;
      line-height: 100rpx;
      color: @color_text_666;
      border-top: 1rpx solid @color_lin;
      .btn {
          display: inline-block;
          width: calc(50% - 1rpx);
          height: 100%;
          text-align: center;
      }
      .btn-primary {
          border-left: 2rpx solid @color_lin;
          color: @color_main_100;
      }
    }
  }
</style>
