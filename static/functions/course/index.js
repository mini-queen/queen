// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const getRequirId0Course = (totalScore, singleScoreArr, isSubmit) => {
  let courseId = null
  if (totalScore === 5.5) {
    singleScoreArr.sort((a, b) => { return Number(b) - Number(a) })
    singleScoreArr.push('4.99')
    if (singleScoreArr.indexOf('4.99') === 4) {
      courseId = isSubmit ? ['1'] : ['2']
    }
  }
  if (totalScore === 6.0) {
    singleScoreArr.push('4.99')
    singleScoreArr.push('5.49')
    singleScoreArr.sort((a, b) => { return Number(b) - Number(a) })
    if (singleScoreArr.indexOf('5.49') >= 3 && singleScoreArr.indexOf('4.99') === 5) {
      courseId = isSubmit ? ['3'] : ['4']
    }
    if (singleScoreArr.indexOf('5.49') === 4 && isSubmit) {
      courseId = ['1', '3']
    }
  }
  if (totalScore === 6.5) {
    singleScoreArr.push('5.49')
    singleScoreArr.sort((a, b) => { return Number(b) - Number(a) })
    if (singleScoreArr.indexOf('5.49') === 4) {
      courseId = ['5']
    }
  }
  return courseId
}

const getRequirId1Course = (totalScore, singleScoreArr, isSubmit) => {
  let courseId = null
  if (totalScore === 5.0) {
    singleScoreArr.push('4.99')
    singleScoreArr.sort((a, b) => { return Number(b) - Number(a) })
    if (singleScoreArr.indexOf('4.99') === 4) {
      courseId = isSubmit ? ['1'] : ['2']
    }
  }
  if (totalScore === 5.5) {
    singleScoreArr.push('4.99')
    singleScoreArr.sort((a, b) => { return Number(b) - Number(a) })
    if (singleScoreArr.indexOf('4.99') === 4) {
      courseId = isSubmit ? ['3'] : ['4']
    }
  }
  if (totalScore === 6.0) {
    singleScoreArr.push('5.49')
    singleScoreArr.sort((a, b) => { return Number(b) - Number(a) })
    if (singleScoreArr.indexOf('5.49') === 4) {
      courseId = ['5']
    }
  }
  return courseId
}
const getRequirId2Course = (totalScore, singleScoreArr, isSubmit) => {
  let courseId = null
  if (totalScore === 5.5) {
    singleScoreArr.push('5.49')
    singleScoreArr.sort((a, b) => { return Number(b) - Number(a) })
    if (singleScoreArr.indexOf('5.49') === 4 && !isSubmit) {
      courseId = ['2']
    }
  }
  if (totalScore === 6.0) {
    singleScoreArr.push('5.99')
    singleScoreArr.push('5.49')
    singleScoreArr.sort((a, b) => { return Number(b) - Number(a) })
    if (singleScoreArr.indexOf('5.99') >= 3 && singleScoreArr.indexOf('5.49') === 5 && !isSubmit) {
      courseId = ['4']
    }
  }
  if (totalScore === 6.5) {
    singleScoreArr.push('5.99')
    singleScoreArr.sort((a, b) => { return Number(b) - Number(a) })
    if (singleScoreArr.indexOf('5.99') === 4) {
      courseId = ['5']
    }
  }
  return courseId
}

const getCourse = async (courseId) => {
  if (courseId) {
    const db = cloud.database()
    const _ = db.command
    const course = await db.collection('course').where({
      courseNum: _.in(courseId)
    }).get()
    return course
  } else {
    return []
  }
}
// 云函数入口函数

/**
 * params : totalScore,listeningScore,readingScore,writingScore,speakingScore,isSubmit
 * return : courses : array 课程信息
 * */
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const requireId = event.requireId
  const totalScore = Number(event.totalScore)
  const singleScoreArr = [
    event.listeningScore,
    event.readingScore,
    event.writingScore,
    event.speakingScore]
  const isSubmit = event.isSubmit
  let courseId, courses
  switch (Number(requireId)) {
    case 0:
      courseId = getRequirId0Course(totalScore, singleScoreArr, isSubmit)
      break
    case 1:
      courseId = getRequirId1Course(totalScore, singleScoreArr, isSubmit)
      break
    case 2:
      courseId = getRequirId2Course(totalScore, singleScoreArr, isSubmit)
      break
  }
  courses = await getCourse(courseId)
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
    context: context,
    courses: courses
    // params: {totalScore, singleScoreArr, isSubmit, courseId}
  }
}
