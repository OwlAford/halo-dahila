import React from 'react'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router'
import debounce from 'lodash/debounce'
import Banner from './Banner'
import Music from './Music'
import Sub from './Sub'
import Toolbar from '~/layouts/Toolbar'
import './scss/content.scss'

@withRouter

@inject(stores => ({
  bannerDarkHandle: state => stores.home.bannerDarkHandle(state),
  isNearBottomHandle: state => stores.home.isNearBottomHandle(state),
  is2rdScreenHandle: state => stores.home.is2rdScreenHandle(state),
  isAtBottomHandle: state => stores.home.isAtBottomHandle(state),
  scrollableHandle: state => stores.home.scrollableHandle(state)
}))

@observer
export default class Home extends React.Component {
  componentWillMount () {
    const clientH = document.documentElement.clientHeight

    const refresh = () => {
      this.props.scrollableHandle(false)
      this.props.bannerDarkHandle(false)
      this.props.isNearBottomHandle(false)
      this.props.is2rdScreenHandle(false)
      this.props.isAtBottomHandle(false)
      this.props.history.push('/')
    }

    window.addEventListener('resize', debounce(refresh, 600))

    this.props.history.listen(e => {
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
