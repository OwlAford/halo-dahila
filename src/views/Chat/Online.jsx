import React from 'react'
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'
import classNames from 'classnames'
import Avatar from './Avatar'
import { withToast } from '^/Toast'
import BubblyButton from '^/BubblyButton'

@withToast

@inject(stores => {
  const {
    chat: {
      chatName,
      chatAvatar,
      needReg,
      onlinelist
    }
  } = stores
  return {
    chatName,
    chatAvatar,
    needReg,
    onlinelist,
    onlineHandle: (name, avatar) => stores.chat.onlineHandle(name, avatar)
  }
})

@observer
export default class Online extends React.Component {
  @observable nickName = ''
  @observable avatarType = ''

  constructor (props) {
    super(props)
    this.selectAvatar = this.selectAvatar.bind(this)
  }

  componentDidMount () {
    const params = {
      disableTouch: true,
      scrollbars: true,
      mouseWheel: false,
      fadeScrollbars: true
    }
    this.onlineScroll = new IScroll(this.refs.$onlineList, params)
  }

  componentDidUpdate () {
    this.onlineScroll && this.onlineScroll.refresh()
  }

  componentWillUnmount () {
    this.onlineScroll.destroy()
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

  selectAvatar (item) {
    this.avatarType = item
  }

  render () {
    const {
      chatAvatar,
      chatName,
      needReg,
      onlinelist
    } = this.props

    return (
      <div className='chat-sidebar'>
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
                onlinelist.map(({ avatar, name, os, browser, cip, cname }, i) => {
                  const State = os
                    ? <div className='state'>{`${os.name}${os.version} ${browser.name} `}在线</div>
                    : <div className='state'>在线</div>
                  return (
                    <div className='list-item' key={i}>
                      <i
                        alt={avatar}
                        className={`round-avatar online ${avatar}`}
                      />
                      <div className='name'>
                        <span>{name}</span>
                      </div>
                      {State}
                      <div className='local'>IP: {cip} {cname}</div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}
