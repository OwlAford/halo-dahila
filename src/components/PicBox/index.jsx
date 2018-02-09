import React from 'react'
import classNames from 'classnames'
import './scss/index.scss'

export default ({ title, time, lnk, clickEvent, notitle }) => (
  <div
    className={classNames('app-pic-box', 'app-skew-shadow', {
      'notitle': notitle
    })}
  >
    {
      !notitle &&
      <div className='title'>
        <div className='inner'>{title || '未命名'}</div>
        <div className='timestamp'>{time}</div>
      </div>
    }
    <div className='content'>
      <img
        src={lnk}
        alt={title}
        width='100%'
      />
      <div className='detailBtn' onClick={e => { clickEvent(e) }}>
        <i className='iconfont'>&#xe624;</i>
        查看大图
      </div>
    </div>
  </div>
)
