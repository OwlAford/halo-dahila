import { observable, action } from 'mobx'

export default class HomeModel {
  @observable is2rdScreen = false
  @observable isNearBottom = false
  @observable isAtBottom = false
  @observable bannerDarkState = false
  @observable scrollable = false

  constructor (scrollableState) {
    this.scrollable = scrollableState
  }

  @action
  is2rdScreenHandle (state) {
    this.is2rdScreen = state
  }

  @action
  isNearBottomHandle (state) {
    this.isNearBottom = state
  }

  @action
  isAtBottomHandle (state) {
    this.isAtBottom = state
  }

  @action
  bannerDarkHandle (state) {
    this.bannerDarkState = state
  }

  @action
  scrollableHandle (state) {
    this.scrollable = state
  }

  static fromJS (isScrollable) {
    return new HomeModel(isScrollable)
  }
}
