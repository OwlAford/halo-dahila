import React from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import classNames from 'classnames'
import { waiter } from '~/libs/tools'
import initTween from '~/libs/tween'
import './scss/content.scss'
import avatar from './images/avatar.jpg'

@observer
class Content extends React.Component {
  @observable scrollable = false
  @observable cricleState = 'hide'
  @observable avatarState = 'hide'

  componentWillMount () {
    this.clientH = document.documentElement.clientHeight
    this.clientW = document.documentElement.clientWidth
  }

  @action
  async componentDidMount () {
    this.$menu.style.width = `${this.clientW}px`
    this.$banner.style.height = `${this.clientH}px`
    await waiter(1500)
    this.cricleState = 'run'
    await waiter(1000)
    this.cricleState = 'hide'
    this.avatarState = 'run'
    await waiter(1000)
    this.avatarState = 'up'
    await waiter(300)
    initTween(this.$tween, this.clientW, this.clientH)
    this.scrollable = true
  }

  render () {
    const middStyle = {
      top: `${this.clientH * 0.5}px`,
      left: `${this.clientW * 0.5}px`
    }
    return (
      <div
        className={classNames({
          'home-content': true,
          'dark': this.avatarState === 'up'
        })}
      >
        <canvas className='tween' ref={node => { this.$tween = node }} />
        <div className='content-banner' ref={node => { this.$banner = node }}>
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
            <div
              className={classNames({
                'halo': true,
                'show': this.avatarState === 'up'
              })}
            />
            <div className={classNames({
              'imgr': true,
              'fire': this.avatarState === 'run'
            })}>
              <img src={avatar} alt='avatar' width='120' height='120' />
            </div>
            <div
              className={classNames({
                'textNode': true,
                'show': this.avatarState === 'up'
              })}
            >
              <div className='userName'>Aford</div>
              <div className='motto'>谁终将声震人间，必长久深自缄默；谁终将点燃闪电，必长久如云漂泊</div>
            </div>
          </div>
          <div
            className={classNames({
              'menu': true,
              'show': this.avatarState === 'up'
            })}
            ref={node => { this.$menu = node }}
          >
            <div className='item active'>HOME</div>
            <div className='item'>POST</div>
            <div className='item'>ART</div>
            <div className='item'>SHOT</div>
            <div className='item'>SITE</div>
            <div className='item'>TALK</div>
          </div>
        </div>
        <div
          className={classNames({
            'content-wrap': true,
            'scrollable': this.scrollable
          })}
        >
          <div style={{ height: '900px' }} />
        </div>
      </div>
    )
  }
}

export default Content
