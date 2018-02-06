import React from 'react'
import { observable, computed, action } from 'mobx'
import { observer, inject } from 'mobx-react'
import classNames from 'classnames'
import { sendMessage } from '~/constants/connect'
import Avatar from './Avatar'
import { withToast } from '^/Toast'
import BubblyButton from '^/BubblyButton'
import './scss/index.scss'

@withToast

@inject(stores => {
  const {
    chat: {
      chatName,
      chatAvatar,
      needReg,
      prevDate,
      curChatList,
      onlinelist
    }
  } = stores
  return {
    chatName,
    chatAvatar,
    needReg,
    curChatList,
    onlinelist,
    prevDate,
    onlineHandle: (name, avatar) => stores.chat.onlineHandle(name, avatar),
    onlineAuto: cb => stores.chat.onlineAuto(cb),
    triggerPrevHandle: () => stores.chat.triggerPrevHandle()
  }
})

@observer
export default class Talk extends React.Component {
  @observable nickName = ''
  @observable avatarType = ''
  @observable showEmojiList = false
  @observable talkingText = ''
  @observable sendIngState = false

  emojiArray = ['☀', '☁', '☔', '⛄', '⚡', '🌀', '🌂', '🌙', '🌟', '🍀', '🌷', '🌱', '🍁', '🌸', '🌹', '🍂', '🍃', '🌺', '🌻', '🌴', '🌵', '🌾', '🍎', '🍊', '🍓', '👀', '👂', '👃', '👄', '👅', '💅', '👦', '👧', '👨', '👩', '👫', '👮', '👱', '👲', '👳', '👴', '👵', '👶', '👷', '👸', '👯', '👻', '👼', '👽', '👾', '👿', '💀', '💂', '💃', '🐍', '🐎', '🐔', '🐗', '🐫', '🐘', '🐨', '🐒', '🐑', '🐙', '🐚', '🐛', '🐠', '🐡', '🐥', '🐦', '🐧', '🐩', '🐟', '🐬', '🐭', '🐯', '🐱', '🐳', '🐴', '🐵', '🐶', '🐷', '🐻', '🐹', '🐺', '🐮', '🐰', '🐸', '🐾', '😠', '😩', '😲', '😞', '😵', '😰', '😒', '😍', '😤', '😜', '😝', '😋', '😘', '😚', '😷', '😳', '😃', '😆', '😁', '😂', '☺', '😄', '😢', '😭', '😨', '😣', '😡', '😌', '😖', '😔', '😱', '😪', '😏', '😓', '😥', '😫', '😉', '😺', '😸', '😹', '😽', '😻', '😿', '😼', '🙀', '🙋', '🙌', '🙍', '🙏', '🔥', '🎁', '🎄', '🎅', '🎈', '🎉', '🎍', '🎎', '🎓', '🎏', '🎐', '🎃', '📞', '📱', '📲', '📠', '💻', '💽', '💾', '💿', '📀', '🎵', '🎶', '🎼', '📺', '💋', '💏', '💐', '💑', '🍔', '☕', '🍸', '🍺', '❤', '💓', '💔', '💖', '💗', '💘', '💙', '💚', '💛', '💜', '💝', '♥', '💢', '💤', '💦', '💨', '💩', '💪', '✨', '🔔', '✊', '✋', '✌', '👊', '👍', '☝', '👆', '👇', '👈', '👉', '👋', '👏', '👌', '👎', '👐']

  constructor (props) {
    super(props)
    this.selectAvatar = this.selectAvatar.bind(this)
    this.refreshOnlineHandle = this.refreshOnlineHandle.bind(this)
  }

  @computed get couldSend () {
    return this.talkingText.length !== 0 && !this.props.needReg && !this.sendIngState
  }

  componentWillMount () {
    this.props.onlineAuto(this.refreshOnlineHandle)
  }

  componentDidMount () {
    this.onlineScroll = new IScroll(this.refs.$onlineList, {
      disableTouch: true,
      scrollbars: true,
      mouseWheel: true,
      fadeScrollbars: true
    })
  }

  refreshOnlineHandle (val) {
    // console.log(val)
    this.onlineScroll && this.onlineScroll.refresh()
  }

  componentWillUnmount () {
    this.onlineScroll.destroy()
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

  @action
  nickNameHandle = e => {
    this.nickName = e.target.value.trim()
  }

  submitInfo () {
    // const reg = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/
    const reg = /^[\u4e00-\u9fa5]{1,7}$|^[\dA-Za-z_]{1,14}$/
    if (reg.test(this.nickName)) {
      if (this.avatarType) {
        this.props.onlineHandle(this.nickName, this.avatarType)
        this.props.showMessage('提交成功！', 2000, 'success')
      } else {
        this.props.showMessage('请选择头像！', 2000)
      }
    } else {
      this.refs.$name.value = this.nickName = ''
      this.props.showMessage('请输入正确用户名！', 3000)
    }
  }

  appendEmoji (e) {
    this.talkingText += e.target.innerText
    this.emojiShowHandle(null, false)
  }

  selectAvatar (item) {
    this.avatarType = item
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
      }, () => {
        this.props.showMessage('消息发送失败！', 2000)
      })
    }
  }

  render () {
    const {
      chatAvatar,
      chatName,
      needReg,
      triggerPrevHandle,
      curChatList,
      prevDate,
      onlinelist
    } = this.props
    console.log('👻', curChatList, prevDate)
    return (
      <div className='home-talk'>
        <div className='talk-sidebar'>
          <div
            className={classNames('step', {
              'show': needReg
            })}
          >
            <div className='user-name'>
              <div className='name-ipt'>
                <input
                  ref='$name'
                  type='text'
                  placeholder='请输入昵称'
                  onChange={this.nickNameHandle}
                />
              </div>
            </div>
            <div className='fm-title'>请选择头像</div>
            <Avatar select={this.selectAvatar} />
            <BubblyButton clickEvent={() => { this.submitInfo() }}>提交信息</BubblyButton>
          </div>
          <div
            className={classNames('step', {
              'show': !needReg
            })}
          >
            <div className='login-info'>
              <i
                alt={chatAvatar}
                className={'round-avatar ' + chatAvatar}
              />
              <div className='nick-name'>{chatName}</div>
            </div>
            <div className='online-list' ref='$onlineList'>
              <div className='order-list'>
                {
                  onlinelist.map((item, i) => (
                    <div className='list-item' key={i}>
                      <i
                        alt={item.avatar}
                        className={'round-avatar online ' + item.avatar}
                      />
                      <div className='name'>
                        <span>{item.name}</span>
                        <span className='state'>（在线）</span>
                      </div>
                      <div className='local'>IP: {item.cip} {item.cname}</div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
        <div className='talk-content'>
          <div className='group-name'>技术讨论交流</div>
          <div className='talking-cxt'>
            <div className='chat-list'>
              {
                prevDate &&
                <div className='before-view'>
                  <span>
                    {prevDate}
                    <span
                      className='jump'
                      onClick={e => { triggerPrevHandle() }}
                    >点击查看</span>
                  </span>
                </div>
              }
              {console.log(curChatList)}
              {
                Object.keys(curChatList).map(item => {
                  const curGrp = curChatList[item]
                  return (
                    <div className='date-group' key={item}>
                      {
                        Object.keys(curGrp).map(sub => {
                          const subItem = curGrp[sub]
                          return (
                            <div className='date-group' key={sub}>
                              <div className='chat-list-item'>
                                <i
                                  alt={subItem.avatar}
                                  className={'round-avatar ' + subItem.avatar}
                                >
                                  <div className='send-time'>{subItem.time}</div>
                                </i>
                                <div className='nicname'>{subItem.author}</div>
                                <div className='message-detail'>{subItem.text}</div>
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                  )
                })
              }
              <div className='date-group'>
                <div className='chat-list-item'>
                  <i
                    alt={'owl'}
                    className={'round-avatar ' + 'owl'}
                  >
                    <div className='send-time'>12:12</div>
                  </i>
                  <div className='nicname'>OwlAford</div>
                  <div className='message-detail'>我要发送消息</div>
                </div>
                <div className='chat-list-item'>
                  <i
                    alt={'owl'}
                    className={'round-avatar ' + 'owl'}
                  >
                    <div className='send-time'>12:12</div>
                  </i>
                  <div className='nicname'>OwlAford</div>
                  <div className='message-detail'>我要发送消息</div>
                </div>
                <div className='chat-list-item dir-right'>
                  <i
                    alt={'owl'}
                    className={'round-avatar ' + 'owl'}
                  >
                    <div className='send-time'>12:12</div>
                  </i>
                  <div className='nicname'>OwlAford</div>
                  <div className='message-detail'>我要发送消息</div>
                </div>
              </div>
            </div>
          </div>
          <div className='talking-input'>
            <div className='txtipt'>
              <textarea
                name='fm-ipt'
                placeholder='请输入聊天内容'
                value={this.talkingText}
                onChange={e => this.editTalkText(e)}
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
      </div>
    )
  }
}
