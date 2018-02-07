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
    let clientH = document.documentElement.clientHeight
    const Props = this.props

    Props.history.listen(e => {
      const $menu = document.querySelector('.readModeMenu')
      if ($menu && $menu.classList.contains('hasHeight')) {
        window.scrollTo(0, 0)
      } else {
        window.scrollTo(0, clientH + 250)
      }
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
