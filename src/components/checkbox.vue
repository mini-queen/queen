<template>
  <label class="checkbox-wrapper" role="checkbox" @click="change">
    <div class="checkbox-inner">
      <span :class="[(!disabled&&model)? 'icon-checked':'icon-unchecked']"></span>
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
  .checkbox-inner {
    display: inline-block;
    font-size: 40rpx;
  }
}
</style>
