import React from 'react'
import Online from './Online'
import ChatList from './ChatList'
import InputBox from './InputBox'
import './scss/index.scss'

const Chat = () => (
  <div className='home-chat'>
    <Online />
    <div className='chat-content'>
      <div className='group-name'>技术讨论交流</div>
      <ChatList />
      <InputBox />
    </div>
  </div>
)

export default Chat
