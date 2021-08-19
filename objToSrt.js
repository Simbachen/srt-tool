function formatDate (fmt, timestamp) {
    const times = timestamp ? new Date(timestamp) : new Date()
    const o = {
      'M+': times.getMonth() + 1, // 月份
      'd+': times.getDate(), // 日
      'h+': times.getHours(), // 小时
      'm+': times.getMinutes(), // 分
      's+': times.getSeconds(), // 秒
      'q+': Math.floor((times.getMonth() + 3) / 3), // 季度
      S: times.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (times.getFullYear() + '').substr(4 - RegExp.$1.length)
      )
    }
    for (const k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ('00' + o[k]).substr(('' + o[k]).length)
        )
      }
    }
    return fmt
  }
  // TO-DO 时间不能超过24小时
  function getTime(time) {
    const start = new Date('2021-01-01').getTime() - 8 * 60 * 60 * 1000
    const a = formatDate('hh:mm:ss', start + parseInt(time))
    let b = formatDate('S', start + parseInt(time))
    if (b < 10) {
      b = `00${b}`
    } else if (b < 100) {
      b=`0${b}`
    }
    return `${a},${b}`
  }
  
  module.exports = function objToSrt(obj, dest) {
    const fs = require('fs')
    
  let r = ''
  obj.forEach((item, index) => {
  r += `${index}
  ${getTime(item.bg)} --> ${getTime(item.ed)}
  ${item.onebest}
  
  `
    });
  
    fs.writeFileSync(dest, r)
  }