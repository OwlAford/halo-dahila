import { observable, action } from 'mobx'

export default class HomeModel {
  @observable is2rdScreen = false
  @observable isNearBottom = false

  @action
  is2rdScreenHandle (state) {
    this.is2rdScreen = state
  }

  @action
  isNearBottomHandle (state) {
    this.isNearBottom = state
  }
}
