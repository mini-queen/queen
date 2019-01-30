<template>
  <label class="checkbox-wrapper" role="checkbox" @click="change" :class="{disabled:disabled,'is-checked':!disabled&&model}">
    <div class="checkbox-input">
      <div class="checkbox-inner"></div>
      <input type="checkbox" :value="model"/>
    </div>
    <span class="checkbox-label">
      <slot></slot>
    </span>
  </label>
</template>

<script>
export default {
  name: 'Checkbox',
  data () {
    return {
      model: false
    }
  },
  props: {
    value: {
      type: [Boolean, null],
      default: false
    },
    disabled: {
      type: [Boolean, null]
    }
  },
  watch: {
    value (v) {
      this.model = v
    }
  },
  methods: {
    change (e) {
      if (!this.$props.disabled) {
        this.$emit('changeHandle')
      }
    }
  },
  created () {
    this.model = this.value
  }
}
</script>
<style lang="less">
.checkbox-wrapper {
  display: inline-block;
  margin-right: 20rpx;
  .checkbox-input {
    display: inline-block;
    vertical-align: middle;
    >input {
      display: none;
    }
    .checkbox-inner {
      display: inline-block;
      position: relative;
      border: 1rpx solid @border_gray;
      border-radius: 18rpx;
      box-sizing: border-box;
      width: 36rpx;
      height: 36rpx;
      background-color: @color-white;
      z-index: 1;
      transition: border-color .25s cubic-bezier(.71, -.46, .29, 1.46), background-color .25s cubic-bezier(.71, -.46, .29, 1.46);
      &:after {
        box-sizing: content-box;
        content: "";
        border: 1rpx solid @color-white;
        border-left: 0;
        border-top: 0;
        height: 18rpx;
        left: 12rpx;
        position: absolute;
        top: 4rpx;
        transform: rotate(45deg) scaleY(0);
        width: 9rpx;
        transition: transform .15s cubic-bezier(.71, -.46, .88, .6) .05s;
        transform-origin: center;
      }
    }
  }
  &.is-checked {
    .checkbox-input {
      .checkbox-inner {
        background-color: @border_yellow;
        border-color: @border_yellow;
        &:after {
          transform: rotate(45deg) scaleY(1);
        }
      }
    }
  }
  &.disabled {
    color: #D8D8D8;
    .checkbox-input {
      .checkbox-inner {
        background: #D8D8D8;
        border: 1rpx solid #D8D8D8;
      }
    }
  }
}

</style>
