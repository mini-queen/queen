<template>
  <div class="infobar-wrapper" :class="[classTag]" v-if="isShow">
      <div class="bar-left">
         <span class="tip-text" :class="{'disable':isHideRod}">{{barTip}}</span>
      </div>
      <div class="bar-right" v-if="!isHideBarRight"  @click="clickHandle">
         <div v-if="!isRightInput" class="right-content">
            <span class="bar-text">{{barDesp}}</span>
            <span class="bar-icon icon-arrow_right" v-if="isShowArrow"></span>
            <!-- <span class="bar-icon" :class="[iconString]" v-else></span> -->
            <comCheckbox value="true" v-else/>
         </div>
         <input class="bar-input" type="text" :placeholder="barDesp" @blur="inputHandle" v-else>
      </div>
  </div>
</template>

<script>
import comCheckbox from '@/components/checkbox'
export default {
  name: 'InfoBar',
  data () {
    return {

    }
  },
  props: {
    barTip: {
      type: String,
      default: ''
    },
    barDesp: {
      type: String,
      default: ''
    },
    isShowArrow: {
      type: Boolean,
      default: true
    },
    iconString: {
      type: String,
      default: ''
    },
    classTag: {
      type: String,
      default: ''
    },
    isHideRod: {
      type: Boolean,
      default: false
    },
    isHideBarRight: {
      type: Boolean,
      default: false
    },
    isRightInput: {
      type: Boolean,
      default: false
    },
    isShow: {
      type: Boolean,
      default: true
    }
  },
  components: {
    comCheckbox
  },
  watch: {
    value (v) {

    }
  },
  methods: {
    clickHandle () {
      this.$emit('clickHandle')
    },
    inputHandle (e) {
      this.$emit('inputBar', e.mp.detail.value)
    }
  },
  created () {

  }
}
</script>
<style lang="less">
.infobar-wrapper {
  background: @color-white;
  height: 90rpx;
  padding: 0 30rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .bar-left {
    width: 230rpx;
    .tip-text {
      font-size: @fs34;
      padding-left: 16rpx;
      color: @primary;
      border-left: 5rpx solid @color-black;
      &.disable {
        border-left: 5rpx solid transparent;
      }
    }
  }
  .bar-right {
    .right-content {
      display: flex;
      align-items: center;
      .bar-text {
          font-size: @fs30;
      }
      .bar-icon {
        margin-left: 30rpx;
      }
    }
    .bar-input {
      text-align: right;
    }
  }
}

</style>
