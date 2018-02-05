import React from 'react'
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'
import Avatar from './Avatar'
import { withToast } from '^/Toast'
import BubblyButton from '^/BubblyButton'
import './scss/index.scss'

@withToast

@inject(stores => {
  const { chat: { chatName, chatAvatar, needReg, chatlist, onlielist } } = stores
  return {
    chatName,
    chatAvatar,
    needReg,
    chatlist,
    onlielist,
    onlineHandle: (name, avatar) => stores.chat.onlineHandle(name, avatar),
    onlineAuto: () => stores.chat.onlineAuto()
  }
})

@observer
export default class Talk extends React.Component {
  @observable nickName = ''
  @observable avatarType = ''

  constructor (props) {
    super(props)
    this.selectAvatar = this.selectAvatar.bind(this)
  }

  componentWillMount () {
    this.props.onlineAuto()
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
    return (
      <div className='home-talk'>
        <div className='talk-sidebar'>
          {
            this.props.needReg
              ? <div className='step'>
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
              : <div className='step'>
                <div className='login-info'>
                  <i
                    alt={this.props.chatAvatar}
                    className={'round-avatar ' + this.props.chatAvatar}
                  />
                  <div className='nick-name'>{this.props.chatName}</div>
                </div>
              </div>
          }
        </div>
        <div className='talk-content'>content</div>
      </div>
    )
  }
}
