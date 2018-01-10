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
