import React from 'react'
import { computed } from 'mobx'
import { observer, inject } from 'mobx-react'
import Spin from '^/Spin'
import PicBox from '^/PicBox'
import './scss/index.scss'

@inject(stores => {
  const {
    shoot: { list },
    home: { isAtBottom }
  } = stores

  return {
    isAtBottom,
    list,
    getShootList: cb => stores.shoot.getList(cb)
  }
})

@observer
export default class Shoot extends React.Component {
  groupIndex = 1
  group = Math.ceil(document.documentElement.clientHeight / 600)

  constructor (props) {
    super(props)
    this.goDetailPage = this.goDetailPage.bind(this)
  }

  @computed get displayList () {
    this.props.isAtBottom && this.groupIndex++
    return this.props.list.slice(0, this.group * this.groupIndex)
  }

  goDetailPage (path, title, time) {
    const id = path.split('/').reverse()[0]
    window.open(`shoot.html?${id}&${encodeURI(title)}&${time}`)
  }

  componentWillMount () {
    if (this.props.list.length === 0) {
      NProgress.start()
      this.props.getShootList(NProgress.done)
    }
  }

  render () {
    return (
      <div className='home-shoot'>
        {this.displayList.length === 0 && <Spin />}
        <div className='shoot-list'>
          {
            this.displayList.map((item, i) => (
              <PicBox
                key={i}
                title={item.title}
                time={(new Date(item.time * 1)).toLocaleDateString()}
                lnk={item.lnk + '?imageView2/1/w/1150/h/646/interlace/0/q/100'}
                clickEvent={e => { this.goDetailPage(item.lnk, item.title, item.time) }}
              />
            ))
          }
        </div>
      </div>
    )
  }
}
