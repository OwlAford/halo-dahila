export const initImage = img => {
  return new Promise((resolve, reject) => {
    img.onload = () => {
      resolve()
    }
    img.onerror = error => {
      reject(error)
    }
  })
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
