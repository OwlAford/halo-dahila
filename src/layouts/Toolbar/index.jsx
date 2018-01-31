import React from 'react'
import classNames from 'classnames'
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'
import LazyDisplay from '^/LazyDisplay'
import Portal from '^/Portal'
import Girl from '^/Girl'
import './scss/index.scss'

@inject(stores => {
  const { home: { is2rdScreen, isNearBottom } } = stores
  return {
    is2rdScreen,
    isNearBottom
  }
})

@observer
export default class Toolbar extends React.Component {
  @observable showGirl = false
  @observable showMenu = false
  @observable girlZoom = 1
  @observable girlSing = false
  @observable menuY = 0
  @observable menuY = 0

  scrollToTop () {
    window.scrollTo(0, 0)
  }

  @action
  toogleGirl (e) {
    this.showGirl = !this.showGirl
    if (!this.showGirl) {
      this.resetGirl(e, 1)
    }
    this.showMenu = false
  }

  @action
  singHandle (state) {
    this.girlSing = state
  }

  @action
  setGirlZoom (e, ratio) {
    this.girlZoom = ratio
    this.showMenu = false
    e && e.stopPropagation()
  }

  resetGirl (e) {
    this.setGirlZoom(e, 1)
    this.singHandle(false)
  }

  contextMenuHandle (e) {
    this.menuX = e.clientX
    this.menuY = e.clientY
    this.showMenu = true
  }

  componentDidMount () {
    document.addEventListener('click', () => {
      this.showMenu = false
    }, false)
  }

  render () {
    const showStyle = {
      animation: 'fadeInUp .6s'
    }

    const hideStyle = {
      animation: 'fadeOutDown .6s'
    }

    return [
      <div
        key='toolbar'
        className={classNames({
          'app-toolbar': true,
          'app-skew-shadow': true,
          'show': this.props.is2rdScreen
        })}
      >
        <div className='iconfont' onClick={e => { this.toogleGirl() }}>
          <i className='girl' />
        </div>
        <div className='iconfont'>&#xe627;</div>
        <div className='iconfont'>&#xe607;</div>
        {
          this.props.isNearBottom
            ? <div className='iconfont' onClick={this.scrollToTop}>&#xe61c;</div>
            : null
        }
      </div>,
      <LazyDisplay
        key='girl'
        enterDelay={0}
        leaveDelay={600}
        visibleKey={this.showGirl}
      >
        <Girl
          singing={this.girlSing}
          zoom={this.girlZoom}
          contextMenuHandle={(e, zoom) => { this.contextMenuHandle(e) }}
          style={this.showGirl ? showStyle : hideStyle}
        />
      </LazyDisplay>,
      this.showMenu
        ? <Portal key='menu'>
          <div
            className='fix-menu'
            style={{
              left: this.menuX + 'px',
              top: this.menuY + 'px'
            }}
          >
            <div
              className='menu-item'
              onClick={e => { this.toogleGirl(e) }}
            >
              退出
            </div>
            <div
              className='menu-item'
              onClick={e => { this.singHandle(!this.girlSing) }}
            >
              唱歌/停止唱歌
            </div>
            <div
              className='menu-item'
              onClick={e => { this.setGirlZoom(e, 0.5) }}
            >
              缩小至0.5倍
            </div>
            <div
              className='menu-item'
              onClick={e => { this.setGirlZoom(e, 1.5) }}
            >
              放大至1.5倍
            </div>
            <div
              className='menu-item'
              onClick={e => { this.resetGirl(e) }}
            >
              重置
            </div>
          </div>
        </Portal>
        : null
    ]
  }
}
