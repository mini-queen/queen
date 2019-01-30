<template>
    <ul class="list-group">
        <li v-for="(n, index) in menus" :key="index" :class="{active: n.isActive && !n.subnavs.length, spread: n.isActive && n.subnavs.length}" class="list-group-item" >
            <span @click="n.subnavs.length ? doSpread($event, n) : toSearch($event, n)" class="list-group-text">{{n.label}}</span>
            <span class="icon-triangle_open open-right" v-if="n.subnavs.length" @click="doSpread($event, n)"></span>
            <ul v-if="n.subnavs.length && n.isActive" class="list-group">
                <li v-for="(s, i) in n.subnavs" :key="i" :class="{active: s.isActive}" class="list-group-item">
                    <span @click="toSearch($event, s)" class="list-group-text">
                        {{s.label}}
                    </span>
                </li>
            </ul>
        </li>
    </ul>
</template>

<script>
export default {
  name: 'sidebar',
  props: ['menus'],
  methods: {
    //   展开收起菜单
    doSpread (e, item) {
    //   this.menus.forEach(el => {
    //     if (el.id === item.id) {
    //       el.isActive = !el.isActive
    //     } else if (el.subnavs.length) {
    //       el.isActive = false
    //     }
    //   })
      item.isActive = !item.isActive
    },
    toSearch (e, item) {
      this.menus.forEach(el => {
        if (!el.subnavs.length) {
          el.isActive = false
        } else {
          for (let i = 0; i < el.subnavs.length; i++) {
            const sub = el.subnavs[i]
            sub.isActive = false
          }
        }
      })
      item.isActive = true
      console.log('toSearch', item)
    }
  }
}
</script>

<style lang="less" scope>

.list-group-item {
    position: relative;
    background-color: transparent;
    color: @color_text_333;
    // border-left: 8rpx solid transparent;
    &.active {
        border-left: 8rpx solid @color_main_100;
        color: @color_main_100;
    }
    >.list-group-text {
        border-bottom: 1rpx solid #f3f3f3;
    }
    .open-right {
        position: absolute;
        top:38rpx;
        right:26rpx;
        font-size:12rpx;
        transform: rotate(-90deg);
        transition: all .2s ease-in-out;
    }
    &.spread {
        .open-right {
            transform: rotate(0deg);
        }
    }
    .list-group-text {
        display: inline-block;
        box-sizing: border-box;
        // padding: 0 10px;
        width: 100%;
        height: 88rpx;
        line-height: 88rpx;
        text-align: center;
        color: inherit;
    }
    .list-group-item {
        padding-left: 10px;
        background-color: #f3f3f3;
    }
}
</style>
