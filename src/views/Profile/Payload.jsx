import React from 'react'
import './scss/payload.scss'
import wilde from './images/wilde.jpg'

const Payload = ({ option }) => {
  const Poetry = () => [
    <div className='poetry' key='poetry'>
      <h2 className='title'>《奥斯卡·王尔德语录》</h2>
      <h3 className='author'>Oscar Wilde</h3>
      <div className='content'>
        <p className='quota'>'There are only two tragedies in life: one is not getting what one wants, and the other is getting it.'</p>
        <p>—— 世上只有两类悲剧，有些人总是不能遂愿，而有些人总是心想事成。</p>
      </div>
      <div className='content'>
        <p className='quota'>'Don't be afraid of the past. If people tell you that it is irrevocable, don't believe them.'</p>
        <p>—— 不要惧怕过去。如果人们告诉你说过去的事情无可挽回，别相信他们。</p>
      </div>
    </div>,
    <div className='pic' key='pic'><img src={wilde} alt='Oscar Wilde' width='100%' /></div>
  ]
  return (
    <div className='terminal-payload'>
      <Poetry />
      { option === '2' && <div className='singer' /> }
      { option === '3' && <div className='cooking' /> }
      { option === '4' && <div className='popcorn' /> }
    </div>
  )
}

export default Payload
