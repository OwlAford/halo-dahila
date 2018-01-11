import { observable, action } from 'mobx'
import { getData2Array } from '~/constants/connect'

export default class ArticleModel {
  @observable shootList = []

  @action
  getShootList (cb) {
    getData2Array('photo', list => {
      this.shootList = list.reverse()
      cb && cb()
    })
  }
}
