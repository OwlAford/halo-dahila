import React from 'react'
import { computed } from 'mobx'
import { observer, inject } from 'mobx-react'
import { intNum } from '~/libs/tools'
import Spin from '^/Spin'
import PicBox from '^/PicBox'
import './scss/index.scss'

@inject(stores => {
  const {
    wall: { favList },
    home: { isAtBottom }
  } = stores

  return {
    isAtBottom,
    favList,
    getFavList: cb => stores.wall.getFavList(cb)
  }
})

@observer
export default class Wall extends React.Component {
  groupIndex = 1
  group = intNum(Math.ceil(document.documentElement.clientHeight / 90), 3)

  constructor (props) {
    super(props)
    this.goDetailPage = this.goDetailPage.bind(this)
  }

  @computed get displayList () {
    this.props.isAtBottom && this.groupIndex++
    return this.props.favList.slice(0, this.group * this.groupIndex)
  }

  goDetailPage (path) {
    window.open(`wallpaper.html?${path}`)
  }

  componentWillMount () {
    if (this.props.favList.length === 0) {
      NProgress.start()
      this.props.getFavList(NProgress.done)
    }
  }

  render () {
    return (
      <div className='home-wall'>
        {this.displayList.length === 0 && <Spin />}
        <div className='wall-list'>
          {
            this.displayList.map((item, i) => (
              <PicBox
                key={i}
                title='高清壁纸'
                notitle
                lnk={'https://alpha.wallhaven.cc/wallpapers/thumb/small/th-' + item.split('.')[0] + '.jpg'}
                clickEvent={e => { this.goDetailPage(item) }}
              />
            ))
          }
        </div>
      </div>
    )
  }
}
