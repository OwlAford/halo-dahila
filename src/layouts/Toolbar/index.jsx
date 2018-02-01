import React from 'react'
import classNames from 'classnames'
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'
import LazyDisplay from '^/LazyDisplay'
import Portal from '^/Portal'
import Girl from '^/Girl'
import './scss/index.scss'

@inject(stores => {
  const { home: { is2rdScreen, isNearBottom, girlShow, girlSing } } = stores
  return {
    is2rdScreen,
    isNearBottom,
    girlShow,
    girlSing,
    girlVisibleHandle: state => stores.home.girlVisibleHandle(state),
    girlSingHandle: state => stores.home.girlSingHandle(state)
  }
})

@observer
export default class Toolbar extends React.Component {
  @observable showMenu = false
  @observable girlZoom = 1
  @observable menuY = 0
  @observable menuY = 0

  scrollToTop () {
    window.scrollTo(0, 0)
  }

  @action
  toogleGirl (e) {
    if (this.props.girlShow) {
      this.resetGirl(e, 1)
    }
    this.props.girlVisibleHandle(!this.props.girlShow)
    this.showMenu = false
  }

  @action
  toogleSingGirl (e) {
    this.props.girlSingHandle(true)
    this.toogleGirl()
  }

  @action
  setGirlZoom (e, ratio) {
    this.girlZoom = ratio
    this.showMenu = false
    e && e.stopPropagation()
  }

  resetGirl (e) {
    this.setGirlZoom(e, 1)
    this.props.girlSingHandle(false)
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
      animation: 'fadeOutDown .6s .3s forwards'
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
        <div className='iconfont' onClick={e => { this.toogleSingGirl() }}>
          &#xe895;
        </div>
        <div className='iconfont'>&#xe627;</div>
        <div className='iconfont'>&#xe607;</div>
        {
          this.props.isNearBottom &&
          <div className='iconfont' onClick={this.scrollToTop}>&#xe61c;</div>
        }
      </div>,
      <LazyDisplay
        key='girl'
        enterDelay={0}
        leaveDelay={600}
        visibleKey={this.props.girlShow}
      >
        <Girl
          singing={this.props.girlSing}
          zoom={this.girlZoom}
          contextMenuHandle={(e, zoom) => { this.contextMenuHandle(e) }}
          style={this.props.girlShow ? showStyle : hideStyle}
        />
      </LazyDisplay>,
      this.showMenu &&
        <Portal key='menu'>
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
              onClick={e => { this.props.girlSingHandle(!this.props.girlSing) }}
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
    ]
  }
}
