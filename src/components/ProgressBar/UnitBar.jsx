import React from 'react'
import './scss/index.scss'

export default ({ color, progress, percent, clickEvent, style }) => {
  style = style || {}

  const params = {
    style: {
      width: `${progress}%`
    }
  }

  const barStyle = {
    width: `${percent || 100}%`,
    ...style
  }
  return (
    <div
      className={'bar ' + color}
      style={barStyle}
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
