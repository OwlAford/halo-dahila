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
      item.id = 'article_' + key
      arr.push(item)
    }
    callback(arr)
  })
}
