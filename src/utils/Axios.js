import axios from 'axios'
import { md5 } from '@/utils/md5'
import Cookies from 'js-cookie'
// admin/login -> api/apicloud/admin/login
// /admin/login -> api/apicloud/admin/login
var request;

export default request = (params) => {

  let url = params['url'];

  if (url[0] === '/') {
    url = 'api/' + url
  } else {
    url = 'api/' + url
  }
  params['url'] = url
  let headers = params['headers']
  if (headers === undefined) {
    headers = {}
  }
  headers['nonce'] = uuid()
  headers['Authorization'] = headers['Authorization'] != null ? headers['Authorization'] : getToken()
  headers['timestamp'] = getLocalTime()
  headers['sign'] = calculateSign(headers['nonce'], headers['timestamp'], headers['Authorization'])
  // 'Authorization': 'Basic YXBpY2xvdWQ6ZXIjMWR3Rlc='
  params['headers'] = headers
  console.log(params)
  axios.defaults.timeout =  60000
  return axios(params)
}

function getToken() {
  return 'bearer ' + Cookies.get('SET_ACCESS_TOKEN')
}

function calculateSign(nonce, timestamp, auth) {
  // let str = nonce + "|" + timestamp + "|" + auth + "|";
  let str = nonce + '|' + timestamp + '|' + auth + '|'
  let crtSign = md5(str).toUpperCase()
  // let str = auth + timestamp + nonce
  // let crtSign = md5(str).toLowerCase()
  return crtSign
}

function getLocalTime(nS) {
  let date = nS === undefined ? new Date() : new Date(nS)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hh = date.getHours()
  let mm = date.getMinutes()
  let ss = date.getSeconds()
  hh = hh < 10 ? '0' + hh : hh
  mm = mm < 10 ? '0' + mm : mm
  ss = ss < 10 ? '0' + ss : ss
  month = month < 10 ? '0' + month : month
  day = day < 10 ? '0' + day : day
  date = year + '-' + month + '-' + day + ' ' + hh + ':' + mm + ':' + ss
  return date
}

function getTimeStamp() {
  var date = new Date()
  date.getFullYear()
  return (new Date()).getTime()
}

function uuid() {
  var s = []
  var hexDigits = '0123456789abcdef'
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4'  // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-'

  var uuid = s.join('')
  return uuid
}
