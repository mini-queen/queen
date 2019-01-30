import { USERINFO_GET } from '@/store/types'

const state = {
  userInfo: {}
}

const getters = {
  getUserInfo: state => state.userInfo
}

const mutations = {
  [USERINFO_GET]: (state, payload) => {
    state.userInfo = payload
  }
}

export default {
  state,
  getters,
  mutations
}
