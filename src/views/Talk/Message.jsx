import React from 'react'
import { observable, computed, action } from 'mobx'
import { observer, inject } from 'mobx-react'
import classNames from 'classnames'
import { sendMessage } from '~/constants/connect'
import { formatDate } from '~/filters'
import { withToast } from '^/Toast'

@withToast

@inject(stores => {
  const {
    chat: {
      chatName,
      chatAvatar,
      needReg,
      prevDate,
      curChatList
    }
  } = stores
  return {
    chatName,
    chatAvatar,
    needReg,
    curChatList,
    prevDate,
    triggerPrevHandle: () => stores.chat.triggerPrevHandle()
  }
})

@observer
export default class Message extends React.Component {
  @observable showEmojiList = false
  @observable talkingText = ''
  @observable sendIngState = false

  couldAutoScroll = true

  emojiArray = ['☀', '☁', '☔', '⛄', '⚡', '🌀', '🌂', '🌙', '🌟', '🍀', '🌷', '🌱', '🍁', '🌸', '🌹', '🍂', '🍃', '🌺', '🌻', '🌴', '🌵', '🌾', '🍎', '🍊', '🍓', '👀', '👂', '👃', '👄', '👅', '💅', '👦', '👧', '👨', '👩', '👫', '👮', '👱', '👲', '👳', '👴', '👵', '👶', '👷', '👸', '👯', '👻', '👼', '👽', '👾', '👿', '💀', '💂', '💃', '🐍', '🐎', '🐔', '🐗', '🐫', '🐘', '🐨', '🐒', '🐑', '🐙', '🐚', '🐛', '🐠', '🐡', '🐥', '🐦', '🐧', '🐩', '🐟', '🐬', '🐭', '🐯', '🐱', '🐳', '🐴', '🐵', '🐶', '🐷', '🐻', '🐹', '🐺', '🐮', '🐰', '🐸', '🐾', '😠', '😩', '😲', '😞', '😵', '😰', '😒', '😍', '😤', '😜', '😝', '😋', '😘', '😚', '😷', '😳', '😃', '😆', '😁', '😂', '☺', '😄', '😢', '😭', '😨', '😣', '😡', '😌', '😖', '😔', '😱', '😪', '😏', '😓', '😥', '😫', '😉', '😺', '😸', '😹', '😽', '😻', '😿', '😼', '🙀', '🙋', '🙌', '🙍', '🙏', '🔥', '🎁', '🎄', '🎅', '🎈', '🎉', '🎍', '🎎', '🎓', '🎏', '🎐', '🎃', '📞', '📱', '📲', '📠', '💻', '💽', '💾', '💿', '📀', '🎵', '🎶', '🎼', '📺', '💋', '💏', '💐', '💑', '🍔', '☕', '🍸', '🍺', '❤', '💓', '💔', '💖', '💗', '💘', '💙', '💚', '💛', '💜', '💝', '♥', '💢', '💤', '💦', '💨', '💩', '💪', '✨', '🔔', '✊', '✋', '✌', '👊', '👍', '☝', '👆', '👇', '👈', '👉', '👋', '👏', '👌', '👎', '👐']

  @computed get couldSend () {
    return this.talkingText.length !== 0 && !this.props.needReg && !this.sendIngState
  }

  componentDidMount () {
    const params = {
      disableTouch: true,
      scrollbars: true,
      mouseWheel: true,
      fadeScrollbars: true
    }
    this.talkScroll = new IScroll(this.refs.$talkList, params)

    this.talkScroll.on('scrollEnd', () => {
      if (this.talkScroll.y === this.talkScroll.maxScrollY) {
        this.couldAutoScroll = true
      }
    })
  }

  componentDidUpdate () {
    if (this.talkScroll) {
      this.talkScroll.refresh()

      this.couldAutoScroll &&
      this.talkScroll.scrollTo(0, this.talkScroll.maxScrollY, 300)
    }
  }

  componentWillUnmount () {
    this.talkScroll.destroy()
  }

  @action
  editTalkText (e) {
    this.talkingText = e.target.value
  }

  @action
  emojiShowHandle (e, state) {
    this.showEmojiList = state
    e && e.stopPropagation()
  }

  appendEmoji (e) {
    this.talkingText += e.target.innerText
    this.emojiShowHandle(null, false)
  }

  triggerPrev () {
    this.props.triggerPrevHandle()
    this.couldAutoScroll = false
  }

  formatIdDate (id) {
    return formatDate(id.replace('id_', '') * 24 * 60 * 60 * 1000).ChineseFullDate
  }

  sendMessage () {
    if (this.couldSend) {
      const originText = this.talkingText
      let formatText = originText.replace('\n', '<br />')
      const uploadInfo = {
        text: formatText,
        time: Date.now(),
        author: this.props.chatName,
        avatar: this.props.chatAvatar,
        ip: window.returnCitySN.cip
      }
      // console.log(uploadInfo)
      this.sendIngState = true
      sendMessage(uploadInfo, () => {
        this.sendIngState = false
        this.talkingText = ''
      }, this.refreshTalkListHandle, () => {
        this.props.showMessage('消息发送失败！', 2000)
      })
    }
  }

  sendPress (e) {
    if (e.key === 'Enter' && e.ctrlKey) {
      this.sendMessage()
    }
  }

  render () {
    const {
      curChatList,
      prevDate
    } = this.props

    return (
      <div className='talk-content'>
        <div className='group-name'>技术讨论交流</div>
        <div className='talking-cxt' ref='$talkList'>
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
        <div className='talking-input'>
          <div className='txtipt'>
            <textarea
              name='fm-ipt'
              placeholder='请输入聊天内容'
              value={this.talkingText}
              onChange={e => { this.editTalkText(e) }}
              onKeyDown={e => { this.sendPress(e) }}
            />
          </div>
          <div className='emoji'>
            <div
              className='iconfont inner'
              onClick={e => { this.emojiShowHandle(e, !this.showEmojiList) }}
            >
              &#xe628;
            </div>
            <div
              className={classNames('emojilist', {
                show: this.showEmojiList
              })}
            >
              {
                this.emojiArray.map((item, i) => (
                  <div key={i} onClick={e => { this.appendEmoji(e) }}>{item}</div>
                ))
              }
            </div>
          </div>
          <div
            className={classNames('send-btn', {
              'disabled': !this.couldSend,
              'loading': this.sendIngState
            })}
            onClick={e => { this.sendMessage() }}
          >
            <span className='iconfont'>&#xe662;</span>
            <i className='dot' />
            <i className='dot' />
            <i className='dot' />
            <i className='dot' />
          </div>
        </div>
      </div>
    )
  }
}
