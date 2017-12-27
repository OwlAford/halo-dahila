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
    this.darkState = true
    await waiter(1000)
    this.avatarState = 'up'
    await waiter(300)
    initTween(this.$tween, this.clientW, this.clientH)
    await waiter(2600)
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
          <div className='app-brand' />
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
                  'show': this.avatarState === 'up'
                })}
              />
              <div className={classNames({
                'imgr': true,
                'fire': this.avatarState === 'run'
              })}>
                <img src={avatar} alt='avatar' width='120' height='120' />
              </div>
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
            <NavLink
              className='item'
              exact
              to='/home/profile'
              activeClassName='active'
            >
              HOME
            </NavLink>
            <NavLink
              className='item'
              exact
              to='/home/note'
              activeClassName='active'
            >
              NOTE
            </NavLink>
            <NavLink
              className='item'
              exact
              to='/login'
              activeClassName='active'
            >
              ART
            </NavLink>
            <NavLink
              className='item'
              exact
              to='/home/shot'
              activeClassName='active'
            >
              SHOT
            </NavLink>
            <NavLink
              className='item'
              exact
              to='/home/site'
              activeClassName='active'
            >
              SITE
            </NavLink>
            <NavLink
              className='item'
              exact
              to='/home/talk'
              activeClassName='active'
            >
              TALK
            </NavLink>
          </div>
          <i
            className={classNames({
              'iconfont': true,
              'arrowDown': true,
              'show': this.scrollable
            })}
          >&#xe608;</i>
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
              <Route component={() => (<Redirect to='/home/profile' />)} />
            </Switch>
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default Content
