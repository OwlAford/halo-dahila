import React from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import ErrorBox from './ErrorBox'

export function withErrorHandler (Component) {
  @observer
  class WithErrorHandler extends React.Component {
    @observable hasError = false
    @observable error = null
    @observable errorInfo = null

    @action
    componentDidCatch (error, info) {
      this.hasError = true
      this.error = error
      this.errorInfo = info
    }

    render () {
      if (this.hasError) {
        return (
          <ErrorBox
            {...this.props}
            error={this.error}
            errorInfo={this.errorInfo}
          />
        )
      }

      return <Component {...this.props} />
    }
  }
  WithErrorHandler.displayName = `withErrorHandler(${Component.displayName})`
  return WithErrorHandler
}
