import { observable, action } from 'mobx'
import { JSON2Array } from '~/libs/tools'
import { getData, online } from '~/constants/connect'

export default class ChatModel {
  @observable chatName = ''
  @observable chatAvatar = ''
  @observable needReg = true

  @observable onlinelist = []

  @observable chatdate = []
  @observable curChatList = []

  @observable prevDate = null
  @observable pointer = 0

  originChatList = {}

  firstTime = true
  dayLength = 0

  constructor () {
    this.onlineAuto()
  }

  @action
  triggerPrevHandle (cb) {
    const max = this.chatdate.length - 1
    const newPointer = this.pointer + 1
    if (newPointer <= max && max >= 0) {
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
      this.prevDate = chatDate[pointer + 1]
    } else {
      this.prevDate = null
    }
    if (max >= pointer) {
      const curDate = chatDate[pointer]
      getData('chatRoom/chatlist/' + curDate, val => {
        if (val) {
          if (document.hidden) {
            document.title = `【您有新消息】HALO - 🍺及时行乐`
          }
          this.originChatList[curDate] = val
          let arr = []
          for (let e in this.originChatList) {
            let sub = []
            for (let m in this.originChatList[e]) {
              sub.push(this.originChatList[e][m])
            }
            arr.push(sub)
          }
          this.curChatList = arr.reverse()
        }
        cb && cb()
      })
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
      val = val || {}
      this.onlinelist = JSON2Array(val).reverse()
      cb && cb(val)
    })

    getData('chatRoom/chatdate', val => {
      if (val) {
        const dates = this.chatdate = Object.keys(val).reverse()
        // 聊天天数发生变化
        if (dates.length !== this.dayLength) {
          this.pointer = 0
          this.prevDate = dates[this.pointer + 1]
          this.originChatList = []
        }
        this.dayLength = dates.length
        const outdate = ~~(Date.now() / 24 / 60 / 60 / 1000) > dates[0].replace('id_', '') * 1
        if (outdate && this.firstTime) {
          this.pointer = -1
          this.prevDate = dates[0]
          this.firstTime = false
        } else {
          this.getCurChatList()
        }
      }
    })
  }
}
