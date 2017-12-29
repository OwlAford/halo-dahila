import React from 'react'
import { withRouter } from 'react-router'
import { Switch, Route, NavLink, Redirect } from 'react-router-dom'
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'
import classNames from 'classnames'
import Footer from './Footer'
import { waiter } from '~/libs/tools'
import initTween from '~/libs/tween'
import './scss/content.scss'
import avatar from './images/avatar.jpg'
import cover from './images/cover.jpg'
import { getBumper } from '^/Bumper'
import Profile from 'bundle-loader?lazy&name=profile!../Profile'
import Note from 'bundle-loader?lazy&name=note!../Note'

@withRouter

@inject(stores => {
  const { home: { is2rdScreen } } = stores
  return {
    is2rdScreen
  }
})

@observer
class Content extends React.Component {
  @observable scrollable = true // 测试
  @observable cricleState = 'hide'
  @observable avatarState = 'hide'
  @observable darkState = false
  @observable musicReady = false
  @observable isPlaying = false

  componentWillMount () {
    this.clientH = document.documentElement.clientHeight
    this.clientW = document.documentElement.clientWidth
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
    vol = vol - vol % 5
    Array.prototype.forEach.call(this.volChilds, (e, i) => {
      const curNum = e.innerText * 1
      const dis = Math.abs(curNum - vol)
      if (dis < 20) {
        e.style.opacity = 1 - dis / 20
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

  @action
  async componentDidMount () {
    const wavesurfer = this.wavesurfer = WaveSurfer.create({
      container: '#music',
      waveColor: 'rgba(255, 255, 255, 0.2)',
      progressColor: 'rgba(255, 255, 255, 0.8)',
      height: 64,
      backend: 'MediaElement'
    })
    wavesurfer.load('http://7u2kad.com1.z0.glb.clouddn.com/Coldplay%20-%20Viva%20la%20Vida.mp3')

    wavesurfer.on('ready', () => {
      this.musicReady = true
      this.initVolumeScroller(75)
    })

    this.$menu.style.width = `${this.clientW}px`
    this.$banner.style.height = `${this.clientH}px`
    await waiter(1500)
    this.cricleState = 'run'
    await waiter(1000)
    this.cricleState = 'hide'
    this.avatarState = 'run'
    this.darkState = true
    await waiter(1000)
    this.avatarState = 'up'
    await waiter(300)
    initTween(this.$tween, this.clientW, this.clientH)
    await waiter(2600)
    this.scrollable = true
  }

  componentWillUnmount () {
    this.isPlaying = false
    this.wavesurfer.destroy()
  }

  render () {
    const middStyle = {
      top: `${this.clientH * 0.4}px`,
      left: `${this.clientW * 0.5}px`
    }

    const menuList = [{
      label: 'HOME',
      path: '/home/profile'
    }, {
      label: 'NOTE',
      path: '/home/note'
    }, {
      label: 'ART',
      path: '/home/art'
    }, {
      label: 'SHOT',
      path: '/home/shot'
    }, {
      label: 'SITE',
      path: '/home/site'
    }, {
      label: 'TALK',
      path: '/home/talk'
    }]

    return (
      <div
        className={classNames({
          'home-content': true,
          'dark': this.darkState && !this.props.is2rdScreen
        })}
      >
        <canvas className='tween' ref={node => { this.$tween = node }} />
        <div className='content-banner' ref={node => { this.$banner = node }}>
          <div
            className={classNames({
              'app-logo': true,
              'running': this.darkState
            })}
          />
          <div className='app-brand halofont'>Halo</div>
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
                <img src={cover} alt='album cover' width='120' height='120' />
              </div>
            </div>
            <div
              className={classNames({
                'textNode': true,
                'show': this.avatarState === 'up'
              })}
            >
              <div className='userName halofont'>{this.isPlaying ? 'Viva La Vida' : 'Aford'}</div>
              {
                this.isPlaying
                  ? null
                  : <div className='motto'>谁终将声震人间，必长久深自缄默；谁终将点燃闪电，必长久如云漂泊</div>
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
            {
              menuList.map((item, i) => {
                return (
                  <NavLink
                    key={i}
                    className='item halofont'
                    exact
                    to={item.path}
                    activeClassName='active'
                  >
                    {item.label}
                  </NavLink>
                )
              })
            }
          </div>
          <i
            className={classNames({
              'iconfont': true,
              'arrowDown': true,
              'show': this.scrollable
            })}
          >&#xe608;</i>
          <div
            id='music'
            className={classNames({
              'show': this.avatarState === 'up' && this.musicReady
            })}
          >
            <div
              className={classNames({
                'musicControl': true,
                'pause': this.isPlaying,
                'right': this.clientH < 620
              })}
              onClick={e => this.musicHandle()}
            />
            <div className='cover'>
              <img src={cover} width='100%' alt='viva la vida' />
            </div>
          </div>
          <div
            className={classNames({
              'calibration': true,
              'show': this.avatarState === 'up' && this.musicReady
            })}
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
              'show': this.avatarState === 'up' && this.musicReady
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
        <div
          className={classNames({
            'content-wrap': true,
            'scrollable': this.scrollable
          })}
        >
          <div className='content-main'>
            <Switch>
              <Route
                path='/home/profile'
                component={getBumper(Profile)}
              />
              <Route
                path='/home/note'
                component={getBumper(Note)}
              />
              <Route component={() => <Redirect to='/home/profile' />} />
            </Switch>
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default Content
