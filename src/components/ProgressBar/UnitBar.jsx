import React from 'react'
import './scss/index.scss'

export default ({ color, progress, percent, clickEvent }) => {
  const params = {
    style: {
      width: `${progress}%`
    }
  }
  return (
    <div
      className={'bar ' + color}
      style={{ width: `${percent || 100}%` }}
      onClick={e => { clickEvent && clickEvent() }}
    >
      <div className='face top'>
        <div className='growing-bar' {...params} />
      </div>
      <div className='face side-0'>
        <div className='growing-bar' {...params} />
      </div>
      <div className='face floor'>
        <div className='growing-bar' {...params} />
      </div>
      <div className='face side-a' />
      <div className='face side-b' />
      <div className='face side-1'>
        <div className='growing-bar' {...params} />
      </div>
    </div>
  )
}
