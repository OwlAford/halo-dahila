export const initImage = (img, url) => {
  return new Promise((resolve, reject) => {
    if (url) {
      img.src = url
    }
    img.onload = () => {
      resolve()
    }
    img.onerror = error => {
      reject(error)
    }
  })
}

export const JSON2Array = val => {
  let arr = []
  for (let key in val) {
    let item = val[key]
    item.id = key
    arr.push(item)
  }
  return arr
}

export const waiter = time => {
  return new Promise((resolve, reject) => {
    const tempTimer = setTimeout(() => {
      clearTimeout(tempTimer)
      resolve()
    }, time)
  })
}

export const num2even = num => num + num % 2
export const intNum = (num, byte) => num + num % byte

const base64Image2Blob = content => {
  const parts = content.split(';base64,')
  const contentType = parts[0].split(':')[1]
  const raw = window.atob(parts[1])
  const rawLength = raw.length
  const uInt8Array = new Uint8Array(rawLength)
  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i)
  }
  return new Blob([uInt8Array], { type: contentType })
}

export const downloadCanvasImage = ($canvas, fileName, type) => {
  const content = $canvas.toDataURL(type)
  const aLink = document.createElement('a')
  const blob = base64Image2Blob(content)
  aLink.download = fileName
  aLink.href = URL.createObjectURL(blob)
  document.body.appendChild(aLink)
  aLink.click()
  document.body.removeChild(aLink)
}

export const openFile = (content, fileName) => {
  const win = window.open('about:blank')
  win.document.write(`<img src='${content}' alt='${fileName}' />`)
}

// 普通字符转换成转意符
export const html2Escape = html => html.replace(/[<>&"]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' })[c])


//回车转为br标签
export const return2Br = str => str.replace(/\r?\n/g, '<br />')

// 去除开头结尾换行,并将连续3次以上换行转换成2次换行
export const trimBr = str =>
  str
    .replace(/((\s| )*\r?\n){3,}/g, '\r\n\r\n')
    .replace(/^((\s| )*\r?\n)+/g, '')
    .replace(/((\s| )*\r?\n)+$/g, '')

// 将多个连续空格合并成一个空格
export const mergeSpace = str => str.replace(/(\s| )+/g, ' ')

export const formatMessage = str => {
  str = html2Escape(str)
  str = trimBr(str)
  str = return2Br(str)
  return str
}