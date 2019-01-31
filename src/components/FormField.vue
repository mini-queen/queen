<template>
  <input
    type="type ? type : 'text'"
    class="input"
    :value="value"
    :disabled="disabled"
    :placeholder="placeholder"
    v-on:focus="onInputFocus"
    v-on:blur="onInputBlur"
  />
</template>

<script type="text/javascript">
  export default {
    name: 'FormField',
    props: {
      name: String,
      type: String,
      value: String,
      placeholder: String,
      disabled: {
        type: String,
        default: false
      }
    },
    methods: {
      onInputFocus: function () {
        this.$emit('onInputFocus', { name: this.$props.name })
      },
      onInputBlur: function ($event) {
        this.$emit('onInputBlur', { name: this.$props.name, value: $event.target.value })
      }
    }
  }
</script>

<style media="screen" scoped>
  .input {
    flex: 1;
    font-size: 30rpx;
  }
</style>
