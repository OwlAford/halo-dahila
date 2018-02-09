import React from 'react'
import { observable, computed, action } from 'mobx'
import { observer, inject } from 'mobx-react'
import classNames from 'classnames'
import { formatMessage } from '~/libs/tools'
import { sendMessage } from '~/constants/connect'
import { withToast } from '^/Toast'

@withToast

@inject(stores => {
  const {
    chat: {
      chatName,
      chatAvatar,
      needReg
    }
  } = stores
  return {
    chatName,
    chatAvatar,
    needReg
  }
})

@observer
export default class InputBox extends React.Component {
  @observable showEmojiList = false
  @observable chatingText = ''
  @observable sendIngState = false

  emojiArray = ['☀', '☁', '☔', '⛄', '⚡', '🌀', '🌂', '🌙', '🌟', '🍀', '🌷', '🌱', '🍁', '🌸', '🌹', '🍂', '🍃', '🌺', '🌻', '🌴', '🌵', '🌾', '🍎', '🍊', '🍓', '👀', '👂', '👃', '👄', '👅', '💅', '👦', '👧', '👨', '👩', '👫', '👮', '👱', '👲', '👳', '👴', '👵', '👶', '👷', '👸', '👯', '👻', '👼', '👽', '👾', '👿', '💀', '💂', '💃', '🐍', '🐎', '🐔', '🐗', '🐫', '🐘', '🐨', '🐒', '🐑', '🐙', '🐚', '🐛', '🐠', '🐡', '🐥', '🐦', '🐧', '🐩', '🐟', '🐬', '🐭', '🐯', '🐱', '🐳', '🐴', '🐵', '🐶', '🐷', '🐻', '🐹', '🐺', '🐮', '🐰', '🐸', '🐾', '😠', '😩', '😲', '😞', '😵', '😰', '😒', '😍', '😤', '😜', '😝', '😋', '😘', '😚', '😷', '😳', '😃', '😆', '😁', '😂', '☺', '😄', '😢', '😭', '😨', '😣', '😡', '😌', '😖', '😔', '😱', '😪', '😏', '😓', '😥', '😫', '😉', '😺', '😸', '😹', '😽', '😻', '😿', '😼', '🙀', '🙋', '🙌', '🙍', '🙏', '🔥', '🎁', '🎄', '🎅', '🎈', '🎉', '🎍', '🎎', '🎓', '🎏', '🎐', '🎃', '📞', '📱', '📲', '📠', '💻', '💽', '💾', '💿', '📀', '🎵', '🎶', '🎼', '📺', '💋', '💏', '💐', '💑', '🍔', '☕', '🍸', '🍺', '❤', '💓', '💔', '💖', '💗', '💘', '💙', '💚', '💛', '💜', '💝', '♥', '💢', '💤', '💦', '💨', '💩', '💪', '✨', '🔔', '✊', '✋', '✌', '👊', '👍', '☝', '👆', '👇', '👈', '👉', '👋', '👏', '👌', '👎', '👐']

  @computed get couldSend () {
    return this.chatingText.length !== 0 && !this.props.needReg && !this.sendIngState
  }

  @action
  editChatText (e) {
    this.chatingText = e.target.value
  }

  @action
  emojiShowHandle (e, state) {
    this.showEmojiList = state
    e && e.stopPropagation()
  }

  appendEmoji (e) {
    this.chatingText += e.target.innerText
    this.emojiShowHandle(null, false)
    this.refs.$ipt.focus()
  }

  sendMessage () {
    if (this.couldSend) {
      const originText = this.chatingText
      let formatText = formatMessage(originText)
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
        this.chatingText = ''
      }, this.refreshChatListHandle, () => {
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
    return (
      <div className='chating-input'>
        <div className='txtipt'>
          <textarea
            ref='$ipt'
            placeholder='请输入聊天内容，Ctrl + Enter 键发送'
            value={this.chatingText}
            onChange={e => { this.editChatText(e) }}
            onKeyDown={e => { this.sendPress(e) }}
            onFocus={e => { this.showEmojiList = false }}
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
    )
  }
}
