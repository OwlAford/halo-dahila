import { observable, action } from 'mobx'
import shuffle from 'lodash/shuffle'
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
  @observable starredGotten = false
  @observable girlShow = false
  @observable girlSing = false

  musicLink = '/music/Nightwish-Sagan.mp3'

  constructor (scrollableState) {
    this.scrollable = scrollableState
    this.initMusicAudio()
  }

  initMusicAudio () {
    const audio = this.audio = document.createElement('audio')
    audio.src = this.musicLink
    audio.preload = 'auto'
    audio.style.display = 'none'
    document.body.appendChild(audio)
  }

  @action
  girlVisibleHandle (state) {
    this.girlShow = state
    if (!this.girlShow) {
      this.girlSing = false
      this.audio.pause()
    }
  }

  @action
  girlSingHandle (state) {
    state ? this.audio.play() : this.audio.pause()
    this.girlSing = state
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
      .then(({ data }) => {
        this.starredGotten = true
        this.starredDataList = shuffle(data)
        cb && cb(data)
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
        this.userInfo.playlist = shuffle(data.playlist).slice(0, 6)
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
