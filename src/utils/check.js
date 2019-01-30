import store from '../store'
let isLogin = () => {
  try {
    let token = store.getters.getUserInfo.token // store.state.user.userInfo.token
    if (token) {
      return true
    } else {
      return false
    }
  } catch (e) {
    console.log(e)
    return false
  }
}

export default {
  install: function (Vue, name = '$isLogin') {
    Object.defineProperty(Vue.prototype, name, { value: isLogin })
  }
}
