<template>
  <div class="container" @click="clickHandle('分类 click', $event)">
    <div class="top">
        <search-input></search-input>      
    </div>
    <div class="bottom">
        <div class="side-nav"><sidebar :menus="menus"></sidebar></div>
        <div class="list-wrap">
          <div class="swiper"><swiper-components :img-urls="imgUrls"></swiper-components> </div>
          <item
              :mark="'category'"
              :market="market"
              @openModal="showModal"
              @add="add" @reduce="reduce"
              :direction="'horizontally'"></item>
        </div>
    </div>
    <!-- 动画元素 -->
    <p v-show="animal.isShow" :style="animal.style" class="animal-box" :class="{animated: animal.isShow}">
        <img :src="animal.url" />
    </p>
    <!-- <div v-if="cart.num">
        <span> 购物车：</span>
        <span> 数量：{{cart.num}}</span>
        <span> 价格：{{cart.total}}</span>
        <p v-for="(n, i) in cart.list" :key="i">{{n.explain}}*{{n.num}}</p>
    </div> -->
    <!-- <item :market="market" @add="add" @reduce="reduce" :direction="'horizontally'"></item> -->
    <popover @closeModal="closeModal" :isShow="is_show" :num="current.num || 0" @submit="changeCart" popType="add" :isAnim="false">
      <span slot="title">请输入购买数量</span>
    </popover>
    <!--<popWindow @closeModal="closeModal" :isShow="is_show" :num="current.num || 0" @submit="changeCart">
        <span slot="title">请输入购买数量</span>
    </popWindow>-->
  </div>
</template>

<script>
import popWindow from '@/components/popWindow'
import popover from '@/components/popover'
import searchInput from '@/components/searchInput'
import swiperComponents from '@/components/swiperComponent'
import item from '@/components/item'
import sidebar from '@/components/sidebar'
import Animal from '@/utils/animal'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
    //   num: 0,
      current: {},
      is_show: false,
      animal: {
        isShow: false,
        url: '',
        style: '',
        startPos: {},
        endPos: {}
      },
      menus: [
        {
          id: 1,
          url: '',
          label: '辅材',
          isActive: true,
          subnavs: []
        },
        {
          id: 2,
          url: '',
          label: '地暖',
          isActive: false,
          subnavs: [
            {
              id: 3,
              url: '',
              label: '主管1',
              isActive: false
            },
            {
              id: 4,
              url: '',
              label: '主管2',
              isActive: false
            }
          ]
        },
        {
          id: 5,
          url: '',
          label: '新风',
          isActive: false,
          subnavs: [
            {
              id: 6,
              url: '',
              label: '鼓风机',
              isActive: false
            }
          ]
        }
      ],
      userInfo: {},
      market: [],
      // cart: {
      //   // num: 0,
      //   // total: 0,
      //   // list: []
      // },
      imgUrls: []
    }
  },
  computed: {
    ...mapGetters({
      test: 'getTest'
    })
  },
  components: {
    popover, popWindow, searchInput, item, sidebar, swiperComponents
  },
  beforeMount () {
    this.getMarket()
    this.getBanner()
    this.screenSize()
  },
  methods: {
    screenSize: function () {
      const that = this
      wx.getSystemInfo({
        success: function (res) {
          var ww = res.windowWidth
          var hh = res.windowHeight
          that.animal.endPos['x'] = ww / 9 * 5.5
          that.animal.endPos['y'] = hh
          console.log(`屏幕宽度：${ww}, 屏幕高度：${hh}`)
          console.log(`终点坐标：{x: ${that.animal.endPos['x']}, y: ${that.animal.endPos['y']}}`)
        }
      })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    },
    getRect (node) {
      wx.createSelectorQuery().select(node).boundingClientRect((rect) => {
        this.animal.startPos['x'] = rect.left
        this.animal.startPos['y'] = rect.top
        // console.log('节点：', rect, node)
        this.animal.style = 'left: ' + rect.left + 'px; top: ' + rect.top + 'px;'
      }).exec()
    },
    add (obj) {
      const { n, mark } = obj
      this.getRect(`#${mark}_img${n.id}`)
      this.animal.url = n.src
      this.startAnimation()

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
    reduce (n) {
      // let { num = 0, total = 0, list = [] } = this.cart
      // if (num < 2) {
      //   list = []
      //   num = 0
      //   total = 0
      //   n.num--
      // } else {
      //   list = list.filter(item => {
      //     if (item.id === n.id) {
      //       item.num--
      //     }
      //     return item.num
      //   })
      //   num--
      //   total -= n.price
      // }
      // this.cart = {
      //   num, total, list
      // }
      n.num--
    },
    getMarket () {
      const list = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((el, i) => {
        return {
          id: el,
          tips: i % 2 ? ['满返', '热销中'] : ['秒杀', '热销中'],
          explain: `${i % 2 ? '地暖管地暖管地暖管地暖管' : '净水器'}-${el}`,
          src: i % 2 ? 'http://publish.kuchuan.com/activity/header/item4.png' : 'http://publish.kuchuan.com/activity/header/item2.png',
          price: i % 2 ? 40 : 50,
          num: 0
        }
      })
      this.market = list
    },
    getBanner () {
      setTimeout(() => {
        this.imgUrls = [
          {
            url: 'http://m.afander.com/index/img/2ecbeeaf.banner_new.png'
          },
          {
            url: 'http://m.afander.com/index/img/2ecbeeaf.banner_new.png'
          },
          {
            url: 'http://m.afander.com/index/img/2ecbeeaf.banner_new.png'
          }
        ]
      }, 2000)
    },
    startAnimation () {
      const that = this
      const { startPos = {}, endPos = {} } = this.animal
      const cf = 60 // 总共帧数
      let nf = 0 // 当前帧数
      let time = 1000 / 60 // 每帧用时
      let sid = setInterval(function () {
        that.animal.isShow = true
        if (nf > cf) {
          clearInterval(sid)
          that.animal.isShow = false
        } else {
          let curpos = Animal.parabolicMotion(startPos, endPos, cf, nf)
          that.animal.style = 'left: ' + curpos.x + 'px; top: ' + curpos.y + 'px; opacity: ' + (nf > 30 ? (1.2 - nf / cf) : 1)
          //   console.log('style', startPos)
          nf = nf + 1
        }
      }, time)
    },
    closeModal () {
      this.is_show = false
    },
    showModal (item) {
      this.current = { ...item }
      console.log('current', this.current)
      this.is_show = true
    },
    // increase () {
    //   this.num++
    //   console.log(this.num)
    // },
    // decrease () {
    //   this.num--
    // },
    changeCart (numebr) {
      const { id } = this.current
      this.current.num = numebr
      this.market.forEach((el, index) => {
        if (el.id === id) {
          el.num = numebr
        }
      })
      this.closeModal()
    }
  }
}
</script>

<style lang="less" scope>
// @import url("~@/styles/index.less");
.container {
  // 示例用法
  padding: 0;
  display: flex;
  color: @color-red;
  height: 100vh;
  justify-content: flex-start;
  background-color:#f3f3f3;
//   .font-bold;
  .top {
      box-sizing: border-box;
      padding: 20rpx 30rpx;
      width: 100%;
      background-color: #fff;
      .search-input-wrap {
        background-color: @color_lin;
      }
  }
  .bottom {
        width: 100%;
        display: flex;
        flex: 1;
        flex-flow:row;
        border-top: 1rpx solid #eee;
        // background-color: transparent;
        .side-nav {
            // padding: 40rpx 0;
            width: 200rpx;
            font-size: @fs30;
            color: @color_text_333;
            background: #fff;
        }
        .list-wrap {
            flex:1;
            // background-color: #fff;
            overflow: auto;
            .swiper {
              padding: 20rpx 20rpx 0;
            }
            .item-wrap {
              // width: calc(100% - 40rpx);
              padding: 20rpx 20rpx 0rpx;
              overflow-x:hidden;
            }
        }
  }
  .animal-box {
    position: fixed;
    z-index: 1;
    width: 70px;
    height: 70px;
    border-radius: 2px;
    &.animated {
        width: 20px;
        height: 20px;
        // transition: width .5s linear 0s,height .5s linear 0s;
    }
    img {
        width: 100%;
        height: 100%;
    }
  }
}
</style>
