const pluralize = (time, label) => time + label

export const timeAgo = time => {
  const between = Date.now() / 1000 - Number(time / 1000)
  if (between < 3600) {
    return pluralize(~~(between / 60), '分钟')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), '小时')
  } else {
    return pluralize(~~(between / 86400), '天')
  }
}

export const limitString = (len, cnt) => {
  cnt = String(cnt)
  return cnt.length > len
    ? cnt.substring(0, len) + '...'
    : cnt
}

export const formatMoney = (s, n, float) => {
  n = n > 0 && n <= 20 ? n : 2
  s = parseFloat((s + '').replace(/[^\d.-]/g, '')).toFixed(n) + ''
  let l = s.split('.')[0].split('').reverse()
  let r = float ? '.' + s.split('.')[1] : ''
  let t = ''
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '')
  }
  return t.split('').reverse().join('') + r
}

export const formatNumner = num => {
  let numString = String(num)
  if (num < 1000) {
    numString = formatMoney(num, null, false)
  } else {
    numString = Math.round(Number(num) / 100) / 10 + 'k'
  }
  return numString
}
