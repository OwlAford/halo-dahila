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


