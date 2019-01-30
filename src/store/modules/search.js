import { SEARCH_HISTORY } from '@/store/types'
const state = {
  history: ['地暖管', '地暖瓷砖', '电暖垫片', '电暖垫片', '电暖垫片']
}

const getters = {
  searchHistory: state => state.history
}

const actions = {
  [SEARCH_HISTORY] ({state, commit}) {
    commit(SEARCH_HISTORY)
  }
}

const mutations = {
  [SEARCH_HISTORY]: (state, res) => {
    state.history = res
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
