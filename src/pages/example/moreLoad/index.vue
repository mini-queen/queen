<template>
  <div>
    <div v-for="(item,index) in number" :key="index">
      <div class="item">
        我是测试文字文字文字文字文字文字文字文字文字文字文字文字
      </div>
    </div>
    <div class="more-wrapper" v-show="hasMore">
      <div>
        <span class="more-text">玩了命的加载中...</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      hasMore: false,
      number: 10
    }
  },
  onReachBottom () {
    this.hasMore = this.number <= 40
    if (this.hasMore) {
      // 模拟请求接口、获取数据、添加数据
      setTimeout(() => {
        this.number += 10
        this.hasMore = false
      }, 1200)
    }
  }
}
</script>

<style lang="less">
.item {
  margin: 30px 0;
  padding: 0 30px;
  &:last-of-type {
    margin-bottom: 0;
  }
}
.more-wrapper {
  text-align: center;
  padding: 30rpx;
  .more-text{
    font-size: @fs30;
    .font-bold();
    vertical-align: middle;
  }
}

</style>
