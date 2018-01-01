import { observable, action } from 'mobx'

export default class HomeModel {
  @observable is2rdScreen = false
  @observable isNearBottom = false
  @observable isNearBottom = false
  @observable bannerDarkState = false

  @action
  is2rdScreenHandle (state) {
    this.is2rdScreen = state
  }

  @action
  isNearBottomHandle (state) {
    this.isNearBottom = state
  }

  @action
  bannerDarkHandle (state) {
    this.bannerDarkState = state
  }
}
