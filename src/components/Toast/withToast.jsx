import React from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import LazyDisplay from '^/LazyDisplay'
import Toast from './Toast'

export default Component => {
  @observer
  class WithToastComponent extends React.Component {
    @observable showToast = false
    @observable toastType = ''
    @observable toastMesg = ''

    constructor (props) {
      super(props)
      this.showMessage = this.showMessage.bind(this)
    }

    @action
    showMessage (msg, delay, type) {
      this.showToast = true
      this.toastMesg = msg
      this.toastType = type || 'warning'
      clearTimeout(this.msgTimer)
      this.msgTimer = setTimeout(() => {
        this.showToast = false
        clearTimeout(this.msgTimer)
      }, delay || 3000)
    }

    render () {
      const showStyle = {
        animation: 'fadeInUp .3s both'
      }

      const hideStyle = {
        animation: 'fadeOutDown .3s both'
      }

      return [
        <Component
          key='origin'
          showMessage={this.showMessage}
          {...this.props}
        />,
        <LazyDisplay
          key='toast'
          enterDelay={0}
          leaveDelay={300}
          visibleKey={this.showToast}
        >
          <Toast type={this.toastType} style={this.showToast ? showStyle : hideStyle}>{this.toastMesg}</Toast>
        </LazyDisplay>
      ]
    }
  }
  return WithToastComponent
}
