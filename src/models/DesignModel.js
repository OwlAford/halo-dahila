import { observable, action } from 'mobx'
import { getData2Array } from '~/constants/connect'

export default class DesignModel {
  @observable designList = []

  @action
  getDesignList (cb) {
    getData2Array('design', list => {
      this.designList = list.reverse()
      cb && cb()
    })
  }
}
