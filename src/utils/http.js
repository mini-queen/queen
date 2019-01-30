import store from '../store'
// import config from '@/constants/config'
let Fly = require('flyio/dist/npm/wx')
const request = new Fly()

request.config.timeout = 5 * 1000
request.config.baseURL = `http://${process.env.API_HOST}/mpapi`
request.interceptors.request.use((request) => {
  store.getters.getUserInfo.token && (request.headers['Authorization'] = `Bearer ${store.getters.getUserInfo.token}`)
  wx.showLoading({ title: '加载中..' })
  return request
})

request.interceptors.response.use(
  (response, promise) => {
    wx.hideLoading()
    // 更新token
    if ((response.data.code === 200) && (response.data.data && response.data.data.token && store.getters.getUserInfo.token)) {
      if (response.data.data.token !== store.getters.getUserInfo.token) {
        store.commit('USERINFO_GET', Object.assign(
          store.getters.getUserInfo,
          {token: response.data.data.token}
        ))
      }
    }
    return promise.resolve(response.data)
  },
  (err, promise) => {
    wx.hideLoading()
    wx.showToast({
      title: err.message,
      icon: 'none',
      duration: 1000
    })
    return promise.resolve()
  }
)

/*
    @purpose check wx http status
    @createTime 2018-08-23 14:17
    @author miles_fk
    @info
      这拿到的是业务层的数据结构不是,http原始的数据结构
*/
function checkStatus (response) {
  if (response.code >= 200 && response.code < 300) {
    return response
  } else {
    wx.showToast({
      title: response.msg,
      icon: 'none',
      duration: 1000
    })
    const error = new Error(response.msg)
    throw error
  }
}

/*
    @purpose transform  response string  to response json
    @createTime 2018-08-23 14:17
    @author miles_fk
*/
// function parseJSON (response) {
//   return response.json()
// }

/*
    @purpose fetch data by Promise
    @createTime 2018-08-23 14:17
    @author flyfox & miles_fk
    @info
      小程序不需要 ---> .then(parseJSON)
*/
export default function fetch (url, params = {}, method = 'post') {
  return new Promise((resolve, reject) => {
    request[method](url, params)
      .then(checkStatus)
      .then(response => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
