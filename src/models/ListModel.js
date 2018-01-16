import { observable, action } from 'mobx'
import { getData2Array } from '~/constants/connect'

export default class ListModel {
  @observable list = []

  constructor (type) {
    this.type = type
  }

  @action
  getList (cb) {
    getData2Array(this.type, list => {
      this.list = list.reverse()
      cb && cb()
    })
  }
}
