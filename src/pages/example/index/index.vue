<template>
  <div class="container" @click="clickHandle('test click', $event)">
    <toast message="我是toast" :visible.sync="visible"></toast>
    <div class="userinfo">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <div class="userinfo-nickname">
        {{userInfo.nickName}}
      </div>
    </div>
    <div class="tac h1 my-20">这里是图标</div>
    <div>
      <!--  home-->
      <span class="icon-home_details"></span>
      <!--  关于-->
      <span class="icon-about"></span>
      <!-- 收货地址-->
      <span class="icon-address"></span>
      <!--  收藏-->
      <span class="icon-collect"></span>
      <!--  退换-->
      <span class="icon-exchange"></span>
      <!--  资产-->
      <span class="icon-fund"></span>
      <!--  待评价-->
      <span class="icon-will_comment"></span>
      <!--  待收货-->
      <span class="icon-will_delivery"></span>
      <!--  待支付-->
      <span class="icon-will_pay"></span>
      <!--  添加-->
      <span class="icon-add"></span>
      <!--  购物车-->
      <span class="icon-cart">
        <span class="path1"></span>
        <span class="path2"></span>
        <span class="path3"></span>
        <span class="path4"></span>
      </span>

      <br/>
      <!--  选中-->
      <span class="icon-checked"></span>
      <!--  删除-->
      <span class="icon-delete"></span>
      <!--  减少-->
      <span class="icon-minus"></span>
      <!--  未选中-->
      <span class="icon-unchecked"></span>
      <!--  编辑地址-->
      <span class="icon-addr_edit"></span>
      <!-- 返回箭头-->
      <span class="icon-arrow_back"></span>
      <!--  分享-->
      <span class="icon-share"></span>
      <!--  排序三角-->
      <span class="icon-triangle_order"></span>
      <!--  删除地址-->
      <span class="icon-addr_del"></span>
      <!--  搜索-->
      <span class="icon-search"></span>
      <!--  右箭头-->
      <span class="icon-arrow_right"></span>
      <!--  展开三角-->
      <span class="icon-triangle_open"></span>

    </div>
    <div>
      这里是checkbox
    </div>
    <div>
      <comCheckbox :value="checkbox1">选项1</comCheckbox>
      <comCheckbox :value="checkbox2" :disabled="true">选项2</comCheckbox>
    </div>
    <form class="form-container">
      <input type="text" class="form-control" v-model="motto" placeholder="v-model" />
      <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy" />
    </form>
    <a href="/pages/example/moreLoad/main" class="counter">去往加载更多示例页面</a>
    <a href="/pages/example/leftDelete/main" class="counter">去往左滑页面</a>
    <a href="/pages/example/video/main" class="counter">录制视频</a>
    <div class="counter" @click="goToTest">去往Vuex示例页面</div>
    <add :num="num" @add="add" @reduce="reduce"></add>
    <button @click="showToast">toast</button><button @click="showModal">modal</button>
    <comModal @closeModal="closeModal" :isShow="is_show">
      <span slot="title">我是标题</span>
      <div slot="content">
          我是内容
      </div>
    </comModal>

    <swiper-components :img-urls="imgUrls"></swiper-components>


    <div style="width:300px;margin:0 auto">
      <search-input></search-input>
    </div>

      <div style="width:200px;margin:0 auto">
        <search-input :place-word='"全球精选"'></search-input>
      </div>

  </div>
</template>

<script>
import add from '@/components/add'
import toast from '@/components/toast'
import comModal from '@/components/modal'
import comCheckbox from '@/components/checkbox'
import swiperComponents from '@/components/swiperComponent'
import searchInput from '@/components/searchInput'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      num: 0,
      motto: 'Hello World',
      visible: false,
      is_show: false,
      checkbox1: true,
      checkbox2: false,
      imgUrls: []
    }
  },
  computed: {
    ...mapGetters({
      test: 'getTest',
      userInfo: 'getUserInfo'
    })
  },
  components: {
    add, toast, comModal, comCheckbox, swiperComponents, searchInput

  },
  methods: {

    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              console.log('授权成功！！')
              this.userInfo = res.userInfo
            },
            fail: () => {
              wx.showModal({
                title: '警告',
                content: '尚未进行授权，请点击确定跳转到授权页面进行授权。',
                success: function (res) {
                  if (res.confirm) {
                    wx.navigateTo({
                      url: '/pages/example/authorize/main'
                    })
                    console.log('用户点击确定')
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
            }
          })
        }
      })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    },
    goToTest () {
      wx.navigateTo({
        url: '/pages/example/counter/main'
      })
    },
    showToast () {
      console.log(this.visible)
      this.visible = !this.visible
    },
    closeModal () {
      this.is_show = false
    },
    showModal () {
      this.is_show = true
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
    add () {
      this.num++
    },
    reduce () {
      this.num--
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    // this.getUserInfo()
    // this.$store.dispatch('TEST_GET')
    this.getBanner()
    // wx.setNavigationBarTitle({
    //   title: this.test
    // })
  },
  mounted () {
    // 调用全局函数isLogin
    if (this.$isLogin()) {
      // 继续进行
    } else {
      // 弹框登录
    }
  }
}
</script>

<style lang="less">
.container {
  // 示例用法
  color: @info;
  .font-bold;
  .userinfo {
    display: flex;
    flex-direction: column;
    align-items: center;
    .userinfo-avatar {
      width: 128rpx;
      height: 128rpx;
      margin: 20rpx;
      border-radius: 50%;
    }

    .userinfo-nickname {
      color: #aaa;
    }
  }


  .usermotto {
    margin-top: 30px;
  }

  .form-control {
    display: block;
    padding: 0 12px;
    margin-bottom: 5px;
    border: 1px solid #ccc;
  }

  .counter {
    display: inline-block;
    margin: 10px auto;
    padding: 5px 10px;
    color: blue;
    border: 1px solid blue;
  }
}

</style>
