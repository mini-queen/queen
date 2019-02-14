import { COURSEINFO_GET } from '@/store/types'
// import { getTestData } from '@/utils/api'
const state = {
  course: ''
}

const getters = {
  courseInfo: state => state.course[0]
}

const actions = {
//   async [COURSEINFO_GET] ({state, commit}) {
//     let result = await getTestData()
//     commit(COURSEINFO_GET, result)
//   }
}

const mutations = {
  [COURSEINFO_GET]: (state, payload) => {
    state.course = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
