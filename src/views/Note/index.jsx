import React from 'react'
import Loading from '^/Loading'
import './scss/index.scss'

export default class Note extends React.Component {
  componentDidMount () {
  }

  render () {
    return (
      <div className='home-note'>
        <Loading delay={100} />
      </div>
    )
  }
}
