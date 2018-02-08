import React from 'react'
import { withRouter } from 'react-router'
import { NavLink } from 'react-router-dom'
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'
import classNames from 'classnames'
import Spin from '^/Spin'
import Logo from '~/layouts/Logo'
import PlayList from './PlayList'
import { waiter } from '~/libs/tools'
import initTween from '~/libs/tween'
import avatar from './images/avatar.jpg'

@withRouter

@inject(stores => {
  const { home: { scrollable, is2rdScreen, userInfo, girlShow } } = stores
  return {
    scrollable,
    is2rdScreen,
    userInfo,
    girlShow,
    girlVisibleHandle: state => stores.home.girlVisibleHandle(state),
    bannerDarkHandle: state => stores.home.bannerDarkHandle(state),
    scrollableHandle: state => stores.home.scrollableHandle(state),
    getUserInfo: cb => stores.home.getUserInfo(cb)
  }
})

@observer
export default class MusicBox extends React.Component {
  @observable cricleState = 'hide'
  @observable avatarState = 'hide'
  @observable musicReady = false
  @observable bannerDarkState = false
  @observable isPlaying = false
  @observable currentIndex = 0
  @observable readMode = false
  @observable currentMusic = {
    name: '',
    file: '',
    cover: ''
  }

  subMenu = [
    {
      'label': 'HOME',
      'labelZh': '首页',
      'path': '/home/profile'
    },
    {
      'label': 'NOTE',
      'labelZh': '笔记',
      'path': '/home/note'
    },
    {
      'label': 'DESIGN',
      'labelZh': '设计',
      'path': '/home/design'
    },
    {
      'label': 'SHOOT',
      'labelZh': '摄影',
      'path': '/home/shoot'
    },
    {
      'label': 'TOOLS',
      'labelZh': '工具',
      'path': '/home/tools'
    },
    {
      'label': 'CHAT',
      'labelZh': '闲聊',
      'path': '/home/chat'
    }
  ]

  constructor (props) {
    super(props)
    this.initMusicPlayer = this.initMusicPlayer.bind(this)
    this.changeReadMode = this.changeReadMode.bind(this)
    this.musicHandle = this.musicHandle.bind(this)
  }

  @action
  changeReadMode (state) {
    this.readMode = state
    this.isPlaying = false
    this.wavesurfer.pause()
  }

  setLoadingProgress (val) {
    this.$coverProgress.style.height = `${100 - Number(val)}px`
  }

  @action
  musicHandle () {
    if (this.isPlaying) {
      this.isPlaying = false
      this.wavesurfer.pause()
    } else {
      this.isPlaying = true
      this.wavesurfer.play()
    }
  }

  setPosition (val) {
    const el = this.$scroller
    el.style.transform = el.style.webkitTransform = `translateY(${val}px)`
  }

  setVolChildsFocus (vol) {
    vol = vol - vol % 5 + (vol % 5 > 2 ? 5 : 0)
    Array.prototype.forEach.call(this.volChilds, (e, i) => {
      const curNum = e.innerText * 1
      const dis = Math.abs(curNum - vol)
      if (dis < 20) {
        let opc = 1 - dis / 20
        if (opc !== 1) {
          opc /= 2
        }
        e.style.opacity = opc
      } else {
        e.style.opacity = 0
      }
    })
  }

  volume2Position (vol) {
    return 108 - (vol / 5 * 24)
  }

  position2Volume (pos) {
    return (108 - pos) / 24 * 5
  }

  initVolumeScroller (vol) {
    this.currentVol = vol
    this.wavesurfer.backend.setVolume(~~vol / 100)
    const currY = this.currY = this.volume2Position(vol)
    this.volChilds = this.$scroller.childNodes
    this.setPosition(currY)
    this.setVolChildsFocus(vol)
    this.$banner.addEventListener('mouseup', e => {
      this.mouseupHandle()
    })
  }

  mousedownHandle (e) {
    this.moveFlag = true
    this.startY = e.pageY
  }

  mousemoveHandle (e) {
    if (this.moveFlag) {
      this.moveY = e.pageY - this.startY
      let newY = this.currY + this.moveY
      let newVol = ~~this.position2Volume(newY)
      if (newVol > 100) {
        newVol = 100
        newY = this.volume2Position(100)
      } else if (newVol < 0) {
        newVol = 0
        newY = this.volume2Position(0)
      }
      this.setPosition(newY)
      this.setVolChildsFocus(newVol)
      this.currentVol = newVol
      this.wavesurfer.backend.setVolume(newVol / 100)
    }
  }

  mouseupHandle () {
    if (this.moveFlag) {
      this.moveFlag = false
      this.currY += this.moveY
    }
  }

  initMusicPlayer (index, auto) {
    this.setLoadingProgress(0)
    this.musicReady = false
    this.isPlaying = false

    const list = this.props.userInfo.playlist
    if (index === undefined) {
      index = Math.round(Math.random() * (list.length - 1))
    }
    this.currentIndex = index
    this.currentMusic = list[index]

    const wavesurfer = this.wavesurfer

    wavesurfer.empty()
    wavesurfer.load(this.currentMusic.file)

    wavesurfer.on('loading', e => {
      this.setLoadingProgress(e)
    })

    wavesurfer.on('ready', () => {
      this.musicReady = true
      this.initVolumeScroller(75)
    })

    wavesurfer.on('finish', () => {
      this.isPlaying = false
    })

    auto && this.musicHandle()
  }

  @action
  async componentDidMount () {
    this.wavesurfer = WaveSurfer.create({
      container: '#music',
      waveColor: 'rgba(255, 255, 255, 0.2)',
      progressColor: 'rgba(255, 255, 255, 0.8)',
      height: 64,
      backend: 'MediaElement'
    })
    this.props.getUserInfo(async () => {
      this.initMusicPlayer(0)

      this.$menu.style.width = `${this.props.clientW}px`

      await waiter(1500)
      this.cricleState = 'run'
      await waiter(1000)
      this.cricleState = 'hide'
      this.avatarState = 'run'
      this.bannerDarkState = true
      this.props.bannerDarkHandle(true)
      await waiter(1000)
      this.avatarState = 'up'
      await waiter(300)
      initTween(this.$tween, this.props.clientW, this.props.clientH)
      await waiter(1000)
      this.props.scrollableHandle(true)
    })
  }

  componentWillUnmount () {
    this.isPlaying = false
    this.wavesurfer.destroy()
  }

  render () {
    const { author, bio, playlist } = this.props.userInfo
    const middStyle = {
      top: `${this.props.clientH * 0.4}px`,
      left: `${this.props.clientW * 0.5}px`
    }
    const musicBox = {
      play: this.isPlaying,
      switchMusic: this.initMusicPlayer,
      index: this.currentIndex,
      list: playlist,
      changeMode: this.changeReadMode,
      musicHandle: this.musicHandle
    }

    const Menu = ({ defaultClass, isZh }) => this.subMenu.map(
      (item, i) => (
        <NavLink
          key={i}
          className={defaultClass}
          exact
          to={item.path}
          activeClassName='active'
        >
          {isZh ? item.labelZh : item.label}
        </NavLink>
      )
    )

    const couldPlay = this.avatarState === 'up' && this.musicReady
    const waitPlay = this.avatarState === 'up' && !this.musicReady

    const boxHeight = this.readMode
      ? '0'
      : this.props.scrollable
        ? `${this.props.clientH + 315}px`
        : `${this.props.clientH}px`

    return [
      <div className='tween-wrap' key='tween'>
        <canvas className='tween' ref={node => { this.$tween = node }} />
      </div>,
      <div
        key='musicBox'
        id='musciBox'
        className='musciBox'
        style={{
          height: boxHeight
        }}
      >
        <div
          className='content-banner'
          ref={node => { this.$banner = node }}
          style={{ height: `${this.props.clientH}px` }}
        >
          <Logo
            size={48}
            key='app-logo'
            run={this.bannerDarkState}
            style={{
              left: '30px',
              top: '30px'
            }}
          />
          <div key='app-brand' className='app-brand halofont'>Halo</div>
          <div
            className={classNames({
              'circleLoop': true,
              'hide': this.cricleState === 'hide',
              'running': this.cricleState === 'run'
            })}
            style={middStyle}
          />
          <div
            style={middStyle}
            className={classNames({
              'avatar': true,
              'hide': this.avatarState === 'hide',
              'upper': this.avatarState === 'up',
              'running': this.avatarState === 'run'
            })}
          >
            <div className='wrap'>
              <div
                className={classNames({
                  'halo': true,
                  'show': this.avatarState === 'up',
                  'playing': this.isPlaying
                })}
              />
              <div className={classNames({
                'imgr': true,
                'fire': this.avatarState === 'run'
              })}>
                <img src={avatar} alt='avatar' width='120' height='120' />
              </div>
              <div className={classNames({
                'album': true,
                'playing': this.isPlaying
              })}>
                <img src={this.currentMusic.cover} alt='album cover' width='120' height='120' />
              </div>
            </div>
            <div
              className={classNames({
                'textNode': true,
                'show': this.avatarState === 'up'
              })}
            >
              <div className='userName halofont'>
                {
                  this.isPlaying
                    ? this.currentMusic.name
                    : author
                }
              </div>
              {
                !this.isPlaying && <div className='bio'>{bio}</div>
              }
            </div>
          </div>
          <div
            className={classNames({
              'menu': true,
              'show': this.avatarState === 'up'
            })}
            ref={node => { this.$menu = node }}
          >
            <Menu defaultClass='item halofont' />
          </div>
          <i
            className={classNames({
              'iconfont': true,
              'arrowDown': true,
              'show': this.props.scrollable
            })}
          >&#xe61c;</i>
          <div
            id='music'
            className={classNames({
              'show': couldPlay
            })}
          >
            <div
              className={classNames({
                'musicControl': true,
                'pause': this.isPlaying,
                'right': this.props.clientH < 620
              })}
              onClick={e => this.musicHandle()}
            />
            <div className='cover'>
              <img src={this.currentMusic.cover} width='100%' alt='viva la vida' />
              <div
                className='progress'
                ref={node => { this.$coverProgress = node }}
              />
            </div>
          </div>
          {
            waitPlay && <div className='musicPlaceholder'><Spin /></div>
          }
          <div
            className={classNames({
              'calibration': true,
              'upper': this.props.clientH < 620,
              'show': couldPlay
            })}
            onMouseDown={e => this.mousedownHandle(e)}
            onMouseMove={e => this.mousemoveHandle(e)}
          >
            {
              (new Array(21)).fill(0).map((e, i) => {
                return i === 10 ? <i key={i} className='long' /> : <i key={i} />
              })
            }
          </div>
          <div
            className={classNames({
              'volume': true,
              'upper': this.props.clientH < 620,
              'show': couldPlay
            })}
            onMouseDown={e => this.mousedownHandle(e)}
            onMouseMove={e => this.mousemoveHandle(e)}
          >
            <div className='scroller' ref={node => { this.$scroller = node }}>
              {
                (new Array(101)).fill(0).map((e, num) => {
                  if (num !== 0 && num % 5) {
                    return null
                  }
                  num > 9 ? num = String(num) : num = '0' + num
                  return <div className='num' key={num}>{num}</div>
                })
              }
            </div>
          </div>
        </div>
        <PlayList {...musicBox} />
      </div>,
      <div
        key='readModeMenu'
        className={
          classNames({
            'readModeMenu': true,
            'alpha': this.props.is2rdScreen,
            'hasHeight': this.readMode,
            'show': this.readMode || this.props.is2rdScreen
          })
        }
      >
        <div className='inner'>
          <div className='midd'>
            <Logo
              size={36}
              run={this.bannerDarkState}
              style={{
                left: '0',
                top: '8px'
              }}
            />
            <Menu defaultClass='item' isZh />
            {
              this.readMode
                ? <div
                  className='quitBtn'
                  onClick={e => { this.changeReadMode(false) }}
                >
                  退出阅读模式
                </div>
                : <i
                  className={classNames({
                    'girl': true,
                    'active': this.props.girlShow
                  })}
                  onClick={e => { this.props.girlVisibleHandle(!this.props.girlShow) }}
                />
            }
          </div>
        </div>
      </div>
    ]
  }
}
