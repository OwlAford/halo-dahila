import { observable, action } from 'mobx'
import { JSON2Array } from '~/libs/tools'
import { getData, online } from '~/constants/connect'

export default class ChatModel {
  @observable chatName = ''
  @observable chatAvatar = ''
  @observable needReg = true

  @observable onlinelist = []

  @observable chatdate = []
  @observable curChatList = {}

  @observable prevDate = null
  @observable pointer = 0

  constructor () {
    this.onlineAuto()
  }

  @action
  triggerPrevHandle (cb) {
    const max = this.chatdate.length - 1
    const newPointer = this.pointer + 1
    if (newPointer <= max && max > 0) {
      this.pointer = newPointer
      this.getCurChatList(cb)
    } else {
      cb && cb()
    }
  }

  @action
  onlineAuto (cb) {
    let info = localStorage.getItem('halo_user_chat_info')
    if (info) {
      info = JSON.parse(info)
      this.chatName = info.nickName
      this.chatAvatar = info.avatarType
      this.needReg = false
      online(this.chatName, this.chatAvatar)
      this.getChatDataHandle(cb)
    }
  }

  getCurChatList (cb) {
    const chatDate = this.chatdate
    const pointer = this.pointer
    const max = chatDate.length - 1
    if (max >= pointer + 1) {
      this.prevDate = chatDate.reverse()[pointer + 1]
    } else if (pointer <= max) {
      const curDate = chatDate.reverse()[pointer]
      getData('chatRoom/chatlist/' + curDate, val => {
        if (val) {
          this.curChatList[curDate] = val
          // console.log('👻', val)
        }
        cb && cb()
      })
    } else {
      this.prevDate = null
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
  getChatDataHandle (cb) {
    getData('chatRoom/online', val => {
      const online = val || {}
      this.onlinelist = JSON2Array(online)
      cb && cb(val)
    })

    getData('chatRoom/chatdate', val => {
      this.chatdate = Object.keys(val)
      this.getCurChatList()
    })
  }
}
