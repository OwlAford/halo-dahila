import React from 'react'
import ErrorBox from '^/ErrorBox'
import './scss/index.scss'

export default class Profile extends React.Component {
  componentDidMount () {
  }

  render () {
    return (
      <div className='home-profile'>
        <ErrorBox errorInfo='未知错误！' />
      </div>
    )
  }
}
