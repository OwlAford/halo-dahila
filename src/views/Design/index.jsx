import React from 'react'
import { computed } from 'mobx'
import { observer, inject } from 'mobx-react'
import { num2even } from '~/libs/tools'
import Loading from '^/Loading'
import PicBox from '^/PicBox'
import './scss/index.scss'

@inject(stores => {
  const {
    design: { list },
    home: { isAtBottom }
  } = stores

  return {
    isAtBottom,
    list,
    getDesignList: cb => stores.design.getList(cb)
  }
})

@observer
export default class Design extends React.Component {
  groupIndex = 1
  group = num2even(Math.ceil(document.documentElement.clientHeight / 320))

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
      this.props.getDesignList(NProgress.done)
    }
  }

  render () {
    return (
      <div className='home-design'>
        {this.displayList.length === 0 && <Loading />}
        <div className='design-list'>
          {
            this.displayList.map((item, i) => (
              <PicBox
                key={i}
                title={item.title}
                time={(new Date(item.time * 1)).toLocaleDateString()}
                lnk={item.lnk + '?imageView2/1/w/552/h/414/interlace/0/q/100'}
                clickEvent={e => { this.goDetailPage(item.lnk, item.title, item.time) }}
              />
            ))
          }
        </div>
      </div>
    )
  }
}
