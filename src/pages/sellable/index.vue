<template>
  <div class="container">
    <!-- nav -->
    <div class="nav-wrap">
        <ul class="nav-list">
            <li
                v-for="(n,i) in navs"
                :key="i"
                :class="{active: n.isChecked }"
                @click="changeCategory(n)"
                class="nav-item">{{n.name}}</li>
        </ul>
    </div>
    <!-- list -->
    <div class="list-wrap">
        <item
          :mark="'sellable'"
          :market="market"
          @add="add"></item>
    </div>
    <!-- 动画元素
    <p v-show="animal.isShow" :style="animal.style" class="animal-box" :class="{animated: animal.isShow}">
        <img :src="animal.url" />
    </p> -->
  </div>
</template>
<script>
import item from '@/components/item'
// import Animal from '@/utils/animal'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      // animal: {
      //   isShow: false,
      //   url: 'http://publish.kuchuan.com/activity/header/item2.png',
      //   style: '',
      //   startPos: {},
      //   endPos: {}
      // },
      navs: [],
      market: []
      // cart: {
      //   // num: 0,
      //   // total: 0,
      //   // list: []
      // }
    }
  },
  computed: {
    ...mapGetters({
      test: 'getTest'
    })
  },
  components: {
    item
  },
  // beforeMount () {
  //   // this.screenSize()
  // },
  mounted () {
    wx.setNavigationBarTitle({
      title: '地暖管'
    })
    this.getMarket()
    this.getNavs()
  },
  methods: {
    getNavs () {
      const list = ['地暖管', '分水器', '温控器', '阀门', '铜件', '新风', '进水', '工具'].map((el, i) => {
        return {
          id: i + 1,
          name: el,
          isChecked: i === 0
        }
      })
      this.navs = list
    },
    changeCategory (item) {
      this.navs.forEach(el => {
        if (el.id === item.id) {
          el.isChecked = true
          wx.setNavigationBarTitle({
            title: el.name
          })
        } else {
          el.isChecked = false
        }
      })
    },
    // screenSize: function () {
    //   const that = this
    //   wx.getSystemInfo({
    //     success: function (res) {
    //       var ww = res.windowWidth
    //       var hh = res.windowHeight
    //       that.animal.endPos['x'] = ww / 9 * 5.5
    //       that.animal.endPos['y'] = hh
    //       // console.log(`屏幕宽度：${ww}, 屏幕高度：${hh}`)
    //       // console.log(`终点坐标：{x: ${that.animal.endPos['x']}, y: ${that.animal.endPos['y']}}`)
    //     }
    //   })
    // },
    // getRect (node) {
    //   wx.createSelectorQuery().select(node).boundingClientRect((rect) => {
    //     this.animal.startPos['x'] = rect.left
    //     this.animal.startPos['y'] = rect.top
    //     console.log('startPos', this.animal.startPos)
    //     this.animal.style = 'left: ' + rect.left + 'px; top: ' + rect.top + 'px;'
    //   }).exec()
    // },
    add (obj) {
      const { n } = obj
      // const { n, mark } = obj
      // 动画相关
      // this.getRect(`#${mark}_img${n.id}`)
      // this.animal.url = n.src
      // this.startAnimation()
      // 数值变化
      n.num++
      // let { num = 0, total = 0, list = [] } = this.cart
      // if (!num) {
      //   n.num++
      //   list.push(n)
      //   num = 1
      //   total = n.price
      // } else {
      //   const arr = list.filter(item => item.id === n.id)
      //   if (!arr.length) {
      //     list.push(n)
      //     n.num++
      //   } else {
      //     list.forEach((el, i) => {
      //       if (el.id === n.id) {
      //         el.num++
      //       }
      //     })
      //   }
      //   num++
      //   total += n.price
      // }
      // this.cart = {
      //   num, total, list
      // }
    },
    // reduce (n) {
    //   let { num = 0, total = 0, list = [] } = this.cart
    //   if (num < 2) {
    //     list = []
    //     num = 0
    //     total = 0
    //     n.num--
    //   } else {
    //     list = list.filter(item => {
    //       if (item.id === n.id) {
    //         item.num--
    //       }
    //       return item.num
    //     })
    //     num--
    //     total -= n.price
    //   }
    //   this.cart = {
    //     num, total, list
    //   }
    //   //   n.num--
    // },
    // startAnimation () {
    //   const that = this
    //   const { startPos = {}, endPos = {} } = this.animal
    //   const cf = 60 // 总共帧数
    //   let nf = 0 // 当前帧数
    //   let time = 1000 / 60 // 每帧用时
    //   let sid = setInterval(function () {
    //     that.animal.isShow = true
    //     if (nf > cf) {
    //       clearInterval(sid)
    //       that.animal.isShow = false
    //     } else {
    //       let curpos = Animal.parabolicMotion(startPos, endPos, cf, nf)
    //       that.animal.style = 'left: ' + curpos.x + 'px; top: ' + curpos.y + 'px;'
    //       // console.log('style', that.animal.style)
    //       nf = nf + 1
    //     }
    //   }, time)
    // },
    getMarket () {
      const list = [1, 2, 3, 4, 5, 6, 7].map((el, i) => {
        return {
          id: el,
          // tips: i % 2 ? ['满返', '热销中'] : ['秒杀', '热销中'],
          explain: `${i % 2 ? '地暖管地暖管地暖管地暖管地暖管' : '净水器'}-${el}`,
          src: i % 2 ? 'http://publish.kuchuan.com/activity/header/item4.png' : 'http://publish.kuchuan.com/activity/header/item2.png',
          price: i % 2 ? 40 : 50,
          num: 0
        }
      })
      this.market = list
    }
  }
}
</script>

<style lang="less" scoped>
.container {
    padding: 0;
    min-height: 100vh;
    background-color: @color_mainbg;
    .nav-wrap {
        box-sizing: border-box;
        padding: 0 30rpx;
        width: 100%;
        background-color: #fff;
        .nav-list {
            width: 100%;
            text-align: center;
            font-size: @fs30;
            color: @color_text_999;
            border-top: 1px solid #f9f9f9;
            overflow-x: auto;
            white-space:nowrap;
            .nav-item {
                display: inline-block;
                padding: 0 30rpx;
                height: 96rpx;
                line-height: 96rpx;
                &.active {
                    color: @light-primary;
                    border-bottom: 2px solid @light-primary;
                }
            }
        }
    }
    .list-wrap {
        flex: 1;
        height:calc(100vh - 102rpx);
        overflow: auto;
    }
  .animal-box {
    position: fixed;
    z-index: 1;
    width: 100px;
    height: 100px;
    border-radius: 2px;
    &.animated {
        width: 20px;
        height: 20px;
        transition: width .5s linear 0s,height .5s linear 0s;
    }
    img {
        width: 100%;
        height: 100%;
    }
  }
}

</style>
