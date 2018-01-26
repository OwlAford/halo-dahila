import React from 'react'
import classNames from 'classnames'
import Portal from '^/Portal'
import './scss/index.scss'

export default ({ type, children }) => (
  <Portal>
    <div
      className={classNames({
        'app-toast': true,
        'warning': type === 'warning'
      })}
    >
      <div className='context'>{children}</div>
    </div>
  </Portal>
)
