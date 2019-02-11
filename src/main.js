import Vue from 'vue'
import App from './App'
import store from '@/store'
import isLogin from '@/utils/check'

Vue.use(isLogin)
Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$store = store
wx.cloud.init({ traceUser: true })

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/index/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
    // tabBar: {
    //   color: '#9a9a9a',
    //   selectedColor: '#9a9a9a',
    //   backgroundColor: '#ffffff',
    //   borderStyle: '#cccccc',
    //   list: [{
    //     pagePath: 'pages/index/main',
    //     iconPath: '/static/images/home.png',
    //     selectedIconPath: '/static/images/home_selected.png',
    //     text: '首页'
    //   },
    //   {
    //     pagePath: 'pages/category/main',
    //     iconPath: '/static/images/category.png',
    //     selectedIconPath: '/static/images/category_selected.png',
    //     text: '分类'
    //   },
    //   {
    //     pagePath: 'pages/cart/main',
    //     iconPath: '/static/images/cart.png',
    //     selectedIconPath: '/static/images/cart_selected.png',
    //     text: '购物车'
    //   },
    //   {
    //     pagePath: 'pages/me/main',
    //     iconPath: '/static/images/me.png',
    //     selectedIconPath: '/static/images/me_selected.png',
    //     text: '我的'
    //   }
    //   ]
    // }
  }
}
