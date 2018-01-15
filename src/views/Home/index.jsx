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
  setBannerDark: state => stores.home.bannerDarkHandle(state),
  setIsNearBottom: state => stores.home.isNearBottomHandle(state),
  setIs2rdScreen: state => stores.home.is2rdScreenHandle(state),
  setIsAtBottom: state => stores.home.isAtBottomHandle(state),
  setScrollable: state => stores.home.scrollableHandle(state)
}))

@observer
export default class Home extends React.Component {
  componentWillMount () {
    const clientH = document.documentElement.clientHeight
    const Props = this.props

    const refresh = () => {
      Props.setScrollable(false)
      Props.setBannerDark(false)
      Props.setIsNearBottom(false)
      Props.setIs2rdScreen(false)
      Props.setIsAtBottom(false)
      Props.history.push('/')
    }

    window.addEventListener('resize', debounce(refresh, 600))

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
