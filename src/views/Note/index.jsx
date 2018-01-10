import React from 'react'
import { computed } from 'mobx'
import { observer, inject } from 'mobx-react'
import { timeAgo, limitString } from '~/filters'
import book from './images/book.svg'
import './scss/index.scss'

@inject(stores => {
  const {
    article: { articleList },
    home: { isAtBottom }
  } = stores

  return {
    isAtBottom,
    articleList,
    getArticleList: cb => stores.article.getArticleList(cb)
  }
})

@observer
export default class Note extends React.Component {
  groupIndex = -1
  group = ~~(document.documentElement.clientHeight / 150)

  @computed get displayList () {
    this.groupIndex++
    return this.props.articleList.slice(0, this.group * this.groupIndex)
  }

  goDetailPage (id) {
    window.open('/article.html?' + id)
  }

  componentWillMount () {
    NProgress.start()
    this.props.getArticleList(NProgress.done)
  }

  render () {
    return (
      <div className='home-note'>
        <div className='note-list'>
          {
            this.displayList.map((item, i) => (
              <div className='note-item' key={i}>
                <div className='title'>
                  <span>{item.title}</span>
                  <i
                    className='iconfont more'
                    onClick={e => { this.goDetailPage(item.id) }}
                  >&#xe601;</i>
                </div>
                <div className='content'>
                  <div className='thumb'>
                    <img
                      src={
                        item.cover
                          ? `${item.cover}?imageView2/1/w/200/h/200/interlace/0/q/100`
                          : book
                      }
                      alt={item.title}
                    />
                  </div>
                  <div className='preview'>{limitString(160, item.content)}</div>
                  <span className='timestamp'>
                    <i className='iconfont'>&#xe619;</i>
                    发布于{timeAgo(item.time)}前
                  </span>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}
