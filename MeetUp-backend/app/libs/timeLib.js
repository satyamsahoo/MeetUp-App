const moment = require('moment')
const momenttz = require('moment-timezone')
const timeZone = 'Asia/Calcutta'
let now = () => {
  return moment.utc().format('lll');
}

let getLocalTime = () => {
  return moment().tz(timeZone).format()
}

let convertToLocalTime = (time) => {
  return momenttz.tz(time, timeZone).format('lll')
}

let isBefore = (start , end) =>{
  let startT = convertToLocalTime(start)
  let endT = convertToLocalTime(end)
  return startT.isBefore(endT);
}

module.exports = {
  now: now,
  getLocalTime: getLocalTime,
  convertToLocalTime: convertToLocalTime,
  isBefore : isBefore
}