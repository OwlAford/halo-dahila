import React from 'react'
import classNames from 'classnames'
import { observer, inject } from 'mobx-react'

@inject(stores => {
  const { home: { is2rdScreen, isNearBottom } } = stores
  return {
    is2rdScreen,
    isNearBottom
  }
})

@observer
export default class Toolbar extends React.Component {

  scrollToTop () {
    window.scrollTo(0, 0)
  }

  render () {
    return (
      <div
        className={classNames({
          'app-toolbar': true,
          'app-skew-shadow': true,
          'show': this.props.is2rdScreen
        })}
      >
        <div className='iconfont'>&#xe606;</div>
        <div className='iconfont'>&#xe607;</div>
        {
          this.props.isNearBottom
            ? <div className='iconfont' onClick={this.scrollToTop}>&#xe608;</div>
            : null
        }
      </div>
    )
  }
}
