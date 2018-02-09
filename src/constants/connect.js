import UAparser from 'ua-parser-js'

export const WD = window.wilddog.initializeApp({
  authDomain: 'carbon.wilddog.com',
  syncURL: 'carbon.wilddogio.com'
})

const rootPath = 'carbon/'

const trans2Array = val => {
  val = val || {}
  let arr = []
  for (let key in val) {
    let item = val[key]
    item.id = String(key)
    arr.push(item)
  }
  return arr
}

export const getData = (path, callback) => {
  WD.sync().ref(rootPath + path).on('value', snapshot => {
    callback(snapshot.val())
  })
}

export const getData2Array = (path, callback) => {
  getData(path, val => {
    callback(trans2Array(val))
  })
}

export const online = (name, avatar) => {
  const onlineRef = rootPath + 'chatRoom/online'
  const { cname, cip } = window.returnCitySN
  let item = {}
  let curKey = '/' + cip.replace(/\./g, '_')
  const parser = new UAparser()
  item[curKey] = {
    browser: parser.getBrowser() || { name: '未知浏览器' },
    os: parser.getOS() || '',
    cip,
    cname,
    name,
    avatar
  }
  WD.sync().ref(onlineRef).update(item)
  WD.sync().ref(onlineRef + curKey).onDisconnect().remove()
}

export const sendMessage = (data, cb, err) => {
  const timestamp = Date.now()
  const curKey = ~~(timestamp / 24 / 60 / 60 / 1000)
  const chatlistRef = rootPath + 'chatRoom/chatlist/id_' + curKey
  const chatdateRef = rootPath + 'chatRoom/chatdate'

  let flag = 0

  let itemA = {}
  itemA['id_' + timestamp] = data
  WD.sync().ref(chatlistRef).update(itemA, error => {
    if (error === null) {
      err && err()
    }
    flag += 1
    if (flag === 2) {
      cb && cb()
    }
  })

  let itemB = {}
  itemB['id_' + curKey] = curKey
  WD.sync().ref(chatdateRef).update(itemB, error => {
    if (error === null) {
      err && err()
    }
    flag += 1
    if (flag === 2) {
      cb && cb()
    }
  })
}
