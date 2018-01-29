import { observable, action } from 'mobx'
import info from './userInfo.json'

export default class HomeModel {
  @observable is2rdScreen = false
  @observable isNearBottom = false
  @observable isAtBottom = false
  @observable bannerDarkState = false
  @observable scrollable = false
  @observable starredDataList = []
  @observable userInfo = {
    author: info.author,
    bio: info.bio,
    playlist: info.playlist
  }
  @observable hobby = info.hobby

  constructor (scrollableState) {
    this.scrollable = scrollableState
    this.getUserInfo()
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
  getStarredDataList (cb, err) {
    axios.get('https://api.github.com/users/OwlAford/starred')
      .then(res => {
        this.starredDataList = res.data
        cb && cb(res.data)
      })
      .catch(er => {
        err && err(er)
      })
  }

  @action
  getUserInfo (cb, err) {
    axios.get('/music/userInfo.json')
      .then(({ data }) => {
        this.userInfo.author = data.author
        this.userInfo.bio = data.bio
        this.userInfo.playlist = data.playlist
        this.hobby = data.hobby
        cb && cb(data)
      })
      .catch(er => {
        err && err(er)
      })
  }

  @action
  scrollableHandle (state) {
    this.scrollable = state
  }

  static fromJS (isScrollable) {
    return new HomeModel(isScrollable)
  }
}
