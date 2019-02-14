// 云函数入口文件
const cloud = require('wx-server-sdk')
const uuidv1 = require('uuid/v1')

cloud.init()

const appSecret = 'queen-mini'

const getUserInfo = async (userInfo) => {
  const db = cloud.database()
  let user = await db.collection('user').where({
    courseNum: userInfo.nickName
  }).get()
  return user
}

const insertUser = async (userInfo) => {
  const db = cloud.database()
  let user = await db.collection('user').add({
    data: userInfo
  })
  return user
}
// 云函数入口函数
/**
 * params: userInfo : Object<user>  code:string
 * */
exports.main = async (event) => {
  const userInfo = event.currentUser
  const code = event.code
  let user = await getUserInfo(userInfo.nickName)
  if (!user || !user.data.length) {
    user = {
      ...userInfo,
      code: code,
      token: uuidv1()
    }
    await insertUser(user)
  }
  return {token: user.token}
}
