import { observable, action } from 'mobx'
import { getData, online } from '~/constants/connect'

export default class ChatModel {
  @observable chatName = ''
  @observable chatAvatar = ''
  @observable needReg = true
  @observable chatlist = []
  @observable onlielist = []

  constructor () {
    this.onlineAuto()
  }

  @action
  onlineAuto () {
    let info = localStorage.getItem('halo_user_chat_info')
    if (info) {
      info = JSON.parse(info)
      this.chatName = info.nickName
      this.chatAvatar = info.avatarType
      this.needReg = false
      online(this.chatName, this.chatAvatar)
      this.getChatDataHandle()
    }
  }

  @action
  onlineHandle (name, avatar) {
    localStorage.setItem('halo_user_chat_info', JSON.stringify({
      nickName: name,
      avatarType: avatar
    }))
    this.chatName = name
    this.chatAvatar = avatar
    this.needReg = false
    online(name, avatar)
    this.getChatDataHandle()
  }

  @action
  getChatDataHandle () {
    getData('chatRoom', val => {
      this.chatlist = val.chatlist || []
      this.onlielist = val.online || []
      console.log(val)
    })
  }
}
