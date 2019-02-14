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
    let course = await db.collection('course').where({
      courseNum: _.in(courseId)
    }).get()
    if (course && course.data) { course = course.data }
    return course
  } else {
    return []
  }
}

const splitDate = (dataString, separator) => {
  separator = separator || '-'
  return dataString.split(separator)
}
const getFullDate = (fullYear, dataArr) => {
  return `${fullYear}年${dataArr[0]}月${dataArr[1]}`
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
  if (Array.isArray(courses) && courses.length) {
    let applyDeadlineArr, arrivalDateArr, courseDateArr, sureDeadlineArr, courseDateStart, courseDateEnd
    const fullYear = new Date().getFullYear()
    courses.forEach((item) => {
      applyDeadlineArr = splitDate(item.applyDeadline)
      arrivalDateArr = splitDate(item.arrivalDate)
      sureDeadlineArr = splitDate(item.sureDeadline)
      courseDateArr = splitDate(item.courseDate, '~')
      courseDateStart = splitDate(courseDateArr[0])
      courseDateEnd = splitDate(courseDateArr[1])
      item.applyDeadline = getFullDate(fullYear, applyDeadlineArr)
      item.arrivalDate = getFullDate(fullYear, arrivalDateArr)
      item.sureDeadline = getFullDate(fullYear, sureDeadlineArr)
      item.courseDate = `${getFullDate(fullYear, courseDateStart)} ~ ${getFullDate(fullYear, courseDateEnd)}`
    })
  }
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
