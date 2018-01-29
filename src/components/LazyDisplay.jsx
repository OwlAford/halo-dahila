import React from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'

@observer
export default class LazyDisplay extends React.Component {
  @observable remove = true

  clearTimer () {
    this.delayTimer && clearTimeout(this.delayTimer)
  }

  @action
  componentWillReceiveProps (nextProps, nextState) {
    let { enterDelay, leaveDelay, visibleKey } = this.props
    enterDelay = enterDelay || 300
    leaveDelay = leaveDelay || 300
    if (nextProps.visibleKey === visibleKey) {
      return
    }
    this.clearTimer()
    this.delayTimer = setTimeout(() => {
      this.remove = visibleKey
    }, visibleKey ? leaveDelay : enterDelay)
  }

  componentWillUnmount () {
    this.clearTimer()
  }

  render () {
    const { children } = this.props
    return this.remove ? null : children
  }
}
