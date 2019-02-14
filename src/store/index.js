import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import course from './modules/course'
import loginFilter from './plugins/loginFilter'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    course
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

export default store
