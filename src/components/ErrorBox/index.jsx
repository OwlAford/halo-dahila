import React from 'react'
import './scss/index.scss'

export default class ErrorBox extends React.Component {
  refreshPage () {
    if (!this.props.noReload) {
      window.location.reload()
    }
  }

  render () {
    return (
      <div className='app-error' onClick={e => this.refreshPage()}>
        <div className='fail-icon' />
        <div className='title'>{this.props.children}</div>
      </div>
    )
  }
}
