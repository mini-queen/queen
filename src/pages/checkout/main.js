import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    'navigationBarBackgroundColor': '#ffffff',
    'navigationBarTextStyle': 'black',
    'navigationBarTitleText': '订单确认',
    'backgroundColor': '#eeeeee',
    'backgroundTextStyle': 'light'
  }
}
