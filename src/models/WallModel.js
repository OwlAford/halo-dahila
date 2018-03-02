import { observable, action } from 'mobx'
import shuffle from 'lodash/shuffle'

export default class ListModel {
  @observable favList = []

  @action
  getFavList (cb, err) {
    axios.get('https://owlaford.github.io/data/wallpaper-favorite.json')
      .then(({ data }) => {
        this.favList = shuffle(data.src || [])
        cb && cb(data)
      })
      .catch(er => {
        err && err(er)
      })
  }
}
