import { observable, action } from 'mobx'
import shuffle from 'lodash/shuffle'

export default class HomeModel {
  @observable is2rdScreen = false
  @observable isNearBottom = false
  @observable isAtBottom = false
  @observable bannerDarkState = false
  @observable readMode = false
  @observable scrollable = false
  @observable starredDataList = []
  @observable userInfo = {
    author: '',
    bio: '',
    playlist: []
  }
  @observable hobby = []
  @observable starredGotten = false
  @observable girlShow = false
  @observable girlSing = false

  musicLink = 'http://yuis.qiniudn.com/music/singing.mp3'

  constructor (scrollableState) {
    this.scrollable = scrollableState
    this.initMusicAudio()
    document.addEventListener('visibilitychange', () => {
      const isHidden = document.hidden
      if (isHidden) {
        document.title = `HALO - 🍺及时行乐`
      } else {
        document.title = 'HALO - Carpe Diem'
      }
    })
  }

  initMusicAudio () {
    const audio = this.audio = document.createElement('audio')
    audio.src = this.musicLink
    audio.preload = 'auto'
    audio.style.display = 'none'
    document.body.appendChild(audio)
    audio.addEventListener('ended', e => {
      this.girlSingHandle(false)
    }, false)
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
    this.audio.currentTime = 0
    state ? this.audio.play() : this.audio.pause()
    this.girlSing = state
  }

  @action
  readModeHandle (state) {
    this.readMode = state
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
    axios.get('https://owlaford.github.io/data/userInfo.json')
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
