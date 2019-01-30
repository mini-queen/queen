import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import counter from './modules/counter'
import test from './modules/test'
import search from './modules/search'
import user from './modules/user'
import loginFilter from './plugins/loginFilter'
// import rxwx, { Rx } from 'rxjs-wx/RxWX'
Vue.use(Vuex)

// console.log('loginFilter-------------->', loginFilter)

const store = new Vuex.Store({
  modules: {
    counter,
    test,
    search,
    user
  },
  plugins: [
    // 数据持久化
    createPersistedState({
      storage: {
        getItem: key => wx.getStorageSync(key),
        setItem: (key, value) => wx.setStorageSync(key, value),
        removeItem: key => wx.clearStorage()
      }
    }),
    loginFilter
  ]
})

/*
  实验室测试代码-2018-08-30 22:53
//let dispatch = store.dispatch
dispatch.dispatchBase = store.dispatch
let $vuex = new Subject();

//常规数据流
$vuex.map().delay().subscribe({
  next:function next() {
      dispatch.dispatchBase()
  }
})

//监听数据流
$vuex.filter().subscribe({
  next:function next() {
      //TODO 监听处理
  }
})

store.dispatch =  function(){
  if (condition) {
    $vuex.next(args)
  } else {

  }
}
*/

export default store
