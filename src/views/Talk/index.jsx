import React from 'react'
import Online from './Online'
import TalkList from './TalkList'
import InputBox from './InputBox'
import './scss/index.scss'

const Talk = () => (
  <div className='home-talk'>
    <Online />
    <div className='talk-content'>
      <div className='group-name'>技术讨论交流</div>
      <TalkList />
      <InputBox />
    </div>
  </div>
)

export default Talk
