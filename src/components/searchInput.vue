<template>
  <a class="search-input-wrap" href="/pages/search/main">
      <span class="icon-search"></span>
      {{placeWord}}
  </a>
</template>

<script>
export default {
  name: 'searchInput',
  props: {
    placeWord: {
      type: String,
      default: '请输入要搜索的内容'
    }
  },
  methods: {
    add () {
      this.$emit('add')
    },
    reduce () {
      this.$emit('reduce')
    }
  }
}
</script>

<style lang="less" scoped>
.search-input-wrap{
    background: #fff;
    border-radius: 10rpx;
    height: 80rpx;
    line-height: 80rpx;
    font-size: @fs26;
    color: @sub;
    font-weight: lighter;
    padding-left: 78rpx;
    width: 100%;
    box-sizing: border-box;
    position: relative;
    .icon-search {
        // background: #000;
        // width: 12px;
        // height: 12px;
        font-size: 40rpx;
        position: absolute;
        top: 20rpx;
        left: 28rpx;
    }
}
</style>
