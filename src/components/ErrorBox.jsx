import React from 'react'

export default class ErrorBox extends React.Component {
  refreshPage () {
    window.location.reload()
  }

  render () {
    return (
      <div className='app-error' onClick={e => this.refreshPage()}>
        <div className='fail-icon' />
        <div className='title'>{this.props.errorInfo}</div>
      </div>
    )
  }
}
