export const WD = window.wilddog.initializeApp({
  authDomain: 'carbon.wilddog.com',
  syncURL: 'carbon.wilddogio.com'
})

const rootPath = 'carbon/'

export const getData = (path, callback) => {
  WD.sync().ref(rootPath + path).on('value', snapshot => {
    callback(snapshot.val())
  })
}

export const getData2Array = (path, callback) => {
  getData(path, val => {
    let arr = []
    for (let key in val) {
      let item = val[key]
      item.id = 'detail_' + key
      arr.push(item)
    }
    callback(arr)
  })
}

export const online = (name, avatar) => {
  const onlineRef = rootPath + 'chatRoom/online'
  const { cname, cip } = window.returnCitySN
  let item = {}
  let curKey = '/' + cip.replace(/\./g, '_')
  item[curKey] = {
    cip,
    cname,
    name,
    avatar
  }
  WD.sync().ref(onlineRef).update(item)
  WD.sync().ref(onlineRef + curKey).onDisconnect().remove()
}

online('Aford', 'owl')
