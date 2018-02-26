import React from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import { withRouter } from 'react-router'
import debounce from 'lodash/debounce'
import Banner from './Banner'
import MusicBox from './MusicBox'
import ChildNode from './ChildNode'
import Toolbar from '~/layouts/Toolbar'
import './scss/content.scss'

@withRouter
@observer
export default class Home extends React.Component {
  @observable clientH = 540
  @observable clientW = 1200

  @action
  getClient () {
    const doc = document.documentElement
    this.clientH = doc.clientHeight
    this.clientW = window.innerWidth
  }

  componentWillMount () {
    this.getClient()
    this.initScreen = debounce(e => { this.getClient() }, 100)
    window.addEventListener('resize', this.initScreen, false)

    this.props.history.listen(e => {
      const $menu = document.querySelector('.readModeMenu')
      const realHeight = this.clientH > 500 ? this.clientH : 500
      if ($menu && $menu.classList.contains('hasHeight')) {
        window.scrollTo(0, 0)
      } else {
        window.scrollTo(0, realHeight + 250)
      }
    })
  }

  render () {
    return (
      <div className='home'>
        <Banner clientH={this.clientH} clientW={this.clientW} />
        <div className='home-content'>
          <MusicBox clientH={this.clientH} clientW={this.clientW} />
          <ChildNode clientH={this.clientH} clientW={this.clientW} />
        </div>
        <Toolbar />
      </div>
    )
  }
}
