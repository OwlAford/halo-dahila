import React from 'react'
import { withRouter } from 'react-router'
import Banner from './Banner'
import Music from './Music'
import Sub from './Sub'
import Toolbar from '~/layouts/Toolbar'
import './scss/content.scss'

@withRouter
export default class Home extends React.Component {
  componentWillMount () {
    this.props.history.listen(e => {
      window.scrollTo(0, 0)
    })
  }

  render () {
    return (
      <div className='home'>
        <Banner />
        <div className='home-content'>
          <Music />
          <Sub />
        </div>
        <Toolbar />
      </div>
    )
  }
}
