// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const authToken = async (token) => {
  const db = cloud.database()
  let user = await db.collection('user').where({
    token: token
  }).get()
  return !!user && !!user.data.length
}

// 云函数入口函数
/**
 * params: token : string
 * */
exports.main = async (event) => {
  const token = event.token
  const result = await authToken(token)
  return { authResult: result }
}
