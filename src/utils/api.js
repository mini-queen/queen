import fetch from './http'

export async function getTestData () {
  let result = await fetch('yWKj3U86390d5207ac80b2bc92aed3e38d447955aba1c82?uri=test', null, 'get')
  return result.data[0].msg
}

export async function getFakeDataForIndex () {
  // let result = await fetch('/home.json', null, 'get')
  let result = await fetch('/home/index', null, 'get')
  // console.log('getFakeDataForIndex----------inner---------------->', result)
  return result.data
}

export async function getCode (data) {
  // let mockApiUrl = '/mock/trueExam.do?id=153559236776812000008'
  console.log('getCode-------par-----------data-------->', data)
  let getCodeApiUrl = `/user/code/${data.phoneNumber}`
  let result = await fetch(getCodeApiUrl, {}, 'get')
  console.log('getCode', result)
  return result.data
}

export async function login (par) {
  // let mockApiUrl = '/mock/trueExam.do?id=153553823413712000011'
  let loginApiUrl = '/user/login'
  let result = await fetch(loginApiUrl, par, 'post')
  console.log('login', result)
  return result.data
}

export async function searchWord () {
  let result = await fetch('/mock/trueExam.do?id=153559569487812000015', null, 'get')
  console.log('searchWord', result)
  return result.data
}

export async function search (data) {
  let result = await fetch('/mock/trueExam.do?id=153559602897512000016', data, 'get')
  console.log('searchWord', result)
  return result.data
}
// 商品详情
export async function getProductDetail (id) {
  // let result = await fetch('/home.json', null, 'get')
  let result = await fetch(`/goods/detail/${id}`, null, 'get')
  // console.log('getFakeDataForIndex----------inner---------------->', result)
  return result.data
}
