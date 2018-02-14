import React from 'react'
import { observer, inject } from 'mobx-react'
import classNames from 'classnames'
import { formatDate } from '~/filters'
import { withToast } from '^/Toast'

@withToast

@inject(stores => {
  const {
    chat: {
      prevDate,
      curChatList
    }
  } = stores
  return {
    curChatList,
    prevDate,
    triggerPrevHandle: () => stores.chat.triggerPrevHandle()
  }
})

@observer
export default class ChatList extends React.Component {
  couldAutoScroll = true
  delta = 0

  componentDidMount () {
    const params = {
      disableTouch: true,
      disablePointer: true,
      scrollbars: 'custom',
      shrinkScrollbars: 'scale',
      mouseWheel: true,
      fadeScrollbars: false
    }
    this.chatScroll = new IScroll(this.refs.$chatList, params)
    setTimeout(() => {
      this.chatScroll.refresh()
      this.chatScroll.scrollTo(0, this.chatScroll.maxScrollY, 300)
    }, 300)
    this.chatScroll.on('scrollEnd', () => {
      if (Math.abs(this.chatScroll.maxScrollY - this.chatScroll.y) < 100) {
        this.couldAutoScroll = true
      } else {
        this.couldAutoScroll = false
      }
    })
  }

  componentDidUpdate () {
    if (this.chatScroll) {
      this.chatScroll.refresh()

      this.couldAutoScroll &&
      this.chatScroll.scrollTo(0, this.chatScroll.maxScrollY, 300)
    }
  }

  componentWillUnmount () {
    this.chatScroll.destroy()
  }

  triggerPrev () {
    this.props.triggerPrevHandle()
    this.couldAutoScroll = false
  }

  formatIdDate (id) {
    return formatDate(id.replace('id_', '') * 24 * 60 * 60 * 1000).ChineseFullDate
  }

  render () {
    const {
      curChatList,
      prevDate
    } = this.props

    return (
      <div className='chating-cxt' ref='$chatList'>
        <div className='chat-list'>
          {
            prevDate &&
            <div className='before-view'>
              <span>
                {this.formatIdDate(prevDate)}
                <span
                  className='jump'
                  onClick={e => { this.triggerPrev() }}
                >点击查看</span>
              </span>
            </div>
          }
          {
            curChatList.map((item, i) => {
              return (
                <div className='date-group' key={i}>
                  {
                    item.map((sub, j) => {
                      return (
                        <div
                          key={j}
                          className={classNames('chat-list-item', {
                            'dir-right': window.returnCitySN.cip === sub.ip
                          })}
                        >
                          <i
                            alt={sub.avatar}
                            className={'round-avatar ' + sub.avatar}
                          >
                            <div className='send-time'>{formatDate(sub.time).clock}</div>
                          </i>
                          <div className='nicname'>{sub.author}</div>
                          <div
                            className='message-detail'
                            dangerouslySetInnerHTML={{ __html: sub.text }}
                          />
                        </div>
                      )
                    })
                  }
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}
