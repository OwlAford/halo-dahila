import React from 'react'
import classNames from 'classnames'
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'
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

  scrollToTop () {
    window.scrollTo(0, 0)
  }

  @action
  toogleGirl () {
    this.showGirl = !this.showGirl
  }

  render () {
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
      this.showGirl ? <Girl key='girl' /> : null
    ]
  }
}
