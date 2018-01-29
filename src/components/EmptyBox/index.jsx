import React from 'react'
import './scss/index.scss'

export default ({ children }) => (
  <div className='app-empty'>
    <div className='empty-icon' />
    <div className='title'>{children}</div>
  </div>
)
